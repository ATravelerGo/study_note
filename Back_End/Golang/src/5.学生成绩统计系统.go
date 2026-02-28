package main

import "fmt"

type Student struct {
	Name   string
	Scores [4]int // 存储4个成绩
}

func (s *Student) Average() float64 {
	sum := 0
	for _, score := range s.Scores {
		sum += score
	}
	return float64(sum) / float64(len(s.Scores))
}

func main() {
	// 课程名固定四门
	subjects := [4]string{"语文", "数学", "英语", "物理"}
	// 学生列表动态列
	students := []Student{
		{"张三", [4]int{90, 80, 70, 60}},
		{"李四", [4]int{80, 70, 60, 50}},
		{"王五", [4]int{70, 60, 50, 40}},
		{"赵六", [4]int{60, 50, 40, 30}},
		{"孙七", [4]int{50, 40, 30, 20}},
	}
	// 显示所有学生成绩
	for _, student := range students {
		fmt.Println("学生:", student.Name)
		for i, score := range student.Scores {
			fmt.Printf("课程: %s, 成绩: %d\n", subjects[i], score)
		}
		fmt.Println("平均分:", student.Average())
	}

}
