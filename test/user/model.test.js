/** 
 * @description user model test
*/

const  { User } = require('./../../src/db/model/index');


test('User 模型的各个属性,符合预期', () => {
    const user = User.build({ // 尽管model是个类。但是不能直接通过new创建实例，应该通过build方法, 不会提交到数据库中
        userName: 'zhangsan',
        password: 'zhangsan123',
        nickName: '张三',
        // gender: 1,
        picture:'/xxx.png',
        city: '北京'
    });
    // 验证各个属性
    expect(user.userName).toBe('zhangsan');
    expect(user.password).toBe('zhangsan123');
    expect(user.nickName).toBe('张三');
    expect(user.gender).toBe(3); //测试gender默认值
    expect(user.picture).toBe('/xxx.png');
    expect(user.city).toBe('北京');
})