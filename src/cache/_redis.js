/**
 * @description 连接redis方法 get set
 */
const redis = require('redis');
const { REDIS_CONF } = require('../conf/db');


// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
// 错误监听
redisClient.on('error', err => {
    console.error(`redis error`, err);
});


/**
 *redis set
 *
 * @param {string} key 键名
 * @param {string} value 键值
 * @param {number} [timeout=60 * 60] 过期时间 单位s
 */
function set(key, value, timeout = 60 * 60) {
    if (typeof value == 'object') {
        value = JSON.stringify(value);
    };
    redisClient.set(key, value);
    redisClient.expire(key, timeout);
}


/**
 *redis get
 *
 * @param {string} key 键值
 */
function get(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err);
                return
            }
            if (val == null) {
                resolve(null);
                return
            }
            try {
                resolve(JSON.parse(val)); //如果转化对象失败
            } catch (err) {
                resolve(val); //则直接返回val值
            }
        })
    })
}

module.exports = {
    set,
    get
}