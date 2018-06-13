/**
 * mixin（js 基于原型链继承，区别基于类继承）
 * 解决多重继承问题： 1. 结构复杂  2. 优先顺序模糊  3. 功能冲突（重名）
 * ===> 解决方案：子类按顺序覆盖父类
 */
export default mixin = (dest, mixins) => {
  // 将 dest 添加到 mixins 最后，保证子类方法不被覆盖
  const constructors = [...mixins, dest]
  const newPrototype = {}
  constructors.forEach(element => {
    const proto = element.prototype
    for (let prop in proto) {
      newPrototype[prop] = proto[prop]
    }
  })
  dest.prototype = newPrototype
}
