package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/tmc/langchaingo/documentloaders"
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

	var inputs []model.MultimodalEmbeddingInput
	for _, v := range docs {
		inputs = append(inputs, model.MultimodalEmbeddingInput{
			Type: model.MultiModalEmbeddingInputTypeText,
			Text: &v.PageContent,
		})

	}

	req := model.MultiModalEmbeddingRequest{
		Model: "doubao-embedding-vision-251215",
		Input: inputs,
	}

	resp, err := douBaoClient.CreateMultiModalEmbeddings(ctx, req)
	if err != nil {
		fmt.Printf("multimodal embeddings error: %v\n", err)
		return err
	}

	res, _ := json.Marshal(resp)

	fmt.Println("multimodal embeddings:", string(res))

	return nil

}
