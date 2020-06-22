/**
 * @description sequelize 同步数据库
 */

const seq = requier('./seq.js');

//测试连接
seq.authenticate().then(() => {
    console.log(`connect ok`)
}).catch(err => {
    console.log(`auth err`)
})

//同步执行
seq.sync().then(() => {
    console.log(`sync ok`)
}).catch(err => {
    console.log(err);
})