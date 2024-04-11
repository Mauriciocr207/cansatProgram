"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const maxMeasurements = 20;
    function generateRandomFloat() {
      return (Math.random() * 100).toFixed(2);
    }
    const measurements = [];
    for (let i = 1; i <= maxMeasurements; i++) {
      measurements.push({
        time: generateRandomFloat(),
        temperature: generateRandomFloat(),
        pressure: generateRandomFloat(),
        velocity: generateRandomFloat(),
        height : generateRandomFloat(),
        aceleration: generateRandomFloat(),
        angle_x: generateRandomFloat(),
        angle_y: generateRandomFloat(),
        angle_z: generateRandomFloat(),
        latitude_cp: generateRandomFloat(),
        length_cp: generateRandomFloat(),
        latitude_cs: generateRandomFloat(),
        length_cs: generateRandomFloat(),
      });
    }
    await queryInterface.bulkInsert("measurements", measurements);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("measurements", null);
  },
};
