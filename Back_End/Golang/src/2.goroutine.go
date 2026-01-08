package main

import (
	"errors"
	"fmt"
	"time"
)

func Go(f func()) {

	go func() {

		defer func() {

			if err := recover(); err != nil {
				fmt.Println("panic:", err)
			}

		}()
		f()

	}()

}

func main() {

	Go(func() {
		time.Sleep(time.Second)
		panic(errors.New("报错啦"))

	})

	for {

		time.Sleep(time.Second)
		println("hello world")

	}

}
