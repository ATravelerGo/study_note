import 'dart:developer';

class Person {
  String username = '';
  int age = 0;

  Person({username, age}) {
    this.username = username;
    this.age = age;
  }
  // 命名构造函数
  Person.origin({username,age}){
    this.username=username;
    this.age=age;
  }

  void printInfo() {
    print('我是$username,我的年纪是$age');
  }
}

void main() {
  Person p1 = new Person(username: '张三', age: 18);
  p1.printInfo();


  Person p2 = new Person.origin(username: '李四', age: 22);
  p2.printInfo();
}
