#include<iostream>
#include<memory>

namespace UniquePtr {


	class Entity
	{
	public:
		Entity() {
			std::cout << "create" << std::endl;

		};
		~Entity() {
			std::cout << "destory" << std::endl;
		};

		void print() {
			std::cout << "print" << std::endl;
		}

	private:

	};




}





void main13() {

	{
		auto e = std::make_unique<UniquePtr::Entity>();
		
		auto shareE=std::make_shared< UniquePtr::Entity>();

	}

	

}