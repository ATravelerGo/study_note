package main

import (
	"fmt"
	"strings"
)

func main6() {

	str := []byte("Hello, World!")

	fmt.Println(string(str))

	str2 := strings.Repeat("World", 5)
	fmt.Println(str2)

}
