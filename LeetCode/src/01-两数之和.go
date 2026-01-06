package main

import (
	"log"
)

func twoSum(nums []int, target int) []int {
	var numMap = map[int]int{}
	for i, num := range nums {
		if index, ok := numMap[target-num]; ok {
			return []int{index, i}
		}

		numMap[num] = i
	}

	return nil

}

func main() {

	demoMap := map[int]int{1: 1, 2: 2, 3: 3}

	i, ok := demoMap[9]

	log.Println(i, ok) // 0 false

	log.Println(twoSum([]int{2, 7, 11, 15}, 9))

}
