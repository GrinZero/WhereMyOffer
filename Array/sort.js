function test() {
  let data = [1, 0, -12, 8, 30, -1];
  quickSort(data);
  console.log(data);
}
test();

function partition(arr, left, right) {
  let pivot = left, //左值作为基准
    index = pivot + 1;
  for (let i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index);
      index++;
    }
  }
  swap(arr, pivot, index - 1);
  return index - 1;
}
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
function quickSort(arr, left, right) {
  let len = arr.length,
    partitionIndex;
  left = typeof left != "number" ? 0 : left;
  right = typeof right != "number" ? len - 1 : right;
  if (left < right) {
    partitionIndex = partition(arr, left, right);
    quickSort(arr, left, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, right);
  }
}

/**
 * 冒泡排序，最经典的排序
 * @param {*} arr
 * @author SourceHeartLock
 */
function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
}

/**
 * 插入排序，最经典的排序
 * @param {*} arr
 * @author SourceHeartLock
 */
function selectionSort(arr) {
  let len = arr.length;
  let minIndex = 0;
  for (let i = 0; i < len; i++) {
    for (var j = i + 1; j < len; j++) {
      if (arr[minIndex] - arr[j] > 0) minIndex = j;
    }
    let temp = arr[minIndex];
    arr[minIndex] = arr[i];
    arr[i] = temp;
  }
}

/**
 * 阅读v8引擎的源码，发现对于length<10的数组使用插入排序，对于length>=10的数组使用快速排序
 * @author SourceHeartLock
 * @param {*} arr
 */
function insertSort(arr) {
  let len = arr.length;
  for (let i = 1; i < len; i++) {
    let current = arr[i];
    for (var j = i - 1; j >= 0 && arr[j] - current > 0; j--)
      arr[j + 1] = arr[j];
    arr[j + 1] = current;
  }
}

/**
 * 希尔排序
 * @param {*} arr
 */
function shellSort(arr) {
  let len = arr.length,
    gap = 1,
    current;
  while (gap < len / 3) gap = gap * 3 + 1;
  for (gap; gap > 0; gap = Math.floor(gap / 3)) {
    for (let i = gap; i < len; i++) {
      current = arr[i];
      for (var j = i - gap; j >= 0 && arr[j] - current > 0; j -= gap)
        arr[j + gap] = arr[j];
      arr[j + gap] = current;
    }
  }
}
