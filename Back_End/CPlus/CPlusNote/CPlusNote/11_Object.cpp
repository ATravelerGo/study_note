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

	//Object::Entity entity("��");//������ջ�ϴ������󣬻��������������ʧ������

	
	{
		Object::Entity* e = new Object::Entity("��");


		std::cout << e->GetName() << std::endl;

		delete e;

	}


}