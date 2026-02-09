package main

import (
	"bufio"
	"context"
	"fmt"
	"os"
	"strings"

	"github.com/tmc/langchaingo/documentloaders"
	"github.com/tmc/langchaingo/textsplitter"
)

// 读出来txt所有内容
func readTxt(path string) ([]string, error) {

	file, err := os.Open(path)
	if err != nil {
		return nil, err

	}
	defer file.Close()

	reader := bufio.NewScanner(file)

	var builder strings.Builder

	var chapterArr []string

	for reader.Scan() {
		var line = strings.TrimSpace(reader.Text())

		if strings.HasPrefix(line, "Chapter") && !strings.HasSuffix(line, ".") {
			if builder.Len() > 0 {
				chapterArr = append(chapterArr, builder.String())
				builder.Reset()
				builder.WriteString(line + "\n")

			} else {
				builder.WriteString(line + "\n")
			}
		} else {
			builder.WriteString(line + "\n")
		}
	}
	// 这个是最后一个章节
	if builder.Len() > 0 {
		chapterArr = append(chapterArr, builder.String())
	}

	if err := reader.Err(); err != nil {
		return nil, err
	}

	return chapterArr, nil
}

func getChapterTitle(text string) string {

	arr := strings.Split(text, "\n")

	return arr[2]
}

func splitChapterToChunks(chapter string) []string {

	ctx := context.Background()

	loader := documentloaders.NewText(strings.NewReader(chapter))

	splitter := textsplitter.NewRecursiveCharacter(
		textsplitter.WithChunkSize(400),
		textsplitter.WithChunkOverlap(80))

	documents, err := loader.LoadAndSplit(ctx, splitter)
	if err != nil {
		return nil
	}

	var chunks = make([]string, len(documents))

	for i := 0; i < len(documents); i++ {
		chunks[i] = documents[i].PageContent

	}
	return chunks
}

//func UploadTxtFile(filePath string, doubaoClient *arkruntime.Client, qdrantClient *qdrant.Client) {
//
//	chapterArr, err := readTxt(filePath)
//	if err != nil {
//		return
//	}
//
//	for _, v := range chapterArr {
//		chunks := splitChapterToChunks(v)
//		fmt.Println("每个章节分块数:", len(chunks))
//
//		var points = make([]*qdrant.PointStruct, len(chunks))
//
//		var wg sync.WaitGroup
//
//		for i, chunk := range chunks {
//			wg.Add(1)
//
//			go func(i int, chunk string) {
//
//				ctx := context.Background()
//
//				req := model.MultiModalEmbeddingRequest{
//					Model: "doubao-embedding-vision-251215",
//					Input: []model.MultimodalEmbeddingInput{
//						{
//							Type: model.MultiModalEmbeddingInputTypeText,
//							Text: &chunk,
//						},
//					},
//				}
//
//				resp, err := doubaoClient.CreateMultiModalEmbeddings(ctx, req)
//				if err != nil {
//					fmt.Println("multimodal embeddings error:", err)
//					return
//				}
//				fmt.Println("该chunk的向量是", resp.Data.Embedding)
//
//				points[i] = &qdrant.PointStruct{
//					Id:      &qdrant.PointId{PointIdOptions: &qdrant.PointId_Uuid{Uuid: uuid.New().String()}},
//					Vectors: qdrant.NewVectors(resp.Data.Embedding...),
//					Payload: map[string]*qdrant.Value{
//						"Text": {
//							Kind: &qdrant.Value_StringValue{
//								StringValue: chunk,
//							},
//						},
//						"Chapter": {
//							Kind: &qdrant.Value_StringValue{StringValue: getChapterTitle(v)}, // 每章的标题
//						},
//					},
//				}
//
//				wg.Done()
//
//			}(i, chunk)
//
//		}
//
//		wg.Wait()
//		// 这里是单个章节的向量都解析完了
//		ctx := context.Background()
//
//		_, err := qdrantClient.Upsert(ctx, &qdrant.UpsertPoints{
//			CollectionName: "catBibleEverything",
//			Points:         points,
//		})
//		if err != nil {
//			fmt.Println("写入Qdrant失败:", err)
//			return
//		}
//		fmt.Println("成功写入Qdrant:", len(points), "条")
//
//	}
//
//}

func UploadTxtFile(filePath string) {

	chapterArr, err := readTxt(filePath)
	if err != nil {
		return
	}

	var totalChunks int

	for _, v := range chapterArr {
		chunks := splitChapterToChunks(v)
		fmt.Println("每个章节分块数:", len(chunks))

		totalChunks += len(chunks)

	}

	fmt.Println("总共分块数:", totalChunks)
}
