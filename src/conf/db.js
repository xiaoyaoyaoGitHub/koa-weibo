/** 
 * @description 存储配置
 * 放置redis配置
 * 放置sequelize配置
*/
const { isProd } = require('../utils/env');

// redis
let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
};

// sequelize
let MYSQL_CONF = {
    host:'localhost',
    user: 'root',
    password: '12345678',
    port: '3306',
    database:'koa2_weibo_db'
}

if (isProd) {
    REDIS_CONF = {
        //线上配置 
        port: 6379,
        host: '127.0.0.1'
    };
    MYSQL_CONF = {

    }
};


module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}