const Sequelize = require('sequelize');
const sequelize = require('./connection');

const Patient = sequelize.define('patientsEntry', {
    id: {type: Sequelize.INTEGER,
        autoIncrement: true, allowNull: false, primaryKey: true},

    name: { type: Sequelize.STRING, allowNull: false },

    age: { type: Sequelize.INTEGER, allowNull:false },

    gender: { type: Sequelize.STRING, allowNull: false },

    wallet: { type: Sequelize.INTEGER, allowNull: true},
},{timestamps:false});

module.exports = Patient;