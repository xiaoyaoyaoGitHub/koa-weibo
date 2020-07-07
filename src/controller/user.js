/** 
 * @description user conthroller
*/

const { getUserInfo, createUser, deleteUser, updateUser } = require('./../services/user');
const { SuccessModel, ErrorModel } = require('./../model/ResModel');
const { registerUserNameNotExistInfo, changeInfoFailInfo, registerUserNameExistInfo, registerFailInfo, loginFailInfo, deleteUserFailInfo } = require('./../model/ErrorInfo');
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
 *修改用户信息
 *
 * @param {*} ctx
 * @param {string, string, string} { nickName, city, genter }  昵称, 城市, 性别
 * @returns
 */
async function changeInfo(ctx, { nickName, city, gender }) {
    let { userName } = ctx.session && ctx.session.userInfo;
    if (!nickName) {
        nickName = userName
    };
    // 调用service  
    let res = await updateUser({ nickName, city, gender }, { userName })
    if (res) { //更新成功
        Object.assign(ctx.session.userInfo, {
            nickName, city, gender
        });
        return new SuccessModel();
    } else {
        return new ErrorModel(changeInfoFailInfo)
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
    deleteCurUser
}