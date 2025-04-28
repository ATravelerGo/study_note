const array1 = ["a", "b", "c"];
const array2 = ["d", "e", "f"];
const array3 = array1.concat(array2);
array2[0] = "deded";

console.log(array3); // [ 'a', 'b', 'c', 'd', 'e', 'f' ]
