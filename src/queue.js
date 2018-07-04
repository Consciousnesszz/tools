/**
 * 队列（先进先出）
 * --> 优化：带有优先级的队列
 * 
 * 队列的应用：
 * 主要用在和时间有关的地方，如：
 *    作为缓冲区，调整 事件/数据 处理频率。在此基础上，实现如多线程，进程调度等功能。
 */ 

export class Queue {
  constructor(items) {
    this.items = items || []
  }

  // 进入队列需要有 优先级 属性
  enqueue(item, priority = 0) {
    const newItem = {
      item,
      priority,
    }

    if (this.isEmpty()) {
      this.items.push(newItem)
    } else {
      // 从队列尾部向前比较优先级添加
      let i = this.size()
      while (newItem.priority > this.items[i].priority) {
        i--
      }
      this.items.splice(i, 0, newItem)
    }
  }

  dequeue() {
    return this.items.shift().item
  }

  front() {
    return this.items[0].item
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
