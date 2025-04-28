// Array.from() 从可迭代或类数组对象创建一个新的浅拷贝的数组实例，如果数组里没有引用对象，那他就相当于深拷贝！！！！ 返回一个新的数组实例
const arr = [{ name: "张辰" }, 2, 36, 5];
const arr1 = Array.from(arr, (x) => x);
arr[0].name = "李四";
arr[1] = 10;
console.log(arr1); //   [ { name: '李四' }, 2, 36, 5 ]  这里是个很大的关注点,对比下面看好

const arr2 = [1, 3, 5, 6];
const arr3 = arr2;
arr2[0] = 20;
console.log(arr3); //   [ 20, 3, 5, 6 ]

const arr4 = Array.from("foo");
console.log(arr4); //   [ 'f', 'o', 'o' ]
