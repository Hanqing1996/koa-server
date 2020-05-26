const Sequelize = require('sequelize');
const client = new Sequelize('koa_mysql_server','root','123456',{
    host:'192.168.99.100',
    dialect: 'mysql'
});
module.exports = {
    Sequelize,
    client
}
