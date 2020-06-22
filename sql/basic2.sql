-- show databases
 use koa2_weibo_db;
 
 select * from users;
 insert into users (username,`password`,nickname) values('wangwu','123','王五');
 
 select * from blogs;
 insert into blogs (title, content, userId) values('hello', 'my second conetnt', '4');
 select * from blogs inner join users on users.id = blogs.userId; -- 连表查询
  
 select blogs.*, users.username, users.nickname 
 from blogs inner join users on users.id=blogs.userId
 where users.username = 'zhangsan'
  
  