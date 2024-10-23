#include<iostream>


//#include "Engine.h"

//template<typename T>

//void Print(T value) {

//	std::cout << value << std::endl;

//}


template<int N>


class Array
{
public:
	
	int GetSize() const {

		return N;
	}

private:
	int m_Array[N];
};




void main() {

	Array<10> arr;
	std::cout << arr.GetSize() << std::endl;

	//Print(123);
	//Print("123");
	//engine::PrintMessage();
}