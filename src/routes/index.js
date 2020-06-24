/** 
 * @description 首页路由
*/

const router = require('koa-router')();
const { loginRedirect } = require('./../middlewaers/loginChecks');

router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {
        title: 'hello koa'
    })
})

module.exports = router;