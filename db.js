const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'postgres1',//'postgres',
    'root',//'postgres',
    'root',
    {
        host: '185.186.3.147',// host: 'localhost',
        port: '6432',
        dialect: 'postgres'
    }
)
