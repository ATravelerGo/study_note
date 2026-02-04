package main

import (
	"context"
	"go/parser"
	"go/token"
	"log"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/tmc/langchaingo/llms"
	"github.com/tmc/langchaingo/llms/openai"
	"github.com/tmc/langchaingo/prompts"
)

type CodeReviewer struct {
	llm      llms.Model              // 放模型
	template *prompts.PromptTemplate // 放模版
}

func NewCodeReviewer() (*CodeReviewer, error) {
	// 建立模型
	llm, err := openai.New(
		openai.WithBaseURL("https://ark.cn-beijing.volces.com/api/v3"),
		openai.WithModel("doubao-seed-1-8-251228"),
	)
	if err != nil {
		log.Fatalf("建立llm模型失败: %v", err)
		return nil, err

	}
	// 创建模版
	template := prompts.NewPromptTemplate(`你现在是一个优秀的代码reviewer，请对以下代码进行review，请给出你的建议与评分（百分制），请用中文回答。代码：{{.code}}`, []string{"code"})

	return &CodeReviewer{
		llm:      llm,
		template: &template,
	}, nil
}

func (cr *CodeReviewer) ReviewFile(filename string) error {

	fileByteArray, err := os.ReadFile(filename)
	if err != nil {
		log.Fatalf("读取文件失败: %v", err)
		return err
	}
	fileContent := string(fileByteArray)

	// 我应该初步判断下go文件的语法是否正确，大前提正确才继续执行
	fset := token.NewFileSet()

	_, err = parser.ParseFile(fset, filename, fileContent, parser.Mode(0))
	if err != nil {
		log.Fatalf("go文件语法错误: %v", err)
		return err
	}

	prompt, err := cr.template.Format(map[string]any{
		"code": fileContent,
	})
	if err != nil {
		log.Fatalf("格式化prompt失败: %v", err)
		return err
	}

	d1 := time.Now()
	ctx := context.Background()
	responseFromAi, err := cr.llm.GenerateContent(ctx, []llms.MessageContent{
		llms.TextParts(llms.ChatMessageTypeHuman, prompt),
	})
	if err != nil {
		log.Fatalf("生成内容失败: %v", err)
		return err
	}
	d2 := time.Now()
	log.Println("生成内容耗时: ", d2.Sub(d1))

	log.Println(strings.Repeat("=", 20))
	log.Printf("review结果: %s", responseFromAi.Choices[0].Content)
	log.Println(strings.Repeat("=", 20))

	return nil

}

func (cr *CodeReviewer) ReviewDirectory(directory string) error {

	err := filepath.Walk(directory, func(path string, info os.FileInfo, err error) error {

		if err != nil {
			log.Fatalf("遍历目录失败: %v", err)
			return err
		}
		if !info.IsDir() && strings.HasSuffix(info.Name(), ".go") {
			err := cr.ReviewFile(path)
			if err != nil {
				log.Fatalf("review文件失败: %v", err)
				return err
			}
		}
		return nil
	})
	if err != nil {
		return err
	}
	return nil

}
