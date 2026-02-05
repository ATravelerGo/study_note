package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"sync"

	"github.com/tmc/langchaingo/documentloaders"
	"github.com/tmc/langchaingo/schema"
	"github.com/tmc/langchaingo/textsplitter"
	"github.com/volcengine/volcengine-go-sdk/service/arkruntime"
	"github.com/volcengine/volcengine-go-sdk/service/arkruntime/model"
)

func ReadKnowledge(filePath string, douBaoClient *arkruntime.Client) error {
	ctx := context.Background()

	file, err := os.Open(filePath)
	if err != nil {
		fmt.Println("打开文件失败:", err)
		return err
	}
	defer file.Close()

	loader := documentloaders.NewText(file)

	// 创建文本分块器
	splitter := textsplitter.NewRecursiveCharacter(
		textsplitter.WithChunkSize(200),
		textsplitter.WithChunkOverlap(0))

	docs, err := loader.LoadAndSplit(ctx, splitter) // 加载并分块文档
	if err != nil {
		log.Fatal("加载并分块文档失败:", err)
		return err
	}

	var wg sync.WaitGroup

	result := make([]model.MultimodalEmbeddingResponse, len(docs))

	for i, v := range docs {
		wg.Add(1)

		go func(i int, v schema.Document) {
			defer wg.Done()

			req := model.MultiModalEmbeddingRequest{
				Model: "doubao-embedding-vision-251215",
				Input: []model.MultimodalEmbeddingInput{
					{
						Type: model.MultiModalEmbeddingInputTypeText,
						Text: &v.PageContent,
					},
				},
			}

			resp, err := douBaoClient.CreateMultiModalEmbeddings(ctx, req)
			if err != nil {
				fmt.Printf("multimodal embeddings error: %v\n", err)
				return
			}

			result[i] = resp

		}(i, v)

	}

	wg.Wait()

	for _, v := range result {

		fmt.Println("向量维度:", len(v.Data.Embedding))

	}

	return nil

}
