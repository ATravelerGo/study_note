#include<iostream>


class Entity
{
public:
	float X, Y;

	void Move(float xa,float ya) {
		X += xa;
		Y += ya;
	}


	

private:

};


class Player : public Entity
{
public:


	const char* Name;


	void PrintName() {

		std::cout<< Name << std::endl;

	}

private:

};




void main5() {

	Player player;

	player.Move(5, 10);
	


	std::cin.get();
}