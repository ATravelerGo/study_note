# C++学习
#号后面的就是预处理语句
他在实际编译发生之前就被处理了
```c++
#include <iostream>

``` 

std::cin.get(); 代表程序暂时停到这里，必须键入回车才会执行下面的代码

cpp所有文件都会被编译 但是头文件不会，因为头文件的内容在预处理时包含了进来
cpp编译后会生成.obj文件，然后会把多个.obj文件合并成一个执行文件.exe 也就是link

ctrl+F7 是编译指令，但是这个是单独编译一个文件，不会进行link连接
然后打开在文件夹管理中打卡文件会发现有.obj文件
![img.png](img.png)

![img_1.png](img_1.png)
这个生成是对整个项目进行编译，会进行link 结果生成.exe文件

main.cpp
```c++

#include <iostream>


//进行函数的声明
void Log(const char* message);  //函数声明的那个参数 可以随便写 甚至不写都可以

int main() {

	Log("hello world");
	std::cin.get();


	return 0;

}

```
log.cpp
```c++
#include<iostream>




void Log(const char* message) {
	std::cout << message << std::endl;
}
```

main.cpp居然可以调用log.cpp中的方法 仅需一个函数声明

这就是link的作用，在build的时候，所有cpp文件都会被编译,连接器会找到正确的log函数定义在哪里
当我们在log.cpp中把函数名字改了 回到main.cpp中 单独编译main.cpp是没问题的，
但是要整体build，就会报错，链接错误，找不到函数
会报无法解析的外部符号，指的是链接器无法解析这个符号，链接器的作用是链接函数


## C++编译器如何工作
从文本形式到实际可执行的二进制文件   预处理我们的代码，意味着所有的预处理器语句都会先处理，然后把整个c++内容 整理为抽象语法树，然后开始生产实际代码（机器可执行的代码）
有两个主要的操作需要进行
1. 编译（会生成.obj文件）
       编译的第一个阶段：预处理阶段的处理，#include为例 会把里面的内容复制到源文件里
例子 math.cpp
```c++

int Multiply(int a, int b) {
	int  result = a * b;
	return result;
#include "EndBrace.h"
```
EndBrace.h   他真的只有个右大括号
```c++
}
```

然后编译math.cpp你会发现真的编译成功了 毫无问题


#define INTEGER int   会把int替换为INTEGER    #if 1   #endif // 1 也是个预处理语句
```c++

#define INTEGER int 


#if 1
INTEGER Multiply(int a, int b) {
	INTEGER  result = a * b;
	return result;
}
#endif // 1


```
![img_2.png](img_2.png)
这个配置修改后就可以看到预处理后的文件内容，但是就不会生成.obj文件了 注意  这个叫预处理到文件，不是编译操作，还没走到编译操作呢

编译后生成的obj文件 里面都是二进制内容，不可读的 但是我们配置一个东西 
![img_3.png](img_3.png)
会生成ams文件，这个文件是我们程序员可读的，但是汇编语言
但是明显是没有优化的
![img_5.png](img_5.png)
开启后如果报错，报错是因为code检查配置 可以按照下面修改配置 ，然后再编译原来的cpp文件 会发现内容少了，汇编效率也搞了
![img_4.png](img_4.png)
2. 链接
![img_6.png](img_6.png)
这里可以设置入口函数，但是我们一般不手动配置 一般默认main
但是要记住，入口点不一定必须是一个叫main的函数

A函数使用了B函数  B函数咱们故意声明错误 
即时没有使用A函数 也会报错 其他文件可能会使用A函数，进而报错
如果我们在函数前面加static 那么表名这个函数 只在此文件中使用，其他文件使用这个函数 也是使用这个文件里的，而不是include 把代码复制过去
或者inline 关键字，获取我们实际的函数体并将函数调用替换为函数体  这个需要研究下
```c++

#include <iostream>

// 定义一个简单的内联函数
inline int square(int x) {
    return x * x;
}

int main() {
    int num = 5;

    // 调用内联函数
    std::cout << "The square of " << num << " is " << square(num) << std::endl;

    return 0;
}

```
调用内联函数：在main函数中，我们调用了square(num)，编译器可能会将这条调用替换为num * num，从而提高效率。

