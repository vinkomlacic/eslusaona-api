/**
 * Internal status code of the application. They always return 200 http code.
 * @todo Configure other locales.
 * @author vmlacic
 */
'use strict';

const statusCodesEn = {
  OK: {
    code: 0,
    message: "Everything OK.",
  },
  loginSuccess: {
    code: 1,
    message: "Login success!",
  },
  registrationSuccess: {
    code: 2,
    message: "Registration success!",
  },
  validToken: {
    code: 3,
    message: "Token is valid!",
  },

  /********************************************************************************************** */
  error: {
    code: 500,
    message: "General error.",
  },
  nonExistingUser: {
    code: 501,
    message: "User does not exist.",
  },
  invalidPassword: {
    code: 502,
    message: "Invalid username/password combination.",
  },
  noBodyInRequest: {
    code: 503,
    message: "Invalid request: no body!",
  },
  requiredAttributeNotFound: {
    code: 504,
    message: "Required attribute does not exist in request body.",
  },
  passwordTooShort: {
    code: 505,
    message: "Password is too short.",
  },
  userNameExists: {
    code: 506,
    message: "Username already taken.",
  },
  emailExists: {
    code: 507,
    message: "Email already taken.",
  },
  userNotLoggedIn: {
    code: 508,
    message: "User is not logged in.",
  },
}

module.exports = statusCodesEn;