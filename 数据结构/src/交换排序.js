// 交换排序

// 用while的写法
const arr = [10, 5, 60, 50, 100, 70];
const exchangeSort = (arr) => {
  let begin_index = 0;
  while (begin_index <= arr.length - 1) {
    let min = arr[begin_index];
    let min_index = begin_index;
    for (let i = begin_index; i < arr.length; i++) {
      if (arr[i] < min) {
        min_index = i;
      }
    }

    const temp = arr[min_index];
    arr[min_index] = arr[begin_index];

    arr[begin_index] = temp;

    begin_index++;
    //
  }

  return arr;
};

// console.log(exchangeSort(arr));

// 双层for的语法

const exchangeSortByFor = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      const temp = arr[minIndex];
      arr[minIndex] = arr[i];
      arr[i] = temp;
    }
  }

  return arr;
};

console.log(exchangeSortByFor(arr));

console.log("冒泡排序需要在写一遍");