## C++变量
1. int是在一定范围内存储整数，他是四字节大小 -20亿到+20亿 是有符号的
2. 无符号整数 unsigned int 然后就可以表示40多亿
3. char 1字节
4. short 2字节
5. int 4字节
6. long 也是4字节，具体取决于编译器
7. long long 是8字节的数据
8. float 表示小数 占4字节  如果定义float 需要我们在小数后面加一个f符号
9. double 表示小数
10. bool 打印出来是 0 和 1  占一个字节 因为我们只能寻址字节，我们现在只能访问字节

sizeof(变量)  单位是字节  甚至括号都可以不要  sizeof 变量

指针
bool* c=true
bool& 代表引用

## 函数

## 头文件
声明某些类型的函数，只是声明 ，没有定义

#pragma once 的作用
比如A头文件包含了B头文件  如果B中定义了结构体
在一个cpp中引入了A 和B  那么会报错 B中的结构体 重复定义  这叫重复include
> #pragma once 的作用就是防止重复include

```c++

#ifndef _LOGH

#define _LOGH


void Log(const char* message);

#endif // !_LOGH

```
表示如果_LOGH变量被定义了 就走下面的代码

但我们使用 #pragma once  他就是上面的简写

尖括号只用于编辑器包含路径，引号可以做一切，但是通常引号用在相对路径

## 在vs中调试代码
断点

调试

## 条件与分支（if语句）

## 循环
for循环
while循环


## 控制流语句
continue 跳出当前循环，进入这个循环的下一个迭代
break 跳出循环，终止循环
return  退出函数，可能需要一个返回值

## 指针
```c++
int var = 10;
double* ptr =(double*)& var;

这是强制转换了
```


```c++
char* buffer = new char[10];

buffer[0] = 'A';


std::cout << buffer[0] << std::endl;
	buffer是个指针 他怎么会有【0】呢
在 C++ 中，虽然 buffer 是一个指针，但它指向的是一块内存区域，这块区域可以被视作数组。指针和数组在某些情况下具有类似的行为，这就是为什么你可以使用 buffer[0] 来访问指针所指向的内存。
指针与数组的关系：

当你使用 new char[10] 时，你在堆上分配了一块可以容纳 10 个 char 类型元素的内存。buffer 指向这块内存的起始地址。
C++ 支持通过指针来模拟数组的行为。指针可以像数组一样使用下标访问方式，即 buffer[i] 等同于 *(buffer + i)。
使用下标访问：

当你写 buffer[0] 时，编译器会将其转换为 *(buffer + 0)，也就是说，它会从指针 buffer 所指向的内存地址开始，向后偏移 0 个元素，读取第一个元素的值。
这就是为什么你可以用 buffer[0] 来访问指针所指向的内存。
```

## c++引用
引用是指针的扩展
```c++
int a=5

int& ref =a;

```
现在我们就创建了个a的引用   如果你编译后 你会发现压根没有ref这个变量  就跟a一样 使用ref就行 ,任一一个发生改变，都会影响双方的值，他们的值保持一致，只是我们给a取了个别名，他不会占据内存空间，编译后也不会出现他
> in& ref =a  这是引用    int* ptr=nullptr  这是指针  注意区别
 
但是比如你的ref引用的a 他就和a关联了 如果你ref=b 是不会改为成b的引用，只是修改值而已
如果想修改引用 推荐使用指针

## c++类 开启面向对象
> 默认情况下 类里面的属性都是私有的，也就是说只有类里面的函数可以访问

```c++
class Player {

	int x;
	int y;
	int speed;
};
```
我们需要设置public 才能让属性对外暴露
```c++
class Player {
public:
	int x;
	int y;
	int speed;
};
```

## 类和结构体的区别
什么时候用类 什么时候用结构体
类的成员默认是***私有***的
结构体的成员默认是***公有***的

