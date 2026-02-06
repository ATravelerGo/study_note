package main

import (
	"context"
	"fmt"

	"github.com/qdrant/go-client/qdrant"
	"github.com/volcengine/volcengine-go-sdk/service/arkruntime"
	"github.com/volcengine/volcengine-go-sdk/service/arkruntime/model"
)

func QueryKnowledge(question string, douBaoClient *arkruntime.Client, qdrantClient *qdrant.Client) string {

	//1.把用户问题转成向量

	req := model.MultiModalEmbeddingRequest{
		Model: "doubao-embedding-vision-251215",
		Input: []model.MultimodalEmbeddingInput{
			{
				Type: model.MultiModalEmbeddingInputTypeText,
				Text: &question,
			},
		},
	}
	ctx := context.Background()
	resp, err := douBaoClient.CreateMultiModalEmbeddings(ctx, req)
	if err != nil {
		fmt.Printf("multimodal embeddings error: %v\n", err)
		return ""
	}
	limit := uint64(3)
	queryVector := resp.Data.Embedding

	searchResult, err := qdrantClient.Query(ctx, &qdrant.QueryPoints{
		CollectionName: "animal",
		Query:          qdrant.NewQuery(queryVector...),
		Limit:          &limit,                      // 返回最相似3条
		WithPayload:    qdrant.NewWithPayload(true), // 返回原文
	})

	if err != nil {
		fmt.Println("查询Qdrant失败:", err)
		return ""
	}
	for _, point := range searchResult {
		fmt.Println("相似度:", point.Score)
		fmt.Println("内容:", point.Payload["text"])
	}

	return ""
}
