/** 
 * @description 用户数据模型
*/

const seq = require('./../seq');
const { STRING, INTEGER, TEXT, DECIMAL } = require('./../types');

// users

const User = seq.define('user', {
    userName: {
        type: STRING,
        allowNull: false, //是否可为null
        unique: true, //是否唯一
        comment: '用户名 唯一'
    },
    password: {
        type: STRING,
        allowNull: false,
        comment: '密码'
    },
    nickName: {
        type: STRING,
        allowNull: false,
        comment: '昵称'
    },
    gender: {
        type: DECIMAL,
        allowNull: false,
        defaultValue: 3,
        comment: '性别(1 male, 2 female, 3 secret)'
    },
    picture: {
        type: STRING,
        comment: 'avatar address'
    },
    city:{
        type: STRING,
        comment: '城市'
    }
});

module.exports = User