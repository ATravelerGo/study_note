#include<iostream>

namespace Mutable {

	class Person
	{
	public:
		Person() {
			std::cout << "Person Create" << std::endl;
		};
		Person(const std::string& name) {

			std::cout << "Person Create With " << name << std::endl;

		}
	

	

	};



	class Entity
	{
	public:
		const std::string& GetName() const {
			m_DebugCount++;
			return m_Name; 
		}

		

		Entity()
			:p1(Person("zc"))
		{
			
			

		}

	private:
		mutable int m_DebugCount = 0;
		std::string m_Name;
		int m_scope;
		Person p1;
	};
}


void main10() {

	Mutable::Entity e;


	std::cout << e.GetName() << std::endl;

	
	

	
	 

	std::cin.get();

}
