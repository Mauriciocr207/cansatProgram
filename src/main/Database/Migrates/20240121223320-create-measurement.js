'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('measurements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      time: {type: Sequelize.INTEGER},
      temperature: {type: Sequelize.FLOAT},
      pressure: {type: Sequelize.FLOAT},
      velocity: {type: Sequelize.FLOAT},
      height : {type: Sequelize.FLOAT},
      aceleration: {type: Sequelize.FLOAT},
      angle_x: {type: Sequelize.FLOAT},
      angle_y: {type: Sequelize.FLOAT},
      angle_z: {type: Sequelize.FLOAT},
      latitude_cp: {type: Sequelize.FLOAT},
      length_cp: {type: Sequelize.FLOAT},
      latitude_cs: {type: Sequelize.FLOAT},
      length_cs: {type: Sequelize.FLOAT},
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('measurements');
  }
};