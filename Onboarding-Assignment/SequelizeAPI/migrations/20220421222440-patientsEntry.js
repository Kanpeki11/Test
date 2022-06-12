'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('patientsEntry', {
      id: {type: Sequelize.INTEGER,
        autoIncrement: true, allowNull: false, primaryKey: true},

    name: { type: Sequelize.STRING, allowNull: false },

    age: { type: Sequelize.INTEGER, allowNull:false },

    gender: { type: Sequelize.STRING, allowNull: false },

    wallet: { type: Sequelize.INTEGER, allowNull: true},
    },{timestamps:false})
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.dropTable('patientsEntry');
  }
};
