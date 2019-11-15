// 特殊字符
const special = [ '\'' , '\"', '?', '\\', '^'].join(',')
exports.signRules = [
  { 
    title: '账号',
    key: 'user_name', 
    size: [4, 16],
    match: { 
      regex: new RegExp(/^[a-zA-Z0-9_-]{4,16}$/), 
      msg: `账号不得包含特殊字符, 如: (${special})` 
    }
  },
  { 
    title: '密码',
    key: 'user_pwd',
    size: [6, 16],
    match: {
      regex: new RegExp(/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{6,16}$/),
      msg: '密码应为6~16位数字,英文,符号至少两种组合的字符'
    }
  },
  { 
    title: '手机号',
    key: 'tell', 
    match: {
      regex: new RegExp(/^1[34578]\d{9}$/),
      msg: '请输入正确的手机号码'
    }
  },
  { 
    title: '邮箱',
    key: 'email',
    match: {
      regex: new RegExp(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/),
      msg: '请输入正确的邮箱'
    }
  },
  { 
    title: '昵称',
    key: 'nick_name',
    size: [2, 8],
    match: {
      regex: new RegExp(/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/),
      msg: `昵称不得包含特殊字符, 如: (${special})`
    }
  }
]