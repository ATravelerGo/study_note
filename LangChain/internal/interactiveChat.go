package internal

import (
	"bufio"
	"context"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/tmc/langchaingo/llms"
	"github.com/tmc/langchaingo/llms/openai"
)

func InteractiveChat() {

	llm, err := openai.New(openai.WithBaseURL("https://ark.cn-beijing.volces.com/api/v3"),
		openai.WithModel("ep-20260112234823-c7r4r"))
	if err != nil {
		log.Println("err", err)
		return
	}

	ctx := context.Background()

	reader := bufio.NewReader(os.Stdin)

	fmt.Println("Chat Application Started (type 'quit' to exit)")
	fmt.Println("----------------------------------------")

	for {
		fmt.Print("You: ")
		input, _ := reader.ReadString('\n')
		input = strings.TrimSpace(input)

		if input == "quit" {
			break
		}

		response, err := llms.GenerateFromSinglePrompt(ctx, llm, input)
		if err != nil {
			fmt.Printf("Error: %v\n", err)
			continue
		}

		fmt.Printf("AI: %s\n\n", response)

	}
}
