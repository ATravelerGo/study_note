class Person {
  String name;

  static Person? instance;
  factory Person([String name='刘备']) {
    if (Person.instance == null) {
      // 第一次实例化
      Person.instance=Person.newSelf(name);
    }
    return Person.instance! ;
  }
  Person.newSelf(this.name);
}

void main() {
  Person p1 = Person('关于');

  print(p1.name);

  Person p2 = Person('张飞');

  print(p2.name);

}
