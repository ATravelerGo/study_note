package main

import (
	"log"
	"net/url"

	"github.com/tmc/langchaingo/embeddings"
	"github.com/tmc/langchaingo/llms/openai"
	"github.com/tmc/langchaingo/vectorstores/qdrant"
)

func main() {

	llm, err := openai.New(
		openai.WithBaseURL("https://ark.cn-beijing.volces.com/api/v3"),
		openai.WithModel("doubao-seed-1-8-251228"),
		openai.WithEmbeddingModel("doubao-embedding-vision-251215"),
	)

	// 创建embedder 专门把文本/文档转换成向量（embedding）的客户端
	embedder, err := embeddings.NewEmbedder(llm)
	if err != nil {
		log.Fatalf("建立embedderClient失败: %v", err)
		return
	}

	// 创建一个 Qdrant 向量数据库连接，并绑定 embedding 引擎
	parseUrl, err := url.Parse("http://47.116.160.25:6333")
	if err != nil {
		log.Fatal("解析 Qdrant URL 失败:", err)
		return
	}
	store, err := qdrant.New(
		qdrant.WithURL(*parseUrl), qdrant.WithCollectionName("animal"), qdrant.WithEmbedder(embedder))
	if err != nil {
		log.Fatal("创建 Qdrant 存储实例失败:", err)
		return
	}

	// 存入知识
	ReadKnowledge("./docs/animal.txt", store)
}
