/**
 * Creates false data for a single user.
 * @author vmlacic
 */
'use strict';

const faker = require('faker/locale/en');
const crypto = require('crypto');
const password = require('../utils/password');

/**
 * Returns fake user object.
 */
const createUser = function(count) {
  const users = [];

  for (let i = 0; i < count; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();  
    const createdAt = faker.date.past(1);
    const RoleId = faker.random.arrayElement([1, 2]);
    const plainTextPassword = faker.internet.password(8, true);
    const passwordStoreValue = password.hashPasswordWithSalt(plainTextPassword);

    users.push({
      uuid: crypto.randomBytes(16).toString('hex'),
      firstName,
      lastName,
      userName: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      password: passwordStoreValue,
      createdAt,
      updatedAt: faker.date.between(createdAt, new Date()),
      RoleId,
    });
  }

  return users;
};

module.exports = createUser;