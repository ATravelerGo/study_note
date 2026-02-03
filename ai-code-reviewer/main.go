package main

import (
	"context"
	"flag"
	"fmt"
	"go/parser"
	"go/token"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"strings"

	"github.com/tmc/langchaingo/llms"
	"github.com/tmc/langchaingo/llms/openai"
	"github.com/tmc/langchaingo/prompts"
)

type CodeReviewer struct {
	llm      llms.Model
	template *prompts.PromptTemplate
}

func NewCoderReviewer() (*CodeReviewer, error) {
	llm, err := openai.New(openai.WithBaseURL("https://ark.cn-beijing.volces.com/api/v3"),
		openai.WithModel("ep-20260112234823-c7r4r"))
	if err != nil {
		log.Println("err", err)
		return nil, err
	}
	template := prompts.NewPromptTemplate(`
You are an expert Go code reviewer. Analyze this Go code for:

1. **Bugs and Logic Issues**: Potential runtime errors, nil pointer dereferences, race conditions
2. **Performance**: Inefficient algorithms, unnecessary allocations, string concatenation issues
3. **Style**: Go idioms, naming conventions, error handling patterns
4. **Security**: Input validation, sensitive data handling

Code to review:
'''go
{{.code}}
'''

File: {{.filename}}

Provide specific, actionable feedback. For each issue:
- Explain WHY it's a problem
- Show HOW to fix it with code examples
- Rate severity: Critical, Warning, Suggestion

Focus on the most important issues first.`,
		[]string{"code", "filename"})

	return &CodeReviewer{
		llm:      llm,
		template: &template,
	}, nil
}

func (cr *CodeReviewer) ReviewFile(filename string) error {
	content, err := os.ReadFile(filename)
	if err != nil {
		return fmt.Errorf("error reading file: %w", err)
	}

	// 把一段 Go 源码当作“文本”读进来，验证它是不是一份合法的 Go 文件
	fset := token.NewFileSet()
	_, err = parser.ParseFile(fset, filename, content, parser.ParseComments)
	if err != nil {
		return fmt.Errorf("parsing Go file :%w", err)
	}

	prompt, err := cr.template.Format(map[string]any{
		"code":     string(content),
		"filename": filename,
	})
	if err != nil {
		return fmt.Errorf("formatting prompt: %w", err)
	}

	//	-------------------------------------------------------------------

	ctx := context.Background()

	log.Println("Generating review...")
	response, err := cr.llm.GenerateContent(ctx, []llms.MessageContent{
		llms.TextParts(llms.ChatMessageTypeHuman, prompt),
	})
	if err != nil {
		return fmt.Errorf("generating review: %w", err)
	}
	log.Println("end...")

	fmt.Printf("\n=== Review for %s ===\n", filename)
	fmt.Println(strings.Repeat("=", 80))
	fmt.Println(response.Choices[0].Content)
	fmt.Println(strings.Repeat("=", 80))

	return nil

}

func main() {
	var (
		file = flag.String("file", "", "Go file to review")
		dir  = flag.String("dir", "", "Directory to review (all .go files)")
		git  = flag.Bool("git", false, "Review files changed in git working directory")
	)
	flag.Parse()

	reviewer, err := NewCoderReviewer()
	if err != nil {
		log.Fatal(err)
	}

	switch {
	case *file != "":
		if err := reviewer.ReviewFile(*file); err != nil {
			log.Fatal(err)
		}
	case *dir != "":
		if err := reviewDirectory(reviewer, *dir); err != nil {
			log.Fatal(err)
		}
	case *git:
		if err := reviewGitChanges(reviewer); err != nil {
			log.Fatal(err)
		}
	default:
		fmt.Println("Usage:")
		fmt.Println("  code-reviewer -file=main.go")
		fmt.Println("  code-reviewer -dir=./pkg")
		fmt.Println("  code-reviewer -git")
		os.Exit(1)
	}
}

func reviewDirectory(reviewer *CodeReviewer, dir string) error {
	// filepath.Walk 是 Go 标准库提供的 递归遍历目录 的函数
	//它会递归进入 dir 下的所有子目录
	//对每一个文件或目录，都会调用你提供的回调函数
	return filepath.Walk(dir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if strings.HasSuffix(path, ".go") && !strings.Contains(path, "vendor/") {
			return reviewer.ReviewFile(path)
		}
		return nil
	})
}

func reviewGitChanges(reviewer *CodeReviewer) error {
	// This is a simplified version - you'd want to use a proper git library
	cmd := exec.Command("git", "diff", "--name-only", "HEAD")
	output, err := cmd.Output()
	if err != nil {
		return fmt.Errorf("getting git changes: %w", err)
	}

	files := strings.Split(strings.TrimSpace(string(output)), "\n")
	for _, file := range files {
		if strings.HasSuffix(file, ".go") && file != "" {
			if err := reviewer.ReviewFile(file); err != nil {
				log.Printf("Error reviewing %s: %v", file, err)
			}
		}
	}
	return nil
}
