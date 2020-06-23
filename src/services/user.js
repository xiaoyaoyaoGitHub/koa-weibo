/** 
 * @description user service
*/

const { User } = require('./../db/model/index');
const { formatUser } = require('./__format.js');
/**
 *获取用户信息
 *
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
    // 查询条件
    const whereOpt = {
        userName,
    }
    if (password) {
        Object.assign(whereOpt, { password })
    };
    // 查询
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt,
    });
    if(result == null) { //如果不存在
        return result
    }
    // console.log(result)
    // 格式化
    const formatRes = formatUser(result.dataValues);
    return formatRes
}


module.exports = {
    getUserInfo
}