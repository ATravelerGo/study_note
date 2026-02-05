package main

import (
	"os"

	"github.com/volcengine/volcengine-go-sdk/service/arkruntime"
)

func main() {

	douBaoClient := arkruntime.NewClientWithApiKey( // 火山云的客户端
		os.Getenv("OPENAI_API_KEY"),
		arkruntime.WithBaseUrl("https://ark.cn-beijing.volces.com/api/v3"),
	)

	// 存入知识
	err := ReadKnowledge("./docs/animal.txt", douBaoClient)
	if err != nil {
		return
	}
}
