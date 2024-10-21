//迭代与递归
#include<iostream>
#include<stack>
#include<vector>
namespace TwoDotTwo {



	int getSum(int n) {

		if (n == 1) {
			return 1;
		}

		int res;

		res =getSum(n - 1);


		return n+ res;


	}



	//尾递归
	int tailRecur(int n, int res) {
		if (n == 1) {
			return 1;
		}

		return tailRecur(n - 1, res + n);
	}

	//用显式的栈模拟调用栈的行为
	int forLoopRecur(int n) {
		//这是个栈
		std::stack<int> stack;
		int res = 0;

		//递 递归调用
		for (int i = n; i >0; i--)
		{
			stack.push(i);

		}

		//归 返回结果
		while (!stack.empty()) {
			res += stack.top();
			stack.pop();
		}


		return res;
		

	}


	//冒泡排序
	void bubbleSort(std::vector<int>& nums) {

		//外循环：未排序区间为【0，i】
		for (int i = nums.size()-1; i > 0; i--)
		{
			//内循环将未排序区间 [0, i] 中的最大元素交换至该区间的最右端
			for (int j = 0; j < i; j++)
			{
				if (nums[j] > nums[j + 1]) {
					int temp = nums[j + 1];
					nums[j + 1] = nums[j];
					nums[j] = temp;
				}

			}


		}

	}

	void test(int* nums) {

		nums[0] = 55;


	}


}



void mainc2() {



	std::vector<int> myNums = { 64, 34, 25, 12, 22, 11, 90 };

	TwoDotTwo::bubbleSort(myNums);



	for (int i = 0; i < myNums.size(); i++)
	{
		std::cout << myNums[i] << std::endl;
	}


	int* arr = new int[2] {1, 2};


	TwoDotTwo::test(arr);

	std::cout << arr[0] << std::endl;
}