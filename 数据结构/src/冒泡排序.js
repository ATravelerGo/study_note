// 冒泡排序 每次都会把最大的排到最后面

const arr = [10, 5, 60, 50, 100, 70];

const bubblingSort = (arr) => {
  let isSorted = false;
  let unsorted_until_index = arr.length - 1;
  while (!isSorted) {
    isSorted = true; //这里是假设循环之前这个数组是排序好的
    for (let i = 0; i < unsorted_until_index; i++) {
      if (arr[i] > arr[i + 1]) {
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        isSorted = false;
      }
    }
    unsorted_until_index--;
  }
  console.log("arr", arr);
};

bubblingSort(arr);
