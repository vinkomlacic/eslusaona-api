/**
 * Populate users table. The roles table must be populated beforehand.
 * @author vmlacic
 */
'use strict';
const faker = require('faker');
const crypto = require('crypto');
const passwordUtils = require('../utils/password');

const populateUsers = async (database, count) => {
  const User = database.User;
  const Role = database.Role;
  const userRole = Role.findOne({
    where: {
      name: 'USER',
    },
  });
  const adminRole = Role.findOne({
    where: {
      name: 'ADMINISTRATOR',
    },
  });

  for (let i = 0; i < count; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const userName = faker.internet.userName(firstName, lastName);
    const email = faker.internet.email(firstName, lastName);
    const password = faker.internet.password(8, true);
    const passwordStoreValue = passwordUtils.hashPasswordWithSalt(password);

    await User.create({
      Role: faker.random.arrayElement([userRole, adminRole]),
      uuid: crypto.randomBytes(16).toString('hex'),
      firstName,
      lastName,
      userName,
      email,
      password: passwordStoreValue,
    })
    .catch(error => {
      console.error(`Error occurred in populateUser:\n${error.message}`);
    });
  }
};

module.exports = populateUsers;