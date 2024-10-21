#include<iostream>


namespace Arrow {

	class Entity
	{
	public:
		void Print()const {
			std::cout << "hello" << std::endl;
		}

	private:

	};


}

void main15() {


	Arrow::Entity e;
	e.Print();

	Arrow::Entity* e2 = &e;




	//(*e2).Print(); 


	
	int a = 10;

	const int& b = a;

	

	std::cout << a << std::endl;
	std::cout << b << std::endl;

	std::cin.get();
}