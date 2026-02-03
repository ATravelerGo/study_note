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
	"github.com/tmc/langchaingo/memory"
)

func InteractiveChatWithMemory() {

	llm, err := openai.New(openai.WithBaseURL("https://ark.cn-beijing.volces.com/api/v3"),
		openai.WithModel("ep-20260112234823-c7r4r"))
	if err != nil {
		log.Println("err", err)
		return
	}

	chatMemory := memory.NewConversationBuffer()

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

		// Get conversation history
		messages, _ := chatMemory.ChatHistory.Messages(ctx)

		// Format the conversation
		var conversation string
		for _, msg := range messages {
			conversation += msg.GetContent() + "\n"
		}

		// Add current input to the conversation
		fullPrompt := conversation + "Human: " + input + "\nAssistant:"

		// Generate response
		response, err := llms.GenerateFromSinglePrompt(ctx, llm, fullPrompt)
		if err != nil {
			fmt.Printf("Error: %v\n", err)
			continue
		}

		// Save to memory
		chatMemory.ChatHistory.AddUserMessage(ctx, input)
		chatMemory.ChatHistory.AddAIMessage(ctx, response)

		fmt.Printf("AI: %s\n\n", response)
	}
}
