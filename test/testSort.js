// 测试数组排序
import { expect } from 'chai'
import * as sortFunc from '../src/sortFunc'

describe('测试排序方法', function () {
  for (let prop in sortFunc) {
    describe(`测试 ${prop}`, function () {
      it('空数组应该不做更改', function () {
        expect(sortFunc[prop]([])).to.be.deep.equal([])
      })
      it('单元素数组应该不做更改', function () {
        expect(sortFunc[prop]([1])).to.be.deep.equal([1])
      })
      it('正序数组应该不做更改', function () {
        expect(sortFunc[prop]([1, 2, 3, 5, 6, 8, 9])).to.be.deep.equal([1, 2, 3, 5, 6, 8, 9])
      })
      it('倒序数组应该排列成为正序', function () {
        expect(sortFunc[prop]([9, 8, 7, 6, 5, 4, 3])).to.be.deep.equal([3, 4, 5, 6, 7, 8, 9])
      })
      it('乱序数组应该排列成为正序', function () {
        expect(sortFunc[prop]([6, 8, 7, 9, 4, 3, 2])).to.be.deep.equal([2, 3, 4, 6, 7, 8, 9])
      })
      it('重复元素数组应该排序正常', function () {
        expect(sortFunc[prop]([6, 8, 7, 9, 9, 3, 2])).to.be.deep.equal([2, 3, 6, 7, 8, 9, 9])
      })
    })
  }
})
