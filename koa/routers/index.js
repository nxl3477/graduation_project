const Router = require('koa-router');
const controllers = require('../controllers')
const admin = require('../admin')
// 自定义接口
const custom = require('../custom')
const { graphqlKoa, graphiqlKoa } = require('graphql-server-koa')

const router = new Router({
  prefix: '/api'
});

// 小程序登api
router

  .get('/wx/login', controllers.login.get)
  // 爬虫测试
  .get('/wx/spider', controllers.spider.get)
  // 获取瀑布流数据
  .get('/wx/falls', controllers.falls.get)
  // 获取详情数据
  .get('/wx/details', controllers.details.get)
  // 获取评论接口
  .get('/wx/cmt', controllers.comment.get)
  // 获取评论接口
  .get('/wx/types', controllers.types.get)
  // 日志接口
  .get('/wx/blogs', controllers.blogs.get)
  .post('/wx/login', controllers.login.post)
  



// 后台系统
router
  // 鉴权
  .post('/admin/auth', admin.auth.post)

  // 登录
  .get('/admin/login', admin.login.get)
  .post('/admin/register', admin.login.post)
  .put('/admin/forget', admin.login.put)

  // 瀑布列表
  .get('/admin/falls', admin.falls.get)
  .post('/admin/falls', admin.falls.post)
  .put('/admin/falls', admin.falls.put)
  .delete('/admin/falls', admin.falls.del)

  // 分类类型
  .get('/admin/types', admin.types.get)
  .post('/admin/types', admin.types.post)
  .put('/admin/types', admin.types.put)
  .delete('/admin/types', admin.types.del)

  // 用户列表
  .get('/admin/users', admin.users.get)
  .post('/admin/users', admin.users.post)
  .put('/admin/users', admin.users.put)
  .delete('/admin/users', admin.users.del)

  // 日志列表
  .get('/admin/blogs', admin.blogs.get)
  .post('/admin/blogs', admin.blogs.post)
  .put('/admin/blogs', admin.blogs.put)
  .delete('/admin/blogs', admin.blogs.del)

  // 视频列表
  .get('/admin/video', admin.video.get)
  .put('/admin/video', admin.video.put)
  .delete('/admin/video', admin.video.del)

  // 文章列表
  .get('/admin/article', admin.article.get)
  .put('/admin/article', admin.article.put)
  .delete('/admin/article', admin.article.del)



// 测试 token 接口
router.post('/test', async (ctx, next) => {
  // console.log(ctx.request.body)
  console.log(ctx.state.user)
  ctx.body = '哈哈哈'
})



module.exports = router







// const models = require('../graphql/models/models')
// router
// .post('/graphql', async (ctx, next) => {
//   await graphqlKoa({schema: models, pretty: true })(ctx, next) // 使用schema
// })
// .get('/graphql', async (ctx, next) => {
//   await graphqlKoa({schema: models, pretty: true})(ctx, next) // 使用schema
// })
// .get('/graphiql', async (ctx, next) => {
//   await graphiqlKoa({endpointURL: '/graphiql'})(ctx, next)
// })