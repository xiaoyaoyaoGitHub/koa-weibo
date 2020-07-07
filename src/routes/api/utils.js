/** 
 * @description util api 路由
 * @Date 2020-07-07
*/


const router = require('koa-router')();
const { loginCheck } = require('./../../middlewaers/loginChecks')
const koaFrom = require('formidable-upload-koa');

router.prefix('/api/utils')

router.post('/upload', loginCheck, koaFrom(), async (ctx, next) => {
    let file = ctx.req.files['file'];
    if(!file) {
        return
    }
    const { name, size, type, path } = file;
    // ctx.body = {
    //     errno: 0,
    //     data: {
    //         url: ''
    //     }
    // }

})

module.exports = router