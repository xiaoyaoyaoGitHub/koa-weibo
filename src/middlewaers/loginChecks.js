/** 
 * @description 登录验证的中间件
*/

const { ErrorModel } = require('./../model/ResModel');
const { loginCheckFailInfo } = require('./../model/ErrorInfo');

/**
 *api 登录验证
 *
 * @param {Object} ctx
 * @param {function} next
 */
async function loginCheck(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        // 已登录
        await next();
        return
    }
    // 未登录
    ctx.body = new ErrorModel(loginCheckFailInfo);
}

/**
 *view 登录验证
 *
 * @param {*} ctx
 * @param {*} next
 */
async function loginRedirect(ctx, next) {
    if(ctx.session && ctx.session.userInfo){ //已的能力
        await next();
        return
    };
    const curUrl = ctx.url; //获取当前url用与登录后重定向
    ctx.redirect(`/login?url=${encodeURIComponent(curUrl)}`)
}

module.exports = {
    loginCheck,
    loginRedirect
}