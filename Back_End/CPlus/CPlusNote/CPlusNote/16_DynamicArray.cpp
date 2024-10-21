#include<iostream>
#include<vector>

namespace DynamicArray {

	struct Vertex
	{
		float x, y, z;

	};



	std::ostream& operator<<(std::ostream& stream, const Vertex& vertex) {

		stream << vertex.x << "," << vertex.y << "," << vertex.z;

		return stream;

	}



}


void main() {

	//����ԭ����������ķ�ʽ
	//DynamicArray::Vertex* verList = new DynamicArray::Vertex[5];
	//����ʹ�ö�̬����
	
	
	std::vector<DynamicArray::Vertex> verList;
	verList.push_back({1.0f,2.0f,3.0f});

	verList.push_back({ 2.0f,3.0f,4.0f });
	

	for (int i = 0; i < verList.size(); i++)
	{
		std::cout << verList[i] << std::endl;
	}

	std::cin.get();

}