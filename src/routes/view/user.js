/** 
 * @description user view 路由
*/

const router = require('koa-router')();

/**
 *获取登录信息
 *
 * @param {*} ctx
 */
function getLoginInfo(ctx) {
    const data = {
        isLogin: false // 默认未登录
    }

    const userInfo = ctx.session.userInfo;
    if (userInfo) {
        Object.assign(data, { isLogin: true, ...userInfo })
    }
    return data
}

router.get('/login', async (ctx, next) => {
    await ctx.render('login', getLoginInfo(ctx));
})

router.get('/register', async (ctx, next) => {
    await ctx.render('register', getLoginInfo(ctx))
})

module.exports = router;