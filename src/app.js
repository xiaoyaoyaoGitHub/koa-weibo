const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwtKoa = require('koa-jwt');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');

const { REDIS_CONF } = require('./conf/db');
const { SECRET } = require('./conf/constance');

// const index = require('./routes/index')
// const users = require('./routes/users')
const userViewRouter = require('./routes/view/user');
const UserApiRouter = require('./routes/api/user');
const error = require('./routes/view/error')

// error handler
let onErrorConf = {};
onErrorConf = {
    redirect: '/error'
}
onerror(app, onErrorConf)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
// app.use(jwtKoa({ //jwt验证
//     secret: SECRET
// }).unless({
//     path: [/^\/users\/login/] //自定义哪些目录忽略jwt验证
// }))
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

/*
  session 配置
*/
app.keys = ['Wangly_1115%$$#']; //加密
app.use(session({
    key: 'weibo.sid', // cookie name 默认koa.sid
    prefix: 'weibo:sess:', //redis key的前缀,默认koa:sess:
    cookie: {
        path: '/',
        httpOnly: true, //只服务端修改 客户端不可修改
        maxAge: 24 * 60 * 60 * 1000, //过期时间 ms
    },
    ttl: 24 * 60 * 60 * 1000, //过期时间 ms 如果不写,默认使用cookie过期时间
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
// app.use(index.routes(), index.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods());
app.use(UserApiRouter.routes(), UserApiRouter.allowedMethods());
app.use(error.routes(), error.allowedMethods()) // error和404一定要最后注册

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app
