// call和apply都是为了解决改变this的指向，作用都是相同的，只是传参的方式不同
// 除了第一个参数外，call可以接受一个参数列表，apply只能接受一个参数数组

let a = {
  value: 1,
};

function getValue(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
}

// getValue.call(a, "张辰", "13");
//
// getValue.apply(a, ["chen", "4"]);

function fn(a, b, c, d) {
  console.log(a, b, c, d);
  console.log(this);
}

// fn(1, 2, 3, 4, 5);

// const newFn = fn.bind("ctx", 1, 2);
// newFn(3, 4);

//手写bind函数
Function.prototype.myBind = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  const _this = this;
  const args = [...arguments].slice(1);
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments);
    }
    return _this.apply(context, args.concat(...arguments));
  };
};
