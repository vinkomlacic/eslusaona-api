/**
 * Creates false data for a single user.
 * @author vmlacic
 */
'use strict';

const faker = require('faker/locale/en');
const password = require('../utils/password');

/**
 * Returns fake user object.
 */
const createUser = function() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();  
  const createdAt = faker.date.past(1);
  const roleId = faker.random.arrayElement([1, 2, 3]);
  const plainTextPassword = faker.internet.password(8, true);
  const passwordStoreValue = password.hashPasswordWithSalt(plainTextPassword);

  return {
    firstName,
    lastName,
    userName: faker.internet.userName(firstName, lastName),
    email: faker.internet.email(firstName, lastName),
    password: passwordStoreValue,
    roleId,
    createdAt,
    updatedAt: faker.date.between(createdAt, new Date()),
  };
};

module.exports = createUser;