结构体还在c++中存在是因为他希望与C保持向后兼容性
C没有类，但有结构体


## 如果写一个C++类
```c++

#include<iostream>



class Log {

public:
	const int LogLevelError = 0;
	const int LogLevelWarning = 1;
	const int LogLeveInfo = 2;
private:
	int m_LogLevel=LogLeveInfo;

public:
	void SetLevel(int level) {
		m_LogLevel=level;

	}

	void Error(const char* message) {
		if(m_LogLevel>=LogLevelError)
			std::cout << "[ERROR]:" << message << std::endl;
	}

	void Warn(const char* message) {
		if (m_LogLevel >= LogLevelWarning)
			std::cout <<"[WARNING]:" << message << std::endl;
	}
	void Info(const char* message) {
		if (m_LogLevel >= LogLeveInfo)
			std::cout << "[INFO]:" << message << std::endl;
	}	


};

void main(){

	Log log;
	log.SetLevel(log.LogLevelWarning);
	log.Warn("hello");
	log.Error("Hello");
	log.Info("hello");
 }
```

## c++中的静态static


1. 在类或结构体***外部***使用static关键字
   链接器不会再这个翻译单元的作用域之外寻找那个符号的定义
   有点像类的私有，其他所有的翻译单元都不能看到这个变量，除了自己的翻译单元能看到
   没有static定义的变量或者函数 就是全局的变量和函数，会参与link
2. 在类或结构体***内部***使用static关键字  需要在***类外部定义静态成员变量***
   出现 LNK2001 错误的原因是，你在类 Entity 中声明了静态变量 x 和 y，但没有在类外部定义它们。静态成员变量在类中声明之后，必须在类外进行定义和初始化，否则会导致链接器错误（如 LNK2001）。
```c++
// 在类外部定义静态成员变量
int Entity::x;
int Entity::y;
```
而且是所有实体共用static变量等
```c++


#include<iostream>

class Entity {
public:
	static	int x, y;

	void Print() {
		std::cout << x << ","<<y << std::endl;
	}

};


int Entity::x;
int Entity::y;

void main() {

	Entity entity;
	entity.x = 2; // Entity::x=2  这样才是正确规范的
	entity.y = 3; // Entity::y=3  这样才是正确规范的

	Entity e1 ;
	e1.x = 5; // Entity::x=5   这样才是正确规范的
	e1.y = 10;// Entity::y=10  这样才是正确规范的

	entity.Print();
	e1.Print();


	std::cin.get();
}

```

调用类里的static变量和函数都这么使用  Entity::Print() 这个是正确的调用方式
静态方法没有类实例
    如果在类实例里使用类的变量会报错的，因为没有给他一个Entity的引用
```c++

#include<iostream>

class Entity {
public:
	int x, y;

	static void Print() {
		std::cout << x << ","<<y << std::endl;
	}

};



void main() {

	Entity entity;
	entity.x = 2;
	entity.y = 3;

	Entity e1 ;
	e1.x = 5;
	e1.y = 10;

	Entity::Print();


	std::cin.get();
}```
这个是报错的

## c++中的局部静态（local static ）
```c++

#include<iostream>

void Function() {

	static int i = 0;
	i++;
	std::cout << i << std::endl;
}



void main() {

	Function();
	Function();

	std::cin.get();
}


```
会发现打印两次一次是1 一次是2  static定义的变量会存在的
如果去掉static 那么打印两次 一次是1  另一次还是1

## c++枚举
```c++
enum MyEnum
{
	A,B,C
};
MyEnum a = B;
void main() {
	std::cout << MyEnum::A << std::endl;

	std::cin.get();
}
```
枚举定义在class中 就是静态的  调用的时候 类：：静态变量

