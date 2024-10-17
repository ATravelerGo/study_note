#include<iostream>


using String = std::string;

namespace Object {

	class Entity
	{
	public:
		Entity() :m_Name("Unknown") {}
		Entity(const String& name):m_Name(name) {}


		const String& GetName()const {

			return m_Name;
		}


	private:
		String m_Name;
	};

	




}

void main11() {

	//Object::Entity entity("辰");//这是在栈上创建对象，会随着作用域的消失而销毁

	
	{
		Object::Entity* e = new Object::Entity("辰");


		std::cout << e->GetName() << std::endl;

		delete e;

	}


}