/**
 * Creates fake users data.
 * @author vmlacic
 */
'use strict';

const createFakeUsers = require('../fakers/userFaker');
const fakeUsers = createFakeUsers(20);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', fakeUsers, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
