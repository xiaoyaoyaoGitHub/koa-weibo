
/** 
 * @description jest json
*/

const server = require('./server');

test('json接口返回数据', async () => {
    const res = await server.get('/json');
    // const res = await server.post('/json').send({})
    expect(res.body).toEqual({
        title: 'koa2 json'
    })
})