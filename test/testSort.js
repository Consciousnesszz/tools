// 测试数组排序
import { expect } from 'chai'
import { bubbleSort, selectionSort, insertionSort, shellSort, mergeSort, quickSort } from '../src/sortFunc.js'
import * as sortFunc from '../src/sortFunc.js'

describe('测试排序方法', function () {
  for (let prop in sortFunc) {
    describe(`测试 ${prop}`, function () {
      it('空数组应该不做更改', function () {
        expect(sortFunc[prop]([]).join('')).to.be.equal([].join(''))
      })
      it('单元素数组应该不做更改', function () {
        expect(sortFunc[prop]([1]).join('')).to.be.equal([1].join(''))
      })
      it('正序数组应该不做更改', function () {
        expect(sortFunc[prop]([1, 2, 3, 5, 6, 8, 9]).join('')).to.be.equal([1, 2, 3, 5, 6, 8, 9].join(''))
      })
      it('倒序数组应该排列成为正序', function () {
        expect(sortFunc[prop]([9, 8, 7, 6, 5, 4, 3]).join('')).to.be.equal([3, 4, 5, 6, 7, 8, 9].join(''))
      })
      it('乱序数组应该排列成为正序', function () {
        expect(sortFunc[prop]([6, 8, 7, 9, 4, 3, 2]).join('')).to.be.equal([2, 3, 4, 6, 7, 8, 9].join(''))
      })
      it('重复元素数组应该排序正常', function () {
        expect(sortFunc[prop]([6, 8, 7, 9, 9, 3, 2]).join('')).to.be.equal([2, 3, 6, 7, 8, 9, 9].join(''))
      })
    })
  }
})
