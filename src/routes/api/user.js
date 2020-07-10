/** 
 * @description user API 路由
*/

const router = require('koa-router')();
const { isExist, register, login, deleteCurUser, changeUserInfo, changePassword } = require('./../../controller/user');
const { userValidator } = require('./../../validator/user');
const { genValidator } = require('./../../middlewaers/validators');
const { loginCheck } = require('./../../middlewaers/loginChecks');
const { isTest } = require('./../../utils/env');

router.prefix('/api/user');

// 注册路由

router.post('/register', genValidator(userValidator), async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body;
    ctx.body = await register({ userName, password, gender });
});

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body || {};
    ctx.body = await isExist(userName);
});

// 用户登录
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body;
    ctx.body = await login(ctx, userName, password);
})


// 修改用户信息
router.patch('/changeInfo', loginCheck, genValidator(userValidator), async (ctx, next) => {
    const { nickName, city, picture } = ctx.request.body;
    // 调用conthroller
    ctx.body = await changeUserInfo(ctx, { nickName, city, picture })
})

// 修改密码
router.patch('/changePassword', loginCheck, genValidator(userValidator), async (ctx, next) => {
    let { password, newPassword } = ctx.request.body;
    let { userName } = ctx.session.userInfo;
    // console.log(`password`, password)
    // 调用controller
    ctx.body = await changePassword({ password, newPassword, userName })

})

// 删除
router.post('/delete', loginCheck, async (ctx, next) => {
    if (isTest) {
        // 测试环境下,测试账号登录之后删除自己
        const { userName } = ctx.session.userInfo || {};
        // 调用controller
        ctx.body = await deleteCurUser(userName);
    }
})


module.exports = router;