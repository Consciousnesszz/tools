// 栈，具有特殊后进先出行为（LIFO）的数组
export class Stack {
  constructor(items) {
    this.items = items || []
  }

  push(item) {
    return this.items.push(item)
  }

  pop() {
    return this.items.pop()
  }

  peek() {
    return this.items[0]
  }

  isEmpty() {
    return this.items.length === 0
  }

  clear() {
    this.items = []
  }

  size() {
    return this.items.length
  }

  print() {
    return this.items.toString()
  }
}

/*-----  栈的应用：进制转换，平衡圆括号，汉诺塔  -----*/
/**
 * 进制转换
 * @param decNumber 需要转换的数字
 * @param base      目标进制
 */
export function baseConverter(decNumber, base) {
  const remStack = new Stack()
  const digits = '0123456789ABCDEF' // 位数
  let rem = 0
  let baseString = ''

  while (decNumber > 0) {
    rem = Math.floor(decNumber % base)
    remStack.push(rem)
    decNumber = Math.floor(decNumber / base)
  }

  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop()]
  }

  return baseString
}

/**
 * 平衡圆括号
 * 测试字符串中的圆括号是否能够对应
 * 例：
 *  '(()())' true
 *  '(()' false 左边较多
 *  '(())))' false 右边较多
 * @param str 需要平衡的字符串
 */
export function isBracketBalanced(str) {
  const pattern = /^(\(|\))*$/  // 开头到结尾均为 ( 或 )
  if (!pattern.test(str)) {
    throw new Error('请输入以英文左右括号组成的字符串')
  }

  const stack = new Stack()
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      stack.push(str[i])
    } else {
      // 右括号多余左括号的情况
      if (!stack.pop()) {
        return false
      }
    }
  }

  // 左括号多余右括号的情况
  return stack.isEmpty()
}

/**
 * 汉诺塔
 * 利用栈后进先出，来模拟汉诺塔规则中的柱子
 * @param num    需要移动的层数
 * @param source 源头栈
 * @param buffer 缓冲栈
 * @param target 目标栈
 */
function move(n ,source, target) {
  target.push(source.pop())
  // console.log(`将${n}从${source}移动到${target}`)
}

export function hanoi(n, source, buffer, target) {
  if (n === 0) { return }

  // 将 初始柱 的前 n - 1 个块，通过 目标柱，移动到 缓冲柱
  hanoi(n - 1, source, target, buffer)
  // 将最大一块移入目标柱
  move(n, source, target)
  // 将之前移动到 缓冲柱 的 n - 1 个块，通过 初始柱，移动到 目标柱
  hanoi(n - 1, buffer, source, target)
}
