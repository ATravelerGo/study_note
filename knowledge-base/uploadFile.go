package main

import (
	"bufio"
	"context"
	"fmt"
	"io"
	"os"
	"strings"
	"sync"

	"github.com/google/uuid"
	"github.com/qdrant/go-client/qdrant"
	"github.com/volcengine/volcengine-go-sdk/service/arkruntime"
	"github.com/volcengine/volcengine-go-sdk/service/arkruntime/model"
)

func splitTextByID(filePath string, handle func(chunk string)) error {

	//var docs []schema.Document

	file, err := os.Open(filePath)
	if err != nil {
		return err
	}
	defer file.Close()

	reader := bufio.NewReader(file)
	var builder strings.Builder

	for {
		line, err := reader.ReadString('\n')

		if err == io.EOF {
			if builder.Len() > 0 {
				handle(strings.TrimSpace(builder.String()))
			}
			fmt.Println("文件已读完:", err)
			break
		}

		if strings.HasPrefix(line, "ID") {
			if builder.Len() > 0 {
				handle(strings.TrimSpace(builder.String()))
				builder.Reset()
			}
		}
		builder.WriteString(line)

	}

	return nil

}

func UploadFile(filePath string, client *arkruntime.Client, qdrantClient *qdrant.Client) {

	ctx := context.Background()

	var chunks []string

	err := splitTextByID(filePath, func(chunk string) {
		chunks = append(chunks, chunk)
	})
	if err != nil {
		return
	}

	fmt.Println("成功切分:", len(chunks), "个块")

	var wg sync.WaitGroup

	var vChunks = make([]model.MultimodalEmbeddingResponse, len(chunks)) // 保存块的embedding结果

	for i, chunk := range chunks {

		wg.Add(1)

		go func(i int, chunk string) {

			req := model.MultiModalEmbeddingRequest{
				Model: "doubao-embedding-vision-251215",
				Input: []model.MultimodalEmbeddingInput{
					{
						Type: model.MultiModalEmbeddingInputTypeText,
						Text: &chunk,
					},
				},
			}

			resp, err := client.CreateMultiModalEmbeddings(ctx, req)
			if err != nil {
				fmt.Println("multimodal embeddings error:", err)
				return
			}
			vChunks[i] = resp
			wg.Done()

		}(i, chunk)

	}

	wg.Wait() // 等待所有块的embedding结果

	// 转换成qdrant.PointStruct
	points := make([]*qdrant.PointStruct, len(vChunks))

	for i, v := range vChunks {
		points[i] = &qdrant.PointStruct{
			Id: &qdrant.PointId{
				PointIdOptions: &qdrant.PointId_Uuid{
					Uuid: uuid.New().String(),
				},
			},
			Payload: map[string]*qdrant.Value{
				"Text": {
					Kind: &qdrant.Value_StringValue{
						StringValue: chunks[i],
					},
				},
			},
			Vectors: qdrant.NewVectors(v.Data.Embedding...),
		}

	}

	_, err = qdrantClient.Upsert(ctx, &qdrant.UpsertPoints{
		CollectionName: "animal",
		Points:         points,
	})
	if err != nil {
		return
	}
	fmt.Println("成功写入Qdrant:", len(points), "条")

}
