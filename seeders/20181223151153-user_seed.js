/**
 * Seeds fake data into the db.
 * @author vmlacic
 */
'use strict';
const createFakeUsers = require('../fakers/userFaker');

const fakeUsers = [];

for (let i = 0; i < 100; i++) {
  fakeUsers.push(createFakeUsers());
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', fakeUsers, {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Users', null, {});
  }
};
