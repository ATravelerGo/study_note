//������ݹ�
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



	//β�ݹ�
	int tailRecur(int n, int res) {
		if (n == 1) {
			return 1;
		}

		return tailRecur(n - 1, res + n);
	}

	//����ʽ��ջģ�����ջ����Ϊ
	int forLoopRecur(int n) {
		//���Ǹ�ջ
		std::stack<int> stack;
		int res = 0;

		//�� �ݹ����
		for (int i = n; i >0; i--)
		{
			stack.push(i);

		}

		//�� ���ؽ��
		while (!stack.empty()) {
			res += stack.top();
			stack.pop();
		}


		return res;
		

	}


	//ð������
	void bubbleSort(std::vector<int>& nums) {

		//��ѭ����δ��������Ϊ��0��i��
		for (int i = nums.size()-1; i > 0; i--)
		{
			//��ѭ����δ�������� [0, i] �е����Ԫ�ؽ���������������Ҷ�
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