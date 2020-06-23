/** 
 * @description user conthroller
*/

const { getUserInfo, createUser } = require('./../services/user');
const { SuccessModel, ErrorModel } = require('./../model/ResModel');
const { registerUserNameNotExistInfo, registerUserNameExistInfo, registerFailInfo, loginFailInfo } = require('./../model/ErrorInfo');
const { doCrypto } = require('./../utils/cryp');
/**
 *用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName);
    // 统一返回格式
    if (userInfo) { //存在
        return new SuccessModel(userInfo)
    } else { //不存在
        return new ErrorModel(registerUserNameNotExistInfo)
    }

}

/**
 *注册
 *
 * @param {Object} {userName, password, gender}
 */
async function register({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName);
    if (userInfo) { //用户名已存在
        return new ErrorModel(registerUserNameExistInfo)
    }
    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        });
        return new SuccessModel()
    } catch (err) {
        console.error(err.message, err.stack)
        return new ErrorModel(registerFailInfo)
    }
}


/**
 *登录
 *
 * @param { koa ctx, string, string} {ctx, userName, password}
 */
async function login(ctx, userName, password) {
    // service
    const userInfo = await getUserInfo(userName, doCrypto(password));
    if (!userInfo) { //登录失败
        return new ErrorModel(loginFailInfo)
    }
    // 登录成功
    if(ctx.session.userInfo == null){
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()
}

module.exports = {
    isExist,
    register,
    login
}