#include<iostream>

namespace constructor {
	class Entity {

	public:
		float X, Y;


		Entity() {
			std::cout << "Constructed Entity!" << std::endl;
		}

		~Entity() {
			std::cout << "Destroyed Entity!" << std::endl;

		}

		void Print() {
			std::cout << "x:" << X << " y:" << Y << std::endl;
		}

	};

}


void main4() {
	constructor::Entity e;
	
	

	std::cin.get();

}