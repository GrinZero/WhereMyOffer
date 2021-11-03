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
    for (var j = i - 1; j > 0 && arr[j]-arr[i]>0 ; j--) arr[j+1]=arr[j]
    arr[j+1]=arr[i]
  }
}

function test() {
  let data = [1, 0, -12, 8, 30, -1];
  insertSort(data);
  console.log(data);
}
test();