## c++构造函数  如果写了构造函数必须要写内容，不然会被报错
每次实例化对象的时候运行
他没有返回值类型***即使是void也不行***，并且他的名称必须和类的名称相同
```c++
class Entity {

public:
	float X, Y;


	 Entity() {
		X = 1.2f;
		Y = 3.5f;
	}

	void Print() {
		std::cout << "x:" << X << " y:" << Y << std::endl;
	}

};

```
在java中 int 等会有默认初始化，比如int类型会初始化为0 但是C++则不会
c++必须手动初始化所有基本类型
使用构造函数的时候是
```c++
Entity e(1.2f,3.5f); //!!!!!!!!!!!!!!!

e.Print();
```
如果想要删除默认的构造函数 可以
```c++
Log()=delete;
```

## c++析构函数
析构函数是在销毁对象时运行，卸载变量等东西，并清理使用过的内存
析构函数和构造函数很相似，就是在构造函数前面加~
```c++
~Entity() {
 std::cout << "Destroyed Entity!" << std::endl;

}
```

## c++继承
可以有效避免代码重复 ，这就是类的继承
```c++
class Player : public Entity
{
public:
	const char* Name;
	void PrintName() {
		std::cout<< Name << std::endl;
	}
private:
};

```
> 指针的大小会随着操作系统位数的不同而变化，而像 int 这样的基本数据类型的大小通常是固定的（比如 int 通常为 4 字节，无论是在 32 位还是 64 位系统上）。

## c++虚函数(跟多态有关，必须配置了才会多态)
虚函数允许我们在子类中重写方法 在方法前加***virtual***
```c++
#include<iostream>


class Entity
{
public:

	std::string GetName() { return "Entity"; }

	

private:

};

class Player:public Entity
{
public:
	Player(const std::string& name) {
		m_name = name;
	}
	
	std::string GetName() {
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

```
你遇到的问题是因为方法重载与对象的静态类型。
在你的代码中，Entity 类的 GetName() 方法不是虚函数，所以调用的是 Entity 类版本的 GetName()，而不是 Player 类的版本。
这是因为 C++ 默认情况下会根据***指针或引用的静态类型***来决定调用哪个函数。
> Entity* e1 = p; e1指针的静态类型就是最左边的那个 Entity,即使取的p也要按照静态类型取

当你将 Player 对象的指针 p 赋值给 Entity 的指针 e1 时，e1 的类型是 Entity*，
因此编译器在调用 e1->GetName() 时会根据 e1 的类型去调用 Entity::GetName()。
即使 e1 实际上指向的是一个 Player 对象，仍然调用的是 Entity::GetName()，
这是因为 GetName() 不是虚函数。


如果你希望通过 Entity* 指针调用 Player 类的 GetName()，
需要将 Entity 类中的 GetName() 方法声明为虚函数，
这样在运行时会根据对象的实际类型（而不是指针的静态类型）决定调用哪个版本的函数，
这种行为称为***多态***。

虚函数引入了一种叫做***动态联编***的东西
在函数前面加virtual 这样会告诉生成虚函数表，为这个函数，如果他被重写了了，你可以指向正确的函数，而不是旧的函数
其实就可以，但是还可以在重新函数的参数括号后面+override
```c++
std::string GetName() override {
	return m_name;
}
```
override 可写可不写的，但是推荐写，因为这样可读性更强

但是虚函数运行是有成本的
1. 额外的内存来存储虚函数表也叫v表，这样我们就可以分配到正确的函数，然后基类要有一个成员指针，指向V表
2. 每次调用虚函数时，我们需要遍历这个表，来确定要映射到哪个函数

在嵌入式中cpu性能很差，就避免使用虚函数把，但影响也不会很大


## c++纯虚函数
本质上与其他语言java或c#中的抽象方法或接口相同
纯虚函数允许我们在基类中定义一个没有实现的函数，然后强制子类去实现该函数
```c++
virtual std::string _Gettnames() = 0; 这叫定义了一个真正的纯虚函数

```
> 但是如果定义了虚函数，我们就不能直接构造对象了，需要有一个子类继承并实现父类的函数，然后才能使用
> 纯虚数在子类中必须实现 这样才能实例化


> 在c++中 接口也是用class关键字 里面写纯虚函数，如果一个类里面只有纯虚函数，那他就可以理解为是接口了 c++中没有interface的概念


## c++可见性
public  private protected

