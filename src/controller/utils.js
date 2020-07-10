/** 
 * @description utils controller
*/

const path = require('path');

const fse = require('fs-extra');
const { SuccessModel, ErrorModel } = require('./../model/ResModel');
const { uploadFileSizeFailInfo } = require('./../model/ErrorInfo.js')


// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')

// 文件最大体积
const MAX_SIZE = 1024 * 1024 * 1024

// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if (!exist) {
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})

/**
 *
 *保存文件
 * @param {string, number, string, string} {name, size, type, filePath} {名称, 大小, 类型, 路径}
 */
async function saveFile({ name, size, type, filePath }) {
    if (size > MAX_SIZE) { //大小超过最大限制
        await fse.remove(filePath)
        return new ErrorModel(uploadFileSizeFailInfo)
    }

    // 移动文件
    const fileName = `${Date.now()}.${name}`; //防止重名
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName);
    await fse.move(filePath, distFilePath);

    return new SuccessModel({
        url: `/${fileName}`
    })

}


module.exports = {
    saveFile
}