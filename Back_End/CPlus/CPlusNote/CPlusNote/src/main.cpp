#include <iostream>
#include "Log.h"



struct Vec2
{
	float x, y;

	void Add(const Vec2& other) {
		x + other.x;
		y = other.y;

	}
};




class Player {
public:
	int x;
	int y;
	int speed;


	void Move(int xa, int ya) {
		x = xa * speed;
		y = ya * speed;

	};
};




int main1() {

	
	Player player1;

	player1.Move(5,5);
	




	std::cin.get();
	return 0;
}