## c++数组
指针基本是c++数组工作方式的基础
```c++
int example[5];

int* ptr=example //这也是完全可以的

ptr[1] 是可以这么用的

```
另一种方式
```c++
int* intArr = new int[5];

```
为什么要动态的用new来分配，而不是在栈上创建
最大的原因是生存期
用new来分配内存，他讲一直存在，知道你删除

int example[5]; 他会直接在栈中创建，这是栈分配的数组
int* intArr = new int[5];他会间接寻址，这是指针放在栈，数据放在堆
```c++
class Entity
{
public:
	int example[5]; //这个会跟着Entity的内存走，占据Entity里面的空间，随着数组越来越大，类就越来越大
	int* intArr = new int[5];他会间接寻址 他会在类里面存个四字节指针，需要根据这个指针实际找到数组的内存地址，类的大小不会受数组大小的影响
	Entity() {
	
		for (int i = 0; i < 5; i++)
		{
			example[i] = 2;
		}

	};


private:

};
```

## c++字符串
```c++
    
	const char* name = "zhangchen";

    std::cout << name << std::endl;
    //是可以把zhangchen打印出来的
    
    char name2[7] = { 'z','c' };
    //打印出来是zc
    
    std::string name3 = "nihaoa ";
    //正常打印
```

## c++字符串字面量（没有完全看完）
基于字符串的东西
字符串字面量是在双引号之间的一串字符

## c++ const关键字（没有看完）
> const int* a; 表示不能修改指针指向的内容！！！！！  int const* a；一个意思
> 但是指针可以变
> int* const a; 作用相反,可以修改指针指向的内容，但是指针不可变
> 有个口诀 const 在* 前面就针对地址指向内容，在*后面就针对地址

```c++ 
 GetName() const {  //代表只能读类里面的属性
	return m_name;
}
const int* const GetX() const {
    return m_x
}
代表返回值的指针和指针的内容都不能变



```
## c++ mutable关键字（最后讲lambda的差点劲）
1. 与const一起使用,意味着类中的const方法可以修改这个成员，这是最常见的用法
```c++
 namespace Mutable {
	class Entity
	{
	public:
		const std::string& GetName() const {
			m_DebugCount++;
			return m_Name; 
		}
	private:
		mutable int m_DebugCount = 0;
		std::string m_Name;
	};
}

```
2. 用在lambda表达式中
3. 以上两个混用
```c++
在 C++ 中，const 对象的所有成员函数必须是 const 成员函数，
这样才能保证该对象不会被修改。你在代码中定义了一个 const 对象 e，
但 GetName() 函数不是 const 成员函数，因此编译器会报错。 
```

## c++的成员初始化列表
是我们在构造函数中初始化类成员（变量）一种方式
```c++
//这也是初始化的方式
	Entity()
		:m_Name("初始化"),m_scope(0)
	{
	}
```
> 我们为什么要使用这个
> 简洁 
> 只会初始化一次，咱们之前用的会初始化两次 只针对类成员，int等成员不会(Person Create  Person Create With zc)
> 使用成员初始化列表只会初始化一次(Person Create With zc) 所以极度推荐使用成员初始化列表
```c++
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
void main() {
	Mutable::Entity e;
	std::cout << e.GetName() << std::endl;
	std::cin.get();
}

```

## c++三元操作符

## 创建并初始化c++对象
对象至少占用一个字节的内存
使用new关键字就是分配到堆上
在堆上分配要比栈花费更长的时间，而且在堆上分配的话，您必须手动释放这些内存
delete 对象变量

如果对象太大，或者你要显式的控制对象的生存期（那就用堆上创建）
在堆上分配的时候 需要手动delete

推荐使用栈上创建

## c++ new关键字
new的主要目的是在堆上分配内存
new给我们找内存空间，然后他给我们一个指向那块内存的指针

## c++隐式转换与explicit关键字（未看完）
explicit放在构造函数前面 就意味着没有隐式的转换

## c++运算符及其重载（极度不会）

