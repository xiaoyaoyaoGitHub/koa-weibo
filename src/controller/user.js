/** 
 * @description user conthroller
*/

const { getUserInfo } = require('./../services/user');
const { SuccessModel, ErrorModel } = require('./../model/ResModel');
const { registerUserNameNotExistInfo } = require('./../model/ErrorInfo');
/**
 *用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName);
    // 统一返回格式
    if (userInfo) { //存在
        return new SuccessModel(usesrInfo)
    } else { //不存在
        return new ErrorModel(registerUserNameNotExistInfo)
    }

}

module.exports = {
    isExist
}