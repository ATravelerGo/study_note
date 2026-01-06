package main

import (
	"slices"
	"strconv"
	"strings"
)

//给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
//
// 请你将两个数相加，并以相同形式返回一个表示和的链表。
//
// 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。
//
//
//
// 示例 1：
//
//
//输入：l1 = [2,4,3], l2 = [5,6,4]
//输出：[7,0,8]
//解释：342 + 465 = 807.
//
//
// 示例 2：
//
//
//输入：l1 = [0], l2 = [0]
//输出：[0]
//
//
// 示例 3：
//
//
//输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
//输出：[8,9,9,9,0,0,0,1]
//
//
//
//
// 提示：
//
//
// 每个链表中的节点数在范围 [1, 100] 内
// 0 <= Node.val <= 9
// 题目数据保证列表表示的数字不含前导零
//
//
// Related Topics 递归 链表 数学 👍 11719 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */

type ListNode struct {
	Val  int
	Next *ListNode
}

func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {

	var l1Arr []string
	for l1 != nil {
		l1Arr = append(l1Arr, strconv.Itoa(l1.Val))
		l1 = l1.Next
	}

	var l2Arr []string
	for l2 != nil {
		l2Arr = append(l2Arr, strconv.Itoa(l2.Val))
		l2 = l2.Next
	}

	slices.Reverse(l1Arr)
	slices.Reverse(l2Arr)

	num1, _ := strconv.Atoi(strings.Join(l1Arr, ""))
	num2, _ := strconv.Atoi(strings.Join(l2Arr, ""))

	sum := num1 + num2

	sumArr := strings.Split(strconv.Itoa(sum), "")

	slices.Reverse(sumArr)

	var head *ListNode // 链表头节点
	var prev *ListNode // 用来记录前一个节点

	for i := 0; i < len(sumArr); i++ {
		val, _ := strconv.Atoi(sumArr[i]) // 把字符串数字转回 int
		node := &ListNode{
			Val:  val,
			Next: nil,
		}

		if head == nil {
			head = node // 第一个节点作为头节点
		} else {
			prev.Next = node // 上一个节点的 Next 指向当前节点
		}

		prev = node // 更新 prev
	}

	return head
}

//leetcode submit region end(Prohibit modification and deletion)

func main() {

}
