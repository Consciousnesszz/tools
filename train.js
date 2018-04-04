/* ----------------  一些常用工具  ----------------- */

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

// clone array

// mixin（js 基于原型链继承，区别基于类继承）
// 解决多重继承问题： 1. 结构复杂  2. 优先顺序模糊  3. 功能冲突（重名）
// ===> 解决方案：子类按顺序覆盖父类
const mixin = (dest, mixins) => {
  // 将 dest 添加到 mixins 最后，保证子类方法不被覆盖
  const constructors = [...mixins, dest]
  const newPrototype = {}
  constructors.forEach(element => {
    for (let prop in element) {
      newPrototype[prop] = element[prop]
    }
  })
  dest.prototype = newPrototype
}

/* ----------------  经典排序方法  --------------- */
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
// 通过与左位比较，找到当前值应该插入的位置进行排序
const insertionSort = (arr) => {
  let len = arr.length, newArr = [...arr], preIndex, current
  for(let i = 1; i < len; i++) {
    preIndex = i - 1
    current = newArr[i]
    // 将比当前值大的前值全部向前移动一位
    while(preIndex >= 0 && newArr[preIndex] > current) {
      newArr[preIndex + 1] = newArr[preIndex]
      preIndex--
    }
    // 将当前值插入到排序位
    newArr[preIndex + 1] = current
  }
  return newArr
}
