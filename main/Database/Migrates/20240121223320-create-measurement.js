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
      tiempo: {
        type: Sequelize.INTEGER
      },
      temperatura: {
        type: Sequelize.FLOAT
      },
      presion: {
        type: Sequelize.FLOAT
      },
      humedad: {
        type: Sequelize.FLOAT
      },
      velocidad: {
        type: Sequelize.FLOAT
      },
      longitud: {
        type: Sequelize.FLOAT
      },
      latitud: {
        type: Sequelize.FLOAT
      },
      altitud: {
        type: Sequelize.FLOAT
      },
      accelX: {
        type: Sequelize.FLOAT
      },
      accelY: {
        type: Sequelize.FLOAT
      },
      accelZ: {
        type: Sequelize.FLOAT
      },
      yaw: {
        type: Sequelize.FLOAT
      },
      pitch: {
        type: Sequelize.FLOAT
      },
      roll: {
        type: Sequelize.FLOAT
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('measurements');
  }
};