
#include<iostream>



class Log {

public:

	enum Level
	{
		LevelError, LevelWarning, LevelInfo
	};
	
private:
	Level m_LogLevel= LevelInfo;

public:
	void SetLevel(Level level) {
		m_LogLevel=level;

	}

	void Error(const char* message) {
		if(m_LogLevel>= LevelError)
			std::cout << "[ERROR]:" << message << std::endl;
	}

	void Warn(const char* message) {
		if (m_LogLevel >= LevelWarning)
			std::cout <<"[WARNING]:" << message << std::endl;
	}
	void Info(const char* message) {
		if (m_LogLevel >= LevelInfo)
			std::cout << "[INFO]:" << message << std::endl;
	}	


};


void main2(){

	Log log;
	log.SetLevel(Log::LevelError);
	log.Warn("hello");
	log.Error("Hello");
	log.Info("hello");


	
 }