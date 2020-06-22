 use koa2_weibo_db;

 select * from users;
 insert into users ( username,`password`,nickname) values('lisi','123','李四');
 select username, nickname from users where username="zhangsan" and `password`='123';
 delete from users where id=1;

 select * from blogs order by id desc;
 insert into blogs (title, content, userid) values('你好', '我的第n条博客',1);
 update blogs set content="内容1" where id=1;
 delete from blogs where id="1";
 

 
 
 select count(id) as sum from blogs; -- 总数alter
 select * from blogs order by id desc limit 2 offset 2; -- limit 2 （每页2行） offset 2 跳过2行
 