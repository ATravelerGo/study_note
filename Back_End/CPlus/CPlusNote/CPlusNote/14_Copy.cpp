#include<iostream>

namespace Copy {

	


	class String
	{
	public:
		String(const char* string) {
		
			m_Size = strlen(string);
			m_Buffer = new char[m_Size+1]; //要留一位给终止运算符
			memcpy(m_Buffer, string, m_Size+1);

		};
		~String() {
			delete[] m_Buffer;
		}
		String(const Copy::String& other) {  //这里做的就是深拷贝
		
			m_Size = other.m_Size;
			m_Buffer = new char[m_Size + 1];
			memcpy(m_Buffer, other.m_Buffer, m_Size + 1);
		}


		friend std::ostream& operator<<(std::ostream& stream, const String& string);
		


		char& operator[](unsigned int index) {

			return m_Buffer[index];

		}

	private:
		char* m_Buffer;
		unsigned int m_Size;
	};

	
	std::ostream& operator<<(std::ostream& stream, const String& string) {

		stream << string.m_Buffer;
		return stream;


	}

	


}




void main14() {

	Copy::String s1("chen");
	Copy::String s2 = s1;

	
	s2[2] = 'o';
	std::cout << s1 << std::endl;
	std::cout << s2 << std::endl;
}