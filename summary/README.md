> 本项目是我对 数据持久化及云服务器部署 的试验项目

#### 局域网内数据库
连接并运行[docker](https://github.com/Hanqing1996/docker-notes/blob/master/README.md) 下的 mysql1 容器
> 以下命令在 cmd 中执行
```
docker start mysql1
docker exec -it mysql1 bash
mysql -u root -p
```

#### 局域网内数据库服务器
1. 使用 koa 启动服务
2. 使用 node 的 MySQL 模块实现数据库连接
3. 使用 sequelize 实现 ORM 操作
4. 使用 koa-router 实现访问不同接口以操作数据
```
node index.js
```

#### 云服务器
* 使用 阿里云
* [阿里云添加,绑定秘钥](https://help.aliyun.com/document_detail/51793.html?spm=a2c4g.11186623.6.878.71414737qnnxS8)
* xshell 登录
> 不需要输入密码

### 部署面向公网的服务
1. 更新依赖
```
sudo apt-get install update
```
* 如果报错:Unable to locate package,需要更新依赖源
```
sudo apt-get update
```
2. 安装 mysql-server
```
sudo apt-get install mysql-server
```
3. 安装 node
```
[ubuntu 下安装 node](https://www.cnblogs.com/feiquan/p/11223487.html)
```
4. 修改 mysql 连接权限
```
mysql -uroot -p

use mysql;

// 给root授予在任意主机（%）访问任意数据库的所有权限。
update user set host='%' where user='root' and host='localhost';
```
5. 开启 mysql 进程
```
service mysql start
```
6. 上传 koa-server 代码
```
// 将 koa-server 下文件(删去 package.lock.json 及 node_modules)打包成 koa-server.tar
tar cvf ./koa-server.tar ./koa-server

// 在 koa-server.tar 所在目录下执行
sftp -i ~/.ssh/my_ssh.pem root@39.103.129.212

// 解压文件
tar xvf koa-server.tar
```
7. 修改 sequelize.js
```
const client = new Sequelize(...,{
    host:'127.0.0.1',
    ...
});
```
8. 如果端口冲突，还需要修改 index.js 的端口号
```
koa.listen(8080)
```
9. 开启 web 服务
```
// koa-server 目录下
node index.js 或 node .
```
10. 在外网访问共有ip+8080/posts,正确的结果是看到 json 数据
> 8080 端口需在阿里云服务器的安全组中设置: 8080/8080
11. 注意，node . 唤起的进程会随着终端的关闭而终止，导致上述接口不再能访问。[解决方法](https://blog.csdn.net/shakdy/article/details/82938679)

#### pm2(process manage to)-云服务器没加
> 进程服务器，类似的还有 forever,nohop
* 作用
1. 接管日志管理
2. 帮助管理进程（后台运行、重新唤起进程）
* 开启 node 服务并后台运行该进程
```
npx pm2 start index.js
```
* 结束进程
```
npx pm2 stop index.js
```
* 查看日志
```
npx pm2 logs
```
* 查看 CPU 使用情况
```
npx pm2 monit
```