## c++的this关键字（难）
this也是个指针
```c++
this->x = x; //使用的时候这么使用
```

## c++的对象生存期（栈作用域生存期）
栈对象一出作用域就被释放了，被摧毁了

## c++智能指针（这里很重要，需要再次复习）
咱们用new创建的对象是在堆上创建
需要手动delete
智能指针的作用是实现这一过程自动化的一种方式，我们不需要手动delete
智能指针本质上是一个原始指针的包装
> unique_ptr 作用域指针，超过作用域就会delete
> 不能复制unique_ptr指针

要想使用智能指针需要
#include<memory>
std::unique_ptr<UniquePtr::Entity> e = std::make_unique<UniquePtr::Entity>();

> shared_ptr 引用指针
> auto shareE=std::make_shared<UniquePtr::Entity>();

## c++中的复制和拷贝构造函数（很重要）
```c++
Copy::Vector2 a = { 2,3 };

Copy::Vector2 b = a;

b.x = 10;

std::cout<< a.x << std::endl; //会发现不会影响a的值
//因为这样做 复制的是值 其实就跟整数赋值一样，a，b 占用了两个不同的内存地址

```
memcpy函数
在 C++ 中，memcpy 是一个标准库函数，用于从一个内存地址将指定数量的字节拷贝到另一个内存
从一个内存到另一个内存

在 C++ 中，所有的输出操作都是通过流对象来实现的
std::ostream 是这个

在 std::ostream& operator<<(std::ostream& stream, const String& string) 这个重载操作符函数中，当你使用 << 操作符时，两个参数是由 C++ 编译器隐式传递的

第一个参数：stream
这个参数是你调用 << 操作符时使用的输出流对象，比如 std::cout。当你写 std::cout << myString; 时，编译器自动将 std::cout 传递给 stream 参数。
第二个参数：string
这个参数是你使用 << 操作符时要输出的对象，比如 myString。当你写 std::cout << myString; 时，编译器会将 myString 作为第二个参数传递给 operator<< 函数中的 string 参数。

> friend 关键字可以让函数 访问类的私有变量


拷贝构造函数
c++在默认情况下会为你提供一个拷贝构造函数


Copy::String：这是一个类，内部使用了动态内存分配（指针 m_Buffer 指向堆上的内存），默认的拷贝构造函数执行的是浅拷贝，使得两个对象共享同一块内存。

Copy::Vector2：这是一个简单的结构体，没有动态内存分配，使用默认的拷贝构造函数会执行值拷贝，每个对象有自己的成员变量。

下面的代码仔细研读 ！！！！！！！！！！！！！
```c++
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




void main() {

	Copy::String s1("chen");
	Copy::String s2 = s1;

	
	s2[2] = 'o';
	std::cout << s1 << std::endl;
	std::cout << s2 << std::endl;
}

```

## c++的箭头操作符  -> 

## c++动态数组 特别是标准库的vector类 （std::vector）
```c++
#include<vector>
std::vector<DynamicArray::Vertex> verList; //类型要写在尖括号里面
```
现在是存储Vertex对象 比存储指针在技术上更优
意味着在内存中不是碎片

> 添加操作：push_back（）
> 清空操作：clear（）
> 单独移除某个元素：erase（verList.begin（）+1） 表示会将第二个元素进行删除
> f 后缀只能用在小数上


## c++的std::vector使用优化



## c++的标准库std::stack
```c++
#include <stack>
std::stack<int> s; // 定义一个存储整数的栈
```
常用操作
1. push()：向栈顶插入元素。
2. pop()：移除栈顶元素。
3. top()：访问栈顶元素（不移除）。
4. empty()：检查栈是否为空。
5. size()：返回栈中的元素个数。


## c++的vector使用优化
我们会发现动态数组刚开始容量是1 然后2 然后3  容量变了两次 就会导致好多次重新分配内存
> verList.reserve(3);  提前告知分配多少空间的数组
> verList.push_back(DynamicArray::Vertex(1,2,3));替换为verList.emplace_back( 1,2,3 );

