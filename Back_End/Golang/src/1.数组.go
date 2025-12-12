package main

import "fmt"

func test() (min, max int) {

	min = 1
	max = 2

	return
}

func main() {

	arr1 := [4]int{1, 2, 3, 4}

	arr2 := new([4]int)

	arr3 := arr1
	arr3[0] = 100
	fmt.Println(arr1)
	fmt.Println(arr3)

	arr4 := arr2
	arr4[0] = 200
	fmt.Println(arr2)
	fmt.Println(arr4)

	var arr5 = []int{1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	arr5 = append(arr5, 11)
	var arr6 = arr5

	fmt.Println(arr5)
	fmt.Println(arr6)

	fmt.Println(test())

}
