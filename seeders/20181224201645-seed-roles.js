'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const currentTime = new Date();

    return queryInterface.bulkInsert('Roles', [
      { name: 'USER', createdAt: currentTime, updatedAt: currentTime },
      { name: 'ADMINISTRATOR', createdAt: currentTime, updatedAt: currentTime },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
