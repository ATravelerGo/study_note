//闭包：函数A返回了一个函数B，函数B中使用了函数A的变量，  函数B就称为闭包

function A() {
  const a = 10;

  return function () {
    console.log(a);
  };
}

const bibao = A();

bibao();
