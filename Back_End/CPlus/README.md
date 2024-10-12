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