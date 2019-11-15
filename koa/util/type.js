/**
 * 判断是否是空数组 
 * 是 true, 否 false
 * @param {Array} 数组
 */
exports.isArrEmpty = (arr = []) => !Array.isArray(arr) || !arr.length