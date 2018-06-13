// 测试深拷贝
import { expect } from 'chai'
import deepClone from '../src/deepClone'

// 避免方法指向不同报错
const baz = (arg) => arg

describe('深拷贝函数的测试', function () {
  it('空对象应不做更改', function () {
    expect(deepClone({})).to.be.deep.equal({})
  })
  it('数据对象应拷贝成功', function () {
    expect(deepClone({ foo: 'bar' })).to.be.deep.equal({ foo: 'bar' })
  })
  it('方法对象应拷贝成功', function () {
    expect(deepClone({ baz })).to.be.deep.equal({ baz })
  })
  it('混合对象应拷贝成功', function () {
    expect(deepClone({
      foo: 'bar',
      baz,
    })).to.be.deep.equal({
      foo: 'bar',
      baz,
    })
  })
})
