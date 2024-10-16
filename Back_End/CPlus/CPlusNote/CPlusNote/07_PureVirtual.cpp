

#include<iostream>
namespace PureVirtual {

	class Entity
	{
	public:
		virtual std::string GetName() = 0;
	private:

	};

	class Person:public Entity
	{
	public:
		std::string GetName() {

			std::cout << "hello" << std::endl;
			return "hello";
		}
	private:

	};





}




void main7() {
	PureVirtual::Person* p = new PureVirtual::Person();
}