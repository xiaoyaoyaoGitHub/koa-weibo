const router = require('koa-router')();
const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify);
const { SECRET } = require('./../conf/constance');
router.prefix('/users')

router.get('/', function (ctx, next) {
    ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response'
})

//模拟登陆
router.post('/login', async (ctx, next) => {
    let { username, password } = ctx.request.body;
    let userInfo;

    if (username == 'zhangsan' && password == 'abc') {
        userInfo = {
            userId: 1,
            userName: 'zhangsan',
            nickName: '张三',
            gender: 1
        };

    };

    // 加密 userInfo
    let token;
    if (userInfo) {
        token = jwt.sign(userInfo, SECRET, {
            expiresIn: '1h'
        })
    }
    if (!userInfo) {
        ctx.body = {
            error: -1,
            msg: '登陆失败'
        };
        return
    };
    ctx.body = {
        error: 0,
        data: token
    }
})

router.post('/query', async (ctx, next) => {
    let { username, age } = ctx.request.body;
    ctx.body = {
        username,
        age
    }
});

/** 
 * 获取用户信息
*/
router.get('/getUserInfo', async (ctx, next) => {
    // 解析token 确认用户身份
    let token = ctx.header.authorization;
    try {
        const payload = await verify(token.split(' ')[1], SECRET);
        console.log(payload);
        ctx.body = {
            erron: '0',
            userInfo: payload
        }
    } catch (err) {
        ctx.body = {
            erron: -1,
            userInfo: 'verify token failed  '
        }
    }

})

module.exports = router
