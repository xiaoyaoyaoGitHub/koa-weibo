/** 
 * @description util api 路由
 * @Date 2020-07-07
*/


const router = require('koa-router')();
const { loginCheck } = require('./../../middlewaers/loginChecks')
const koaFrom = require('formidable-upload-koa');
const { saveFile } = require('./../../controller/utils');

router.prefix('/api/utils')

router.post('/upload', loginCheck, koaFrom(), async (ctx, next) => {
    let file = ctx.req.files['file'];
    if (!file) {
        return
    }
    const { name, size, type, path: filePath } = file;
    ctx.body = await saveFile({ name, size, type, filePath })

})

module.exports = router