#include<iostream>

namespace Virtual {
	class Entity
	{
	public:

		virtual std::string GetName() { return "Entity"; }



	private:

	};

	class Player :public Entity
	{
	public:
		Player(const std::string& name) {
			m_name = name;
		}

		std::string GetName() override {
			return m_name;
		}

	private:
		std::string m_name;
	};

}







void main6() {

	Virtual::Entity* e = new Virtual::Entity();
	std::cout << e->GetName() << std::endl;

	Virtual::Player* p = new Virtual::Player("张辰");
	std::cout << p->GetName() << std::endl;

	Virtual::Entity* e1 = p;
	std::cout << e1->GetName() << std::endl; //打印出来是entity

	std::cout << "hello" << std::endl;


}