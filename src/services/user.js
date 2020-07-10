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
    if (result == null) { //如果不存在
        return result
    }
    // 格式化
    const formatRes = formatUser(result.dataValues);
    return formatRes
}

/**
 *创建用户
 *
 * @param {string, string, number, string} {userName, password, gender, nickName}
 */
async function createUser({ userName, password, gender = 3, nickName }) {
    const result = await User.create({
        userName,
        password,
        nickName: nickName ? nickName : userName,
        gender
    });
    return result.dataValues
}

/**
 *删除用户
 *
 * @param {string} userName 用户名 
 */
async function deleteUser(userName) {
    const result = await User.destory({
        where: {
            userName
        }
    });
    return result > 0 //result 返回删除的行数
}

/**
 *更新用户信息
 *
 * @param {Object} 要修改的内容 { password: newPassword, nickName: newNickName, city: newCity, genter: newGender }
 * @param {Object} 查询条件 { userName, password }
 */
async function updateUser({ password: newPassword, nickName: newNickName, city: newCity, picture, genter: newGender }, { userName, password }) {
    let whereData = { userName }; //查询条件
    let updateData = {}; //更新的数据
    if (newPassword) {
        updateData.password = newPassword
    }
    if (newNickName) {
        updateData.nickName = newNickName
    }
    if (newCity) {
        updateData.city = newCity
    }
    if (newGender) {
        updateData.gender = newGender
    }
    if(picture){
        updateData.picture = picture
    }
    const result = await User.update(updateData, {
        where: whereData
    });
    return result[0] > 0 //修改的行数
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
}