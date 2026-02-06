package main

import (
	"context"
	"fmt"
	"os"

	"github.com/qdrant/go-client/qdrant"
	"github.com/volcengine/volcengine-go-sdk/service/arkruntime"
)

func createCollection(client *qdrant.Client) error {
	ctx := context.Background()

	vectorSize := uint64(2048) // ←改成你的实际维度

	err := client.CreateCollection(ctx, &qdrant.CreateCollection{
		CollectionName: "animal",
		VectorsConfig: qdrant.NewVectorsConfig(&qdrant.VectorParams{
			Size:     vectorSize,
			Distance: qdrant.Distance_Cosine,
		}),
	})

	if err != nil {
		return err
	}

	fmt.Println("collection创建成功")
	return nil
}

func main() {

	douBaoClient := arkruntime.NewClientWithApiKey( // 火山云的客户端
		os.Getenv("OPENAI_API_KEY"),
		arkruntime.WithBaseUrl("https://ark.cn-beijing.volces.com/api/v3"),
	)

	// 建立qdrant客户端
	qdrantClient, err := qdrant.NewClient(&qdrant.Config{
		Host: "47.116.160.25",
		Port: 6334,
	})
	err = createCollection(qdrantClient)
	if err != nil {
		fmt.Println("创建collection失败:", err)
		return
	}
	if err != nil {
		fmt.Println("创建Qdrant客户端失败:", err)
		return
	}
	defer qdrantClient.Close()

	// 存入知识
	err = ReadKnowledge("./docs/animal.txt", douBaoClient, qdrantClient)
	if err != nil {
		return
	}
}
