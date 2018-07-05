// 测试栈结构
import { expect } from 'chai'
import { Stack, baseConverter, isBracketBalanced, hanoi } from '../src/stack'

describe('测试栈结构', function () {
  const stack = new Stack([1, 2])

  it('测试 isEmpty 方法', function () {
    expect(stack.isEmpty()).to.be.equal(false)
  })
  it('测试 size 方法', function () {
    expect(stack.size()).to.be.equal(2)
  })
  it('测试 peek 方法', function () {
    expect(stack.peek()).to.be.equal(1)
  })
  it('测试 print 方法', function () {
    expect(stack.print()).to.be.equal('1,2')
  })
  it('测试 push 方法', function () {
    stack.push(3)
    expect(stack.print()).to.be.equal('1,2,3')
  })
  it('测试 pop 方法', function () {
    expect(stack.pop()).to.be.equal(3)
  })
  it('测试 clear 方法', function () {
    stack.clear()
    expect(stack.print()).to.be.equal('')
  })
  it('栈结构应该后进先出', function () {
    stack.push(1)
    stack.push(2)
    stack.pop()
    expect(stack.print()).to.be.equal('1')
  })
})

describe('测试栈的应用', function () {
  describe('测试进制转换', function () {
    const digits = '0123456789ABCDEF'
    for (let i = 2; i <= 16; i++) {
      it(`测试 ${i} 进制`, function () {
        expect(baseConverter(i, i)).to.be.equal('10')
      })
    }
  })

  describe('测试平衡括号', function () {
    it('()应是平衡的', function () {
      expect(isBracketBalanced('()')).to.be.equal(true)
    })
    it('(()())应是平衡的', function () {
      expect(isBracketBalanced('(()())')).to.be.equal(true)
    })
    it('(()()应是不平衡的', function () {
      expect(isBracketBalanced('(()()')).to.be.equal(false)
    })
    it('(()))应是不平衡的', function () {
      expect(isBracketBalanced('(()))')).to.be.equal(false)
    })
  })

  describe('测试汉诺塔', function () {
    const source = new Stack()
    const buffer = new Stack()
    const target = new Stack()
    const n = 5
    let sourcePrint = ''

    for (let i = 0; i < n; i++) {
      source.push(i)
    }
    sourcePrint = source.print()
    hanoi(n, source, buffer, target)

    it('源头柱应该没有剩余块', function () {
      expect(source.isEmpty()).to.be.equal(true)
    })
    it('目标柱应该完成转移', function () {
      expect(target.print()).to.be.equal(sourcePrint)
    })
  })
})
