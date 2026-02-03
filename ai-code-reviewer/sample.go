package main

import (
	"fmt"
	"os"
)

func badCode() {
	// This has several issues
	var users []string
	for i := 0; i < len(users); i++ {
		fmt.Println(users[i]) // potential index out of bounds
	}

	// String concatenation in loop
	var result string
	for i := 0; i < 1000; i++ {
		result += fmt.Sprintf("item-%d,", i)
	}

	// Ignoring errors
	file, _ := os.Open("nonexistent.txt")
	file.Read(make([]byte, 100))
}
