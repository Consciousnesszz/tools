// 测试深拷贝
import { expect } from 'chai'
import mixin from '../src/mixin'

function dest() {}
dest.prototype.a = () => { return 'dest a' }

function foo() {}
foo.prototype.a = () => { return 'foo a' }
foo.prototype.b = () => { return 'foo b' }

function bar() {}
bar.prototype.c = () => { return 'bar c' }

mixin(dest, [foo, bar])

describe('mixin 测试', function () {
  it('指定对象本身方法不应被覆盖', function () {
    expect(dest.prototype.a()).to.be.equal('dest a')
  })
  it('mixins 方法应该混入到指定对象中', function () {
    expect(dest.prototype.b()).to.be.equal('foo b')
    expect(dest.prototype.c()).to.be.equal('bar c')
  })
})
