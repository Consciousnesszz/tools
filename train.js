// deepclone
const deepclone = (obj) => {
  let newObj = obj instanceof Array ? [] : {}
  // 返回基本类型参数
  if (typeof obj !== 'object') { return obj }
  for(let prop in obj) {
    newObj[prop] = typeof obj[prop] === 'object' ? deepclone(obj[prop]) : obj[prop]
  }
  return newObj
}

// bubble sort
// 通过对相邻数比较，将大的慢慢向后放完成排列
const bubbleSort = (arr) => {
  let len = arr.length, newArr = [...arr], temp
  for(let i = 0; i < len; i++) {
    for(let j = i; j < len - 1; j++) {
      if (newArr[j] > newArr[j + 1]) {
        temp = newArr[j]
        newArr[j] = newArr[j + 1]
        newArr[j + 1] = temp
      }
    }
  }
  return newArr
}

// selection sort
// 通过每一次选择余下最小的进行排列
const selectionSort = (arr) => {
  let len = arr.length, newArr = [...arr], minIndex, temp
  for (let i = 0; i < len; i++) {
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (newArr[minIndex] > newArr[j]) {
        minIndex = j
      }
    }
    temp = newArr[i]
    newArr[i] = newArr[minIndex]
    newArr[minIndex] = temp
  }
  return newArr
}

// insertion sort
// 通过与左右相邻位比较大小进行插入排序
const insertionSort = (arr) => {
  
}