与 push_back 不同的是，***emplace_back 直接在容器内部构造对象***，而不是先创建对象然后复制或移动到容器中。
这样可以提高性能，尤其是在添加复杂对象时。

## c++中使用库（静态链接）以GLFW为例
> 静态链接意味着这个库会被放到你的可执行文件中，他在你的.exe文件中或者其他操作系统下的可执行文件
> 动态链接是在运行时被链接的，所以你仍然有一些链接，你可以选择在程序运行时，装载动态链接库
> 主要的区别是，库文件是否被编译到exe文件中或链接到exe文件中
> 静态链接在技术上更快，因为编辑器或连接器实际上可以执行链接时优化之类的

1. 与解决方案同级目录下创建Dependencies 里面创建GLFW文件下 之后里面赋值粘贴好
![img_7.png](img_7.png)
2. 然后使用引入即可
![img_8.png](img_8.png)
3. #include <GLFW/glfw3.h> 这么使用
4. 严重性	代码	说明	项目	文件	行	禁止显示状态	详细信息
   错误	LNK2019	无法解析的外部符号 glfwInit，函数 main 中引用了该符号	CPlusNote	D:\Desktop\studyLogs\Back_End\CPlus\CPlusNote\CPlusNote\17_UseGLTF.obj	1		
这说明没有链接到真正的库，链接器找不到这个库，但是编译是没问题的，因为h文件里只有函数的声明，只告诉了我们有这个函数
但是build的时候需要链接找到这个函数的定义的地方
5. ![img_9.png](img_9.png)
6. ![img_11.png](img_11.png)
7. 现在然后就发现可以build成功了


## c++中使用动态库


## c++中创建和使用库
如果在vs中建立多个项目以及如何创建一个库让所有项目都能用
![img_12.png](img_12.png)
现在有两个项目一个Engine 一个 Game
![img_13.png](img_13.png)
Game作为应用程序生成exe可执行文件
![img_14.png](img_14.png)
Engine作为静态库可以让整个解决方案下的所有项目使用

-------------------------------------------------下面的是旧方法
Engine 执行build之后 会生成一个lib文件，记住这个路径
然后
![img_15.png](img_15.png)
![img_16.png](img_16.png)
这样就把lib文件导入了

Game 执行build就不会报错了 之前build报错都是link错误
-------------------------------------------------
但是操作很繁琐 我们有一种方法不用配置link  下面的是新方法

> 右键Game 点击 add 然后选择reference
![img_17.png](img_17.png)
然后就发现可以顺利运行！！！！！！！！！！！！！！！！！  非常简单 不用配置
> 直接引用
这样会把lib文件链接到我们的可执行文件中，就像我们已经把他添加到连接器输入一样
> 还有一个好处，Engine现在是Game的依赖，Game依赖于Engine，Engine内容变了后 我们压根不用build Engine
> Game用的就是最新的，都是自动处理的

----------------------------------------------------

## c++中如何处理多返回值（目前不会）
vs，fs 在函数里都是引用
![img_18.png](img_18.png)

## c++的模版 泛型plus，比泛型强大的多
所谓模版就是你给规则，基于你给编译器的规则
以下不是一个真正的函数，只有真正运行的时候，我们实际调用他的时候 这些函数才会被创建
```c++
template<typename T> === template<class T>  但是推荐使用typename

void Print(T value) {

	std::cout << value << std::endl;

}
```
使用的时候可以
```c++
	Print(123);
	Print<int>(123);//最好这么使用

```
在类中使用
```c++
template<int N>
class Array
{
public:
	
	int GetSize() const {

		return N;
	}

private:
	int m_Array[N];
};
void main() {
	Array<10> arr;
	std::cout << arr.GetSize() << std::endl;
	//Print(123);
	//Print("123");
	//engine::PrintMessage();
}
```

## c++的堆与栈内存的比较（再次复习）

## c++的宏
c++中使用预处理器来宏化某些操作，这样我们就不用一遍又一遍的手动输入代码了
```c++
#define WAIT std::cin.get()
void main() {
	WAIT;
}
```

## c++的auto关键字

