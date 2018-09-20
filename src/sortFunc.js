/* ----------------  经典排序方法  --------------- */
/**
 * bubble sort
 * 通过对相邻数比较，将大的慢慢向后放完成排列
 */
export const bubbleSort = (arr) => {
  if (arr.length <= 1) { return arr }
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
  if (arr.length <= 1) { return arr }
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
  if (arr.length <= 1) { return arr }
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
    // 将当前值插入到排序位（+1 抵消 while 循环最后用于判断的 --）
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
  if (arr.length <= 1) { return arr }
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
  if (arr.length <= 1) { return arr }
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

/**
 * heap sort(堆排序)
 * 堆排序是一种利用堆这种数据结构来排序的选择排序。
 * 堆是一个近似完全二叉树的结构，其特性为：子结点的键值或索引总是小于（或者大于）它的父节点。
 *
 * <1>.将初始待排序关键字序列(R1,R2....Rn)构建成大顶堆(子节点值小于父节点值的堆)，此堆为初始的无序区；
 * <2>.将堆顶元素R[1]与最后一个元素R[n]交换，此时得到新的无序区(R1,R2,......Rn-1)和新的有序区(Rn),且满足R[1,2...n-1]<=R[n]；
 * <3>.由于交换后新的堆顶R[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,......Rn-1)调整为新堆，然后再次将R[1]与无序区最后一个元素交换，
 *     得到新的无序区(R1,R2....Rn-2)和新的有序区(Rn-1,Rn)。不断重复此过程直到有序区的元素个数为n-1，则整个排序过程完成。
 */
// 维护堆的顶部为无序堆中的最大值
const heapify = (arr, index, len) => {
  // 生成 3 个元素的小堆（二叉树下标的规律）
  const left = index * 2 + 1
  const right = index * 2 + 2
  let largest = index
  let temp

  // 获取小堆中最大的元素下标
  if (left < len && arr[left] > arr[largest]) {
    largest = left
  }
  if (right < len && arr[right] > arr[largest]) {
    largest = right
  }

  // 将最大元素置换到顶部，继续比较下一层
  if (largest !== index) {
    temp = arr[index];
    arr[index] = arr[largest];
    arr[largest] = temp;
    heapify(arr, largest, len);
  }
}
export const heapSort = (arr) => {
  if (arr.length <= 1) { return arr }
  // 新建数组避免操作原数组
  const sortArr = [...arr]

  let heapSize = sortArr.length
  let temp

  // 循环生成大顶堆（ Math.floor(heapSize / 2) - 1 为二叉树倒数第二层最右侧下标）
  for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
    heapify(sortArr, i, heapSize)
  }

  // 将最大值替换到最后，并将剩余元素中最大值替换到顶部
  for (let j = heapSize - 1; j >= 1; j--) {
    temp = sortArr[0];
    sortArr[0] = sortArr[j];
    sortArr[j] = temp;
    heapify(sortArr, 0, --heapSize);
  }
  return sortArr
}

/**
 * counting sort(计数排序)
 * 计数排序(Counting sort)是一种稳定的排序算法。
 * 计数排序使用一个额外的数组C，其中第i个元素是待排序数组A中值等于i的元素的个数。
 * 然后根据数组C来将A中的元素排到正确的位置。** 它只能对整数进行排序。 **
 *
 * 运行时间：
 *    当输入的元素是n 个0到k之间的整数时，它的运行时间是 O(n + k)。
 * 优点：
 *    计数排序不是比较排序，排序的速度快于任何比较排序算法。
 * 缺点：
 *    由于用来计数的数组C的长度取决于待排序数组中数据的范围（等于待排序数组的最大值与最小值的差加上1），
 *    这使得计数排序对于数据范围很大的数组，需要大量时间和内存。
 */
export const countingSort = (arr) => {
  // 例：arr [3, 1, 5, 5]
  if (arr.length <= 1) { return arr }

  const len = arr.length // 4
  const sort = []
  const count = []
  let min = arr[0]
  let max = arr[0]

  for (let i = 0; i < len; i++) {
    // 记录最大最小值
    if (min > arr[i]) { min = arr[i] } // 1
    if (max < arr[i]) { max = arr[i] } // 5

    // 记录相同数字出现的次数
    // count = [empty, 1, empty, 1, empty, 2]
    count[arr[i]] = count[arr[i]] ? count[arr[i]] + 1 : 1
  }

  // 累加 count，记录填充后每个 key 结束的数组 length
  // 例： count = [empty, 1, 1, 2, 2, 4]
  for (let j = min; j < max; j++) {
    count[j + 1] = (count[j] || 0) + (count[j + 1] || 0)
  }

  // 循环取得原数值
  for (let k = 0; k < len; k++) {
    // 按结束length - 1 取得下标挨个放入排序数组
    sort[count[arr[k]] - 1] = arr[k]
    // 使用一次之后记录的 length -= 1
    count[arr[k]]--
  }

  return sort
}

