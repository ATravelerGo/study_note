#include<iostream>


class Entity
{
public:

	virtual std::string GetName() { return "Entity"; }

	

private:

};

class Player:public Entity
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






void main() {

	Entity* e = new Entity();
	std::cout << e->GetName() << std::endl;

	Player* p = new Player("张辰");
	std::cout << p->GetName() << std::endl;

	Entity* e1 = p;
	std::cout << e1->GetName() << std::endl; //打印出来是entity

	std::cout << "hello" << std::endl;


}