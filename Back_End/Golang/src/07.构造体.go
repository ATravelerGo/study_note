package main

import (
	"encoding/json"
	"fmt"
)

type Stu struct {
	Name string
	Age  int
	Sex  string
}

func main9() {

	s1 := Stu{
		Name: "张三",
		Age:  18,
		Sex:  "男",
	}

	fmt.Println(s1)

	ss, _ := json.Marshal(s1)
	fmt.Println(string(ss))

	var s2 Stu

	err := json.Unmarshal(ss, &s2)
	if err != nil {
		return
	}
	fmt.Println(s2)

}
