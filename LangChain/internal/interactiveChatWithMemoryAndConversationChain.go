package internal

import (
	"bufio"
	"context"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/tmc/langchaingo/chains"
	"github.com/tmc/langchaingo/llms/openai"
	"github.com/tmc/langchaingo/memory"
)

func InteractiveChatWithMemoryAndConversationChain() {

	llm, err := openai.New(openai.WithBaseURL("https://ark.cn-beijing.volces.com/api/v3"),
		openai.WithModel("ep-20260112234823-c7r4r"))
	if err != nil {
		log.Println("err", err)
		return
	}

	chatMemory := memory.NewConversationBuffer()

	ctx := context.Background()

	reader := bufio.NewReader(os.Stdin)

	conversationChain := chains.NewConversation(llm, chatMemory)

	fmt.Println("Chat Application Started (type 'quit' to exit)")
	fmt.Println("----------------------------------------")

	for {
		fmt.Print("You: ")
		input, _ := reader.ReadString('\n')
		input = strings.TrimSpace(input)

		if input == "quit" {
			break
		}

		// Run the chain with the input
		result, err := chains.Run(ctx, conversationChain, input)
		if err != nil {
			fmt.Printf("Error: %v\n", err)
			continue
		}

		fmt.Printf("AI: %s\n\n", result)
	}

	fmt.Println("Goodbye!")
}
