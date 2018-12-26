/**
 * Hashes password and random salt and returns b64 format of concatenated return values.
 * Salt is 16 bytes long, the output hash value(digest: SHA512) is 64 bytes long.
 * The hash is repeated 100000 times.
 * The output hash is then converted to b64 encoding for easier managment.
 * The function concatenates b64 value of the salt and output hash (in that order)
 * and returns that string. The salt and output hash are delimited by dot character (.)
 * @author vmlacic
 */
'use strict';
const crypto = require('crypto');
const InternalError = require('../utils/InternalError');
const statusCodes = require('../utils/statusCodes');

/**
 * Creates hash of the password with random 16 byte salt.
 * @param password Password in plaintext. Must be at least 8 characters.
 * @returns Concatenated B64 values of salt and output hash delimited by dot('.') sign.
 * @throws Error if the password is too short.
 */
const hashPasswordWithSalt = password => {
  if (password.length < 6) {
    throw new InternalError(statusCodes.passwordTooShort);
  }

  const salt = crypto.randomBytes(16); // 16 byte random salt
  const outputValue = hashPassword(password, salt);

  return outputValue;
}

/**
 * Compares input password with password stored in storage.
 * @param {string} plaintext Plaintext password
 * @param {string} hashFromStorage The string returned by hashPasswordWithSalt function.
 * @returns True if the values match, false otherwise.
 */
const validatePassword = (plaintext, hashFromStorage) => {
  const saltB64 = hashFromStorage.split('.')[0]; // The first part is salt in b64 format.
  const salt = Buffer.from(saltB64, 'base64');

  const inputPasswordHash = hashPassword(plaintext, salt);

  return inputPasswordHash === hashFromStorage ? true : false;
}

/**
 * Calculates hash from plaintext password and salt (bytes).
 * Helper function. Not exported.
 */
const hashPassword = (password, salt) => {
  // Calculate password hash. The costliest line.
  const passwordHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512');
  return salt.toString('base64') + '.' + passwordHash.toString('base64');
}

module.exports.hashPasswordWithSalt = hashPasswordWithSalt;
module.exports.validatePassword = validatePassword;