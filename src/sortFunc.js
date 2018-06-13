/* ----------------  经典排序方法  --------------- */
/**
 * bubble sort
 * 通过对相邻数比较，将大的慢慢向后放完成排列
 */
export const bubbleSort = (arr) => {
  // 新建数组避免操作原数组
  const sortArr = [...arr]
  const len = sortArr.length
  let temp

  // console.time('冒泡排序耗时:')
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (sortArr[j] > sortArr[j + 1]) {
        temp = sortArr[j]
        sortArr[j] = sortArr[j + 1]
        sortArr[j + 1] = temp
      }
    }
  }
  // console.timeEnd('冒泡排序耗时:')

  return sortArr
}

/**
 * selection sort
 * 通过每一次选择余下最小的进行排列
 */
export const selectionSort = (arr) => {
  // 新建数组避免操作原数组
  const sortArr = [...arr]
  const len = sortArr.length
  let minIndex
  let temp

  // console.time('选择排序耗时:')
  for (let i = 0; i < len; i++) {
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (sortArr[minIndex] > sortArr[j]) {
        minIndex = j
      }
    }
    temp = sortArr[i]
    sortArr[i] = sortArr[minIndex]
    sortArr[minIndex] = temp
  }
  // console.timeEnd('选择排序耗时:')

  return sortArr
}

/**
 * insertion sort
 * 通过与左位比较，找到当前值应该插入的位置进行排序
 */
export const insertionSort = (arr) => {
  // 新建数组避免操作原数组
  const sortArr = [...arr]
  const len = sortArr.length
  let preIndex
  let current

  // console.time('插入排序耗时:')
  for (let i = 1; i < len; i++) {
    preIndex = i - 1
    current = sortArr[i]
    // 将比当前值大的前值全部向前移动一位
    while (preIndex >= 0 && sortArr[preIndex] > current) {
      sortArr[preIndex + 1] = sortArr[preIndex]
      preIndex--
    }
    // 将当前值插入到排序位
    sortArr[preIndex + 1] = current
  }
  // console.timeEnd('插入排序耗时:')

  return sortArr
}

/**
 * shell sort（希尔排序）
 * 在插入排序基础上进行动态定义间隔，优先插入排序较远元素，
 * 间隔逐趟减小，使得整个数组基本有序，再对整体进行一次插入排序
 */
export const shellSort = (arr) => {
  // 新建数组避免操作原数组
  const sortArr = [...arr]
  const len = sortArr.length
  let gap = 1
  let temp

  // console.time('希尔排序耗时:')
  // 对不同 len 的数组动态定义间隔序列
  while (gap < len / 5) {
    gap = gap * 5 + 1
  }
  while (gap > 0) {
    for (let i = gap; i < len; i++) {
      temp = sortArr[i]
      let j = i - gap
      for (j; j >= 0 && temp < sortArr[j]; j -= gap) {
        sortArr[j + gap] = sortArr[j]
      }
      sortArr[j + gap] = temp
    }
    gap = Math.floor(gap / 5)
  }
  // console.timeEnd('希尔排序耗时:')

  return sortArr
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
export const mergeSort = (arr) => {
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

/**
 * quick sort（归并排序）
 * 快速排序使用分治法来把一个串（list）分为两个子串（sub-lists）。具体算法描述如下：
 *
 * <1>.从数列中挑出一个元素，称为 "基准"（pivot）；--> 通常取 list 中间位
 * <2>.重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。
 *     在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
 * <3>.递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。
 */
export const quickSort = (arr) => {
  if (arr.length <= 1) { return arr }
  // 新建数组避免操作原数组
  const sortArr = [...arr]

  // 将基准值取出，否则会多次放入 right（splice 方法返回数组）
  const pivot = sortArr.splice(Math.floor(sortArr.length / 2), 1)[0]
  const left = []
  const right = []

  sortArr.map(item => {
    if (item < pivot) {
      left.push(item)
    } else {
      right.push(item)
    }
  })

  return quickSort(left).concat([pivot], quickSort(right))
}
