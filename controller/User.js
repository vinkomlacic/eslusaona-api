/**
 * User controller.
 * @todo Check jwt lib - possible jwt algorithm attack?
 * @todo Write refresh token mechanism.
 * @author vmlacic
 */
'use strict'
const passwordUtils = require('../utils/password');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const checkRequired = require('../utils/checkRequiredAttributes');
const statusCodes = require('../utils/statusCodes');
const InternalError = require('../utils/InternalError');

/***************************************************************************************************
 * Handles POST request to /user/register.
 */
const register = async (req, res, next) => {
  const requestValid = checkRequired(['firstName', 'lastName', 'userName', 'email', 'password'], req);
  if (requestValid instanceof Error) {
    next(requestValid);
    return;
  }

  const { firstName, lastName, userName, email, password } = req.body;
  let passwordStoreValue;
  try {
    passwordStoreValue = passwordUtils.hashPasswordWithSalt(password);

  } catch (err) {
    if (err instanceof InternalError) next(err);
    else throw err;
    return;
  }

  // Get the user and role model
  const User = req.app.get('models').User;
  const Role = req.app.get('models').Role;

  const userEmailExists = await User.findOne({
    where: {
      email,
    },
  });
  const userNameExists = await User.findOne({
    where: {
      userName,
    },
  });

  if (userEmailExists !== null) {
    const error = new InternalError(statusCodes.emailExists);
    next(error);
    return;
  }

  if (userNameExists !== null) {
    const error = new InternalError(statusCodes.userNameExists);
    next(error);
    return;
  }

  Role.findOne({
    where: {
      name: 'USER',
    },
  })
  .then(role => {
    return User.create({
      /** @todo better uuid generator, possibly creates an existing uuid */
      uuid: crypto.randomBytes(16).toString('hex'),
      firstName,
      lastName,
      userName,
      email,
      password: passwordStoreValue,
      RoleId: role.get('id'),
    });
  })
  .then(user => {
    return res.status(200).send({ type: 'SingleItemResponse', status: statusCodes.registrationSuccess });
  })
  .catch(err =>  {
    next(err);
  });
};


/***************************************************************************************************
 * Handles POST request to /user/login.
 */
const login = (req, res, next) => {
  const requestValid = checkRequired(['userName', 'password'], req);
  if (!requestValid) {
    next(requestValid);
    return;
  }

  const { userName, password } = req.body;

  // Get the user model
  const User = req.app.get('models').User;

  User.findOne({
    where: {
      userName
    },
  })
  .then(user => {
    if (user === null) {
      const error = new InternalError(statusCodes.nonExistingUser);
      next(error);
      return;
    }

    const hashPassword = user.get('password');

    if (!passwordUtils.validatePassword(password, hashPassword)) {
      const error = new InternalError(statusCodes.invalidPassword);
      next(error);
      return;
    }

    const RoleId = user.get('RoleId');
    const uuid = user.get('uuid');

    // Create a web token
    const token = jwt.sign({ uuid, RoleId }, process.env.SECRET, {
      expiresIn: 600,
    });

    return res.status(200).send({
      type: 'SingleItemResponse',
      status: statusCodes.loginSuccess,
      data: {
        token
      }
    });
  })
  .catch(err => {
    next(err);
  });
      
};


/***************************************************************************************************
 * Handles POST requests to /user/validate.
 */
const validate = (req, res, next) => {
  const requestValid = checkRequired(['token'], req);
  if (!requestValid) {
    next(requestValid);
    return;
  }

  const { token } = req.body;
  console.debug(token);

  try {
    jwt.verify(token, process.env.SECRET);

    res.status(200).send({ type: 'SingleItemResponse', status: statusCodes.validToken });

  } catch (err) {
    if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
      const error = new InternalError(statusCodes.userNotLoggedIn);
      next(error);
      return;
    }
    next(err);
  }
}

module.exports.register = register;
module.exports.login = login;
module.exports.validate = validate;