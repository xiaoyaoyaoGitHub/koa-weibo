/** 
 * @description user conthroller
*/

const { getUserInfo, createUser, deleteUser, updateUser } = require('./../services/user');
const { SuccessModel, ErrorModel } = require('./../model/ResModel');
const { registerUserNameNotExistInfo, changePasswordFailInfo, changeInfoFailInfo, registerUserNameExistInfo, registerFailInfo, loginFailInfo, deleteUserFailInfo } = require('./../model/ErrorInfo');
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
 *修改用户基本信息
 *
 * @param {string, string, string} {nickName}=,city, picture } 昵称 城市 头像
 */
async function changeUserInfo(ctx, { nickName, city, picture }) {
    let { userName } = ctx.session.userInfo; //从缓存中获取用户名
    if (!nickName) {
        nickName = userName
    }

    // 调取service 更新用户信息
    const result = await updateUser({ nickName, city, picture }, { userName });
    if (result) { //更新成功
        Object.assign(ctx.session.userInfo, { nickName, city, picture });
        return new SuccessModel()
    }
    return new ErrorModel(changeInfoFailInfo)
}

/**
 *修改密码
 *
 * @param {string} userName 
 * @param {string} password
 * @param {string} newPassword
 */
async function changePassword({ password, newPassword, userName }) {
    // 调用service
    let result = await updateUser({ password: doCrypto(newPassword) }, { userName, password: doCrypto(password) });
    
    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel(changePasswordFailInfo)
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
    if (ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()
}

/**
 *删除当前用户
 *
 * @param {*} userName
 */
async function deleteCurUser(userName) {
    // service
    let res = await deleteUser(userName);
    if (res) { //删除成功
        return new SuccessModel()
    }
    // 删除失败
    return new ErrorModel(deleteUserFailInfo);
}

module.exports = {
    isExist,
    register,
    login,
    deleteCurUser,
    changeUserInfo,
    changePassword
}