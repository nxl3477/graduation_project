


// 专门判断类型的
const isWho = () => {
  const typesStrMap = {
    'Array': '[object Array]',
    'Number': '[object Number]',
    'String': '[object String]',
    'Object': '[object Object]',
    'Null': '[object Null]',
    'Under': '[object Undefined]'
  }
  return Object.keys(typesStrMap).reduce((sum, next) => {
    sum[`is${next}`] = (obj) => Object.prototype.toString.call(obj) === typesStrMap[next]
    return sum 
  }, {})
} 




// console.log(isWho())
export default {
  ...isWho()
  
}