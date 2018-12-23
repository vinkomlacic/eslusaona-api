/**
 * Creates false data for a single user.
 * @author vmlacic
 */
'use strict';

const faker = require('faker/locale/en');

/**
 * Returns fake user object.
 */
const createUser = function(roleId) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();  
  const createdAt = faker.date.past(1);

  return {
    firstName,
    lastName,
    userName: faker.internet.userName(firstName, lastName),
    email: faker.internet.email(firstName, lastName),
    password: faker.internet.password(),
    roleId,
    createdAt,
    updatedAt: faker.date.between(createdAt, new Date()),
  };
};

module.exports = createUser;