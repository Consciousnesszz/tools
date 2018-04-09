/* ----------------  一些常用工具  ----------------- */

/**
 * deepclone
 */
const deepclone = (obj) => {
  const newObj = obj instanceof Array ? [] : {}
  // 返回基本类型参数
  if (typeof obj !== 'object') { return obj }
  for(let prop in obj) {
    newObj[prop] = typeof obj[prop] === 'object' ? deepclone(obj[prop]) : obj[prop]
  }
  return newObj
}

/**
 * mixin（js 基于原型链继承，区别基于类继承）
 * 解决多重继承问题： 1. 结构复杂  2. 优先顺序模糊  3. 功能冲突（重名）
 * ===> 解决方案：子类按顺序覆盖父类
 */
const mixin = (dest, mixins) => {
  // 将 dest 添加到 mixins 最后，保证子类方法不被覆盖
  const constructors = [...mixins, dest]
  const newPrototype = {}
  constructors.forEach(element => {
    const proto = element.prototype
    for (let prop in proto) {
      newPrototype[prop] = proto[prop]
    }
  })
  dest.prototype = newPrototype
}

/* ----------------  经典排序方法  --------------- */
/**
 * bubble sort
 * 通过对相邻数比较，将大的慢慢向后放完成排列
 */
const bubbleSort = (arr) => {
  const len = arr.length
  const newArr = [...arr]
  let temp
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

/**
 * selection sort
 * 通过每一次选择余下最小的进行排列
 */
const selectionSort = (arr) => {
  const len = arr.length
  const newArr = [...arr]
  let minIndex
  let temp
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

/**
 * insertion sort
 * 通过与左位比较，找到当前值应该插入的位置进行排序
 */
const insertionSort = (arr) => {
  const len = arr.length
  const newArr = [...arr]
  let preIndex
  let current
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

/**
 * shell sort（希尔排序）
 * 在插入排序基础上进行动态定义间隔，优先插入排序较远元素，
 * 间隔逐趟减小，使得整个数组基本有序，再对整体进行一次插入排序
 */
const shellSort = (arr) => {
  const len = arr.length
  const newArr = [...arr]
  let gap = Math.floor(len / 2)
  let temp
  while (gap !== 0) {
    for (let i = gap; i < len; i++) {
      temp = arr[i]
      for (let j = i - gap; j >= 0 && temp < arr[j]; j -= gap) {
        arr[j + gap] = arr[j]
      }
      arr[j + gap] = temp
    }
    gap = Math.floor(gap / 2)
  }
}

/**
 * merge sort（归并排序）
 * 自上而下递归：将数组分成小块 --> 进行大小比较 --> 合并成为较大块 --> 再次进行比较合并
 * * 需注意：
 *    js 没有尾递归优化，使用递归没有效率提升，还造成了内存泄露风险，所以在 js 中不推荐使用递归
 */
const merge = (left, right) => {
  const result = []
  // 当左右数值均有数据时，对左右第一位进行比较，将较小值放入 result
  while (left.length > 0 && right.length > 0) {
    if (left[0] <= right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }
  // 将剩余元素放入 result
  while (left.length) {
    result.push(left.shift())
  }
  while (right.length) {
    result.push(right.shift())
  }
  // 完成将有序小块合并成为有序大块
  return result
}
const mergeSort = (arr) => {
  // 递归终止条件为 当 arr.length 为 1 时
  const len = arr.length
  if (len < 2) { return arr }
  // 将数组分成小块
  const middle = Math.floor(len / 2)
  const left = arr.slice(0, middle)
  const right = arr.slice(middle)
  // 进行递归 merge
  return merge(mergeSort(left), mergeSort(right))
}
