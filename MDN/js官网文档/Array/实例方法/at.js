/*
 * 在传递非负数时，at() 方法等价于括号表示法。例如，array[0] 和 array.at(0) 均返回第一个元素
 * 但是，当你需要从数组的末端开始倒数时，则不能使用 Python 和 R 语言中支持的 array[-1]，
 * 因为方括号内的所有值都会被视为字符串属性，因此你最终读取的是 array["-1"]，这只是一个普通的字符串属性而不是数组索引。
 * */

const arr = [1, 2, 3, 4, 5, 6, 7]; // 至少node16以上版本才可以

console.log(arr[-1]); // undefined
console.log(arr.at(-1)); // 7  at最常用的情况就是从后往前找

const arrayLike = {
  //类数组对象
  length: 2,
  0: "a",
  1: "b",
};
console.log(Array.prototype.at.call(arrayLike, -1)); // "b"
