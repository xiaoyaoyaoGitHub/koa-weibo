/** 
 * @description user api test
*/

const server = require('./../server');

// 用户信息

const userName = `u_${Date.now()}`;
const password = `p_${Date.now()}`;
const testUser = { userName, password, nickName: userName, gender: 1 };

// 存储cookie 
let COOKIE = '';


// 注册
test('注册一个用户 应该成功', async () => {
    const res = await server.post('/api/user/register').send(testUser);
    expect(res.body.errno).toBe(0);
})

// 重复注册
test('重复注册 应该失败', async () => {
    const res = await server.post('/api/user/register').send(testUser);
    expect(res.body.errno).not.toBe(0);
})

// 查询用户是否存在
test('查询注册的用户名,应该存在', async () => {
    const res = await server.post('/api/user/isExist').send(testUser);
    expect(res.body.errno).toBe(0)
})

// json schema检测
test('json schema检测,非法的格式,注册应该失败', async () => {
    const res = await server.post('/api/user/register').send({
        userName: '123',
        password: 'a',
        gender: 'male'
    });
    expect(res.body.errno).not.toBe(0)
})


// 登录 应该成功
test('登录, 应该成功', async () => {
    const res = await server.post('/api/user/login').send(testUser);
    expect(res.body.errno).toBe(0);
    COOKIE = res.headers['set-cookie'].join(';'); //
})


// 修改用户信息

