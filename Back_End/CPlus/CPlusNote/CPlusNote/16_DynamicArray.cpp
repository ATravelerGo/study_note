#include<iostream>
#include<vector>

namespace DynamicArray {

	struct Vertex
	{
		float x, y, z;
		Vertex(float x, float y, float z) :x(x), y(y), z(z) {};


		Vertex(const Vertex& ver):x(ver.x),y(ver.y),z(ver.z) {

			std::cout << "copy" << std::endl;

		}


	};



	std::ostream& operator<<(std::ostream& stream, const Vertex& vertex) {

		stream << vertex.x << "," << vertex.y << "," << vertex.z;

		return stream;

	}



}


void main16() {

	//这是原本创建数组的方式
	//DynamicArray::Vertex* verList = new DynamicArray::Vertex[5];
	//现在使用动态数组
	
	
	std::vector<DynamicArray::Vertex> verList;
	verList.reserve(3);
	

	verList.emplace_back( 1,2,3 );
	verList.emplace_back(4, 5, 6);
	verList.emplace_back(7, 8, 9);

	for (int i = 0; i < verList.size(); i++)
	{
		std::cout << verList[i] << std::endl;
	}

	std::cin.get();

}