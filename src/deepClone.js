/**
 * deepclone
 */
export default function deepClone(obj) {
  const newObj = obj instanceof Array ? [] : {}
  // 返回基本类型参数
  if (typeof obj !== 'object') { return obj }
  for (let prop in obj) {
    newObj[prop] = typeof obj[prop] === 'object' ? deepclone(obj[prop]) : obj[prop]
  }
  return newObj
}
