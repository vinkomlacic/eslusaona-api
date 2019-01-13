/**
 * Internal status code of the application. They always return 200 http code.
 * @todo Configure other locales.
 * @author vmlacic
 */
'use strict';
const StatusCode = require('./StatusCode');

const statusCodesEn = {
  // Ok status codes
  OK: new StatusCode(0, 'Everything OK.'),
  loginSuccess: new StatusCode(1, 'Login success!'),
  registrationSuccess: new StatusCode(2, 'Registration success!'),
  validToken: new StatusCode(3, 'Token is valid!'),

  // Error status codes
  error: new StatusCode(500, 'General error.'),
  nonExistingUser: new StatusCode(501, 'User does not exist.'),
  invalidPassword: new StatusCode(502, 'Invalid username/password combination.'),
  noBodyInRequest: new StatusCode(503, 'Invalid request: no body!'),
  requiredAttributeNotFound: new StatusCode(504, 'Required attribute does not exist in request body.'),
  passwordTooShort: new StatusCode(505, 'Password is too short.'),
  userNameExists: new StatusCode(506, 'Username already taken.'),
  emailExists: new StatusCode(507, 'Email already taken.'),
  userNotLoggedIn: new StatusCode(508, 'User is not logged in.'),
  notSufficientRights: new StatusCode(509, 'User does not have sufficient rights for this endpoint.'),
  noToken: new StatusCode(510, 'No token provided.'),
  nonExistingSong: new StatusCode(511, 'Song does not exist.'),
  validationError: new StatusCode(512, 'Validation failed.'),
};

module.exports = statusCodesEn;