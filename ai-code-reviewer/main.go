package main

func main() {

	//filePath := flag.String("file", "", "Go file to review")

	//flag.Parse()

	codeReviewer, err := NewCodeReviewer()
	if err != nil {
		return
	}

	err = codeReviewer.ReviewFile("./sample.go")
	if err != nil {
		return
	}

	//err = codeReviewer.ReviewDirectory("./")
	//if err != nil {
	//	return
	//}

}
