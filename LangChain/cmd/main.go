package main

import "chat-app/internal"

func main() {
	//llm, err := openai.New(
	//	openai.WithBaseURL("https://ark.cn-beijing.volces.com/api/v3"),
	//	openai.WithModel("ep-20260112234823-c7r4r"))
	//if err != nil {
	//	log.Println("err", err)
	//	return
	//}
	//
	//cxt := context.Background()
	//response, err := llms.GenerateFromSinglePrompt(cxt, llm, "你现在可以查询今天的日期吗?")
	//if err != nil {
	//	log.Println("err", err)
	//	return
	//}
	//
	//fmt.Println("response", response)

	//internal.InteractiveChat()

	//internal.InteractiveChatWithMemory()

	internal.InteractiveChatWithMemoryAndConversationChain()
}
