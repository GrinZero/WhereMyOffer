/**
 * 冒泡排序，最经典的排序
 * @param {*} arr 
 */
function bubbleSort(arr){
    let len=arr.length
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len-i-1; j++) {
            if(arr[j]>arr[j+1]){
                let temp = arr[j+1];
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
}

function selectionSort(arr){
    let len=arr.length
    let minIndex=0
    for (let i = 0; i < len; i++) {
        for (let j = i+1; j < len; j++) {
            if(arr[minIndex]-arr[j]>0){
                let temp=arr[j]
                arr[minIndex]=arr[j]
                arr[j]=temp
            }
        }
        
    }
}

//阅读v8引擎的源码，发现对于length<10的数组使用插入排序，对于length>=10的数组使用快速排序
function insertSort(arr){
    for (let i = 0; i < arr.length; i++) {
        
        for (let j = i-1; j >0; j--) {
            
        }
        
    }
}


function test() {
    let data=["1",0,"a",8,30,-1]
    bubbleSort(data)
    console.log(data)
}
test();
