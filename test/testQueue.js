// 测试队列结构
import { expect } from 'chai'
import { Queue } from '../src/queue'

describe('测试队列结构', function () {
  const queue = new Queue([1, 2])

  it('测试 isEmpty 方法', function () {
    expect(queue.isEmpty()).to.be.equal(false)
  })
  it('测试 size 方法', function () {
    expect(queue.size()).to.be.equal(2)
  })
  it('测试 front 方法', function () {
    expect(queue.front()).to.be.equal(1)
  })
  it('测试 print 方法', function () {
    expect(queue.print()).to.be.equal('1,2')
  })
  it('测试 enqueue 方法', function () {
    queue.enqueue(3)
    expect(queue.print()).to.be.equal('1,2,3')
  })
  it('测试 dequeue 方法', function () {
    expect(queue.dequeue()).to.be.equal(1)
  })
  it('测试 clear 方法', function () {
    queue.clear()
    expect(queue.print()).to.be.equal('')
  })
  it('队列结构应该先进先出', function () {
    queue.enqueue(1)
    queue.enqueue(2)
    queue.dequeue()
    expect(queue.print()).to.be.equal('2')
  })
})
