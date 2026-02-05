package main

import (
	"fmt"
	"os"

	"github.com/qdrant/go-client/qdrant"
	"github.com/volcengine/volcengine-go-sdk/service/arkruntime"
)

func main() {

	douBaoClient := arkruntime.NewClientWithApiKey( // 火山云的客户端
		os.Getenv("OPENAI_API_KEY"),
		arkruntime.WithBaseUrl("https://ark.cn-beijing.volces.com/api/v3"),
	)

	// 建立qdrant客户端
	client, err := qdrant.NewClient(&qdrant.Config{
		Host: "47.116.160.25",
		Port: 6334,
	})
	if err != nil {
		fmt.Println("创建Qdrant客户端失败:", err)
		return
	}
	defer client.Close()

	// 存入知识
	err = ReadKnowledge("./docs/animal.txt", douBaoClient)
	if err != nil {
		return
	}
}
