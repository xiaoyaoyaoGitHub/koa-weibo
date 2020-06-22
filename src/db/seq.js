/** 
 * @description sequelize实例
*/

const { MYSQL_CONF } = require('./../conf/db');
const Sequelize = require('sequelize');
const { isProd, isTest } = require('./../utils/env');

const seq = new Sequelize(MYSQL_CONF.database, MYSQL_CONF.user, MYSQL_CONF.password, {
    host: MYSQL_CONF.host,
    dialect: 'mysql',
    pool: isProd && {
        max: 5,
        min: 0,
        idle: 100000, //如果连接10s内没有被使用,则释放
    },
    logging: isTest && (() => {})
});


// 测试连接是否成功
// seq.authenticate().then(() => {
//     console.log(`connect ok`);
// }).catch(err => {
//     console.log(err);
// })

module.exports = seq;