#include <iostream>
#include "Log.h"



int main() {

	
	char* buffer = new char[10];

	buffer[0] = 'A';
	buffer[1] = 'B';

	std::cout << buffer[0] << std::endl;
	

	std::cin.get();


	return 0;

}
