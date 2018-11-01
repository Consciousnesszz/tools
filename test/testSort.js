// 测试数组排序
import { expect } from 'chai'
import * as sortFunc from '../src/sortFunc'

const positiveSequence = [1, 2, 3, 5, 6, 8, 9, 12, 25]
const invertedSequence = [99, 15, 9, 8, 7, 6, 5, 4, 3]
const outInOrder = [6, 8, 7, 9, 17, 30, 4, 3, 2]
const repeatingSequence = [6, 8, 7, 88, 77, 77, 9, 9, 3, 2]
const standardSortFunc = (arr) => arr.concat([]).sort((a, b) => a - b)

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
        expect(sortFunc[prop](positiveSequence)).to.be.deep.equal(standardSortFunc(positiveSequence))
      })
      it('倒序数组应该排列成为正序', function () {
        expect(sortFunc[prop](invertedSequence)).to.be.deep.equal(standardSortFunc(invertedSequence))
      })
      it('乱序数组应该排列成为正序', function () {
        expect(sortFunc[prop](outInOrder)).to.be.deep.equal(standardSortFunc(outInOrder))
      })
      it('重复元素数组应该排序正常', function () {
        expect(sortFunc[prop](repeatingSequence)).to.be.deep.equal(standardSortFunc(repeatingSequence))
      })
    })
  }
})
