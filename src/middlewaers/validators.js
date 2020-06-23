/** 
 * @description json schema 验证中间件
*/

const { ErrorModel } = require('./../model/ResModel');
const { jsonSchemaFileInfo } = require('./../model/ErrorInfo');

/**
 *生成json schema 验证的中间件
 *
 * @param {function} callback 
 * @returns
 */
function genValidator(validatorFn) {
    async function validator(ctx, next) {
        const data = ctx.request.body;
        const error = validatorFn(data);
        if (error) { //验证失败
            ctx.body = new ErrorModel(jsonSchemaFileInfo);
            return
        }
        // 验证成功 继续注册
        await next();
    }
    return validator
}


module.exports = {
    genValidator
}