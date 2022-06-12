const Sequelize = require('sequelize');

const sequelize = new Sequelize('node', 'root', 'Medi@321', {host: 'localhost',dialect:'mysql' });

module.exports=sequelize;
global.sequelize=sequelize;