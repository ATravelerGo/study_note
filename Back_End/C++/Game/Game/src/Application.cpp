#include<iostream>


//#include "Engine.h"

//template<typename T>

//void Print(T value) {

//	std::cout << value << std::endl;

//}


#define WAIT std::cin.get()

#define Log(x) std::cout << x << std::endl

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


	Log("123");
	WAIT;
}