/**
 * bucket sort(桶排序)
 * 桶排序是计数排序的升级版。它利用了函数的映射关系，高效与否的关键就在于这个映射函数的确定。
 * 桶排序 (Bucket sort)的工作的原理：
 *    假设输入数据服从均匀分布，将数据分到有限数量的桶里，每个桶再分别排序（有可能再使用别的排序算法或是以递归方式继续使用桶排序进行排序）
 *
 * 关于桶的数量：
 *    桶排序最好情况下使用线性时间O(n)，桶排序的时间复杂度，取决与对各个桶之间数据进行排序的时间复杂度，因为其它部分的时间复杂度都为O(n)。
 *    很显然，桶划分的越小，各个桶之间的数据越少，排序所用的时间也会越少。但相应的空间消耗就会增大。
 *
 * @param  array 数组
 * @param  num   桶的数量
 */

export const bucketSort = (arr, num) => {
  if (arr.lenght <= 1) { return arr }

  const len = arr.length
  const buckets = []
  const reg = /^[1-9]+[0-9]*$/  // 以 1-9 开头，0-9 结尾
  let sort = []
  let min = arr[0]
  let max = arr[0]
  let space

  // 保证 num 存在
  num = num || (num > 1 && reg.test(num) ? num : 10);

  // 找出最大最小值
  for (let i = 1; i < len; i++) {
    if (arr[i] < min) { min = arr[i] }
    if (arr[i] > max) { max = arr[i] }
  }

  // 计算每个桶有多大的空间
  space = (max - min + 1) / num

  for (let j = 0; j < len; j++) {
    // 计算当前数字应该属于哪个桶
    let index = Math.floor((arr[j] - min) / space)
    if (buckets[index]) { // 对非空桶进行插入排序
      let k = buckets[index].length - 1
      while (k >= 0 && buckets[index][k] > arr[j]) {
        buckets[index][k + 1] = buckets[index][k]
        k--
      }
      buckets[index][k + 1] = arr[j]
    } else { // 初始化空桶
      buckets[index] = []
      buckets[index].push(arr[j])
    }
  }

  // 将所有的桶结合
  for (let n = 0; n < num; n++) {
    if (buckets[n]) {
      sort = sort.concat(buckets[n])
    }
  }

  return sort
}

/**
 * radix sort(基数排序)
 * 基数排序也是非比较的排序算法，对每一位进行排序，从最低位开始排序，复杂度为O(kn),n 为数组长度，k 为数组中的数的最大的位数
 *
 * 基数排序有两种方法：
 *  MSD 从高位开始进行排序
 *  LSD 从低位开始进行排序
 *
 * 基数排序适用于：
 *  (1)数据范围较小，建议在小于1000
 *  (2)每个数值都要大于等于0
 *
 * @param  arr 待排序数组
 * @param  maxDigit 最大位数
 */

export const radixSort = (arr, maxDigit) => {
  if (arr.length <= 1) { return arr }

  const sort = [ ...arr ]
  const len = sort.length
  const bucket = []

  // 获取最大位数
  if (!maxDigit) {
    maxDigit = 1
    for (let i = 0; i < len; i++) {
      let digit = 1
      let curr = sort[i]
      while (curr / 10 >= 1) {
        digit += 1
        curr /= 10
      }
      if (digit > maxDigit) { maxDigit = digit }
    }
  }

  for (let j = 0, dev = 1, mod = 10; j < maxDigit; j++, dev *= 10, mod *= 10) {
    for (let k = 0; k < len; k++) {
      // 计算 数组低位 的 index，并放入对应桶中
      let index = parseInt((sort[k] % mod) / dev)
      if (!bucket[index]) {
        bucket[index] = []
      }
      bucket[index].push(sort[k])
    }

    // 将 当前位排序完成后的值 放入原数组，进行下一位的排序
    let pos = 0
    for (let m = 0; m < bucket.length; m++) {
      let value = null
      if (bucket[m]) {
        while (value = bucket[m].shift()) {
          sort[pos] = value
          pos++
        }
      }
    }
  }

  return sort
}

/**
 * 总结
 * 计数排序 vs 桶排序 vs 基数排序
 * 这三种排序算法都利用了桶的概念，但对桶的使用方法上有明显差异：
 *
 * 计数排序：利用数组 index，每个桶只存储单一键值
 * 桶排序：均匀分配 最大值到最小值之间的差值，让每个桶存储一定范围的数值
 * 基数排序：根据键值的每位数字来分配桶（个位，十位。。。）
 */
