const { DBconF } = require('../config')

const DB = require('knex')({
  client: 'mysql',
  connection: {
    ...DBconF
  },
  // debug: true, // 开气debug 模式
  pool: { min: 0, max:  10}
});

module.exports = DB

// DB.select().from('users').then(res => {
//   console.log(res)
// })