package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/tmc/langchaingo/documentloaders"
	"github.com/tmc/langchaingo/textsplitter"
	"github.com/tmc/langchaingo/vectorstores/qdrant"
)

func ReadKnowledge(filePath string, store qdrant.Store) {

	file, err := os.Open(filePath)
	if err != nil {
		return
	}
	defer file.Close()

	loader := documentloaders.NewText(file)

	// 创建文本分块器
	splitter := textsplitter.NewRecursiveCharacter(
		textsplitter.WithChunkSize(200),
		textsplitter.WithChunkOverlap(0))

	ctx := context.Background()

	docs, err := loader.LoadAndSplit(ctx, splitter) // 加载并分块文档
	if err != nil {
		log.Fatal("加载并分块文档失败:", err)
		return
	}

	documents, err := store.AddDocuments(ctx, docs)
	if err != nil {
		return
	}

	fmt.Println("添加文档成功:", documents)

}
