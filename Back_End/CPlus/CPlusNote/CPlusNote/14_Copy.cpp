#include<iostream>

namespace Copy {

	struct Vector2
	{

		float x, y;
		

	};

}




void main() {

	Copy::Vector2 a = { 2,3 };

	Copy::Vector2 b = a;

	b.x = 10;

	std::cout<< a.x << std::endl;
}