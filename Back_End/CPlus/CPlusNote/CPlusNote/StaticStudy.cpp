
#include<iostream>

void Function() {

	static int i = 0;
	i++;
	std::cout << i << std::endl;
}



enum MyEnum
{
	A,B,C
};


MyEnum a = B;

void main3() {
	std::cout << MyEnum::A << std::endl;

	std::cin.get();
}