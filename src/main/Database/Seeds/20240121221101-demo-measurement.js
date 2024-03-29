"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const maxMeasurements = 20;
    function generateRandomFloat() {
      return Math.random() * 100;
    }
    const measurements = [];
    for (let i = 1; i <= maxMeasurements; i++) {
      measurements.push({
        tiempo: generateRandomFloat(),
        temperatura: generateRandomFloat(),
        presion: generateRandomFloat(),
        humedad: generateRandomFloat(),
        velocidad: generateRandomFloat(),
        longitud: generateRandomFloat(),
        latitud: generateRandomFloat(),
        altitud: generateRandomFloat(),
        accelX: generateRandomFloat(),
        accelY: generateRandomFloat(),
        accelZ: generateRandomFloat(),
        yaw: generateRandomFloat(),
        pitch: generateRandomFloat(),
        roll: generateRandomFloat(),
      });
    }
    await queryInterface.bulkInsert("measurements", measurements);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("measurements", null);
  },
};
