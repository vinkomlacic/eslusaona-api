/**
 * User controller. Used for fetching user data.
 * These routes require admin privilege.
 * @author vmlacic
 */
'use strict';

const { statusCodes, InternalError, Password } = require('../utils');
const { SingleItemResponse, ListItemResponse } =  require('../utils/response');

/*******************************************************************************
 * Handles GET requests to /user. Returns all users.
 */
const getAll = (req, res, next) => {
  const User = req.app.get('models').User;

  User.findAll()
  .then(users => {
    const response = new ListItemResponse(statusCodes.OK, { users });
    res.status(200).send(response);
  })
  .catch(err => {
    next(err);
  });
};

/*******************************************************************************
 * Handles GET requests to /user/{id}. Returns user with the specified id. 
 */
const getById = (req, res, next) => {
  const User = req.app.get('models').User;

  User.findOne({
    where: {
      id: req.params.userId,
    },
  })
  .then(user => {
    if (user === null) throw new InternalError(statusCodes.nonExistingUser);

    const response = new SingleItemResponse(statusCodes.OK, { user });
    res.status(200).send(response);
  })
  .catch(err => {
    next(err);
  });
};

/*******************************************************************************
 * Handles PATCH requests to user/{id}.
 * The administrator is allowed to change these columns in the User table:
 * first name, last name, username, email, password and RoleId.
 * Id and uuid of the user object are considered immutable and on an attempt to
 * change these properties the controller will return an error response.
 * There should not be a valid reason for changing these properties, but if you
 * are in such a need delete the user row and create another one.
 */
const updateById = (req, res, next) => {
  const User = req.app.get('models').User;
  const newUser = req.body.user;

  try {
    validateUserInstance(newUser);

  } catch (err) {
    next(err);

  }

  User.findOne({
    where: {
      id: req.params.userId,
    },
  })
  .then(user => {
    if (user === null) throw new InternalError(statusCodes.nonExistingUser);
    return updateUserInstance(user, newUser);
  })
  .then(user => {
    const response = new SingleItemResponse(statusCodes.OK, { user });
    res.status(200).send(response);
  })
  .catch(err => {
    next(err);
  });
};

/*******************************************************************************
 * Handles DELETE requests to user/{id}.
 * Deletes a row in users table with the specified id.
 * If there is no such user returns an error response.
 */
const deleteById = (req, res, next) => {
  const User = req.app.get('models').User;

  User.findOne({
    where: {
      id: req.params.userId,
    },
  })
  .then(user => {
    if (user === null) throw new InternalError(statusCodes.nonExistingUser);
    return user.destroy();
  })
  .then(() => {
    const response = new SingleItemResponse(statusCodes.OK, {
      message: `User ${req.params.userId} deleted.`,
    });
    res.status(200).send(response);
  })
  .catch(err => {
    next(err);
  });
}

/**
 * This function is not exported outside of this module.
 * Updates user instance with data from newUser argument and saves it to database.
 * @param {*} user User instance that needs updating.
 * @param {*} newUser Partial user instance provided in request. This data
 * replaces data in the old user instance. This instance should be validated
 * beforehand because this function will treat it as such.
 * @async
 */
const updateUserInstance = async (user, newUser) => {
  const properties = Object.keys(newUser);

  properties.forEach(property => user.set(property, newUser[property]));
  await user.save();
  
  return user;
};

/**
 * This function is not exported outside of this module.
 * Validates user instance.
 * @param {*} user User instance.
 */
const validateUserInstance = (user) => {
  const properties = Object.keys(user);
  const validProperties = [
    'firstName',
    'lastName',
    'userName',
    'email',
    'password',
    'RoleId',
  ];
  /* These properties are part of the internal server domain and as such cannot
  be changed nor there should be a reason to change them. */
  const validImmutableProperties = [
    'id',
    'uuid',
  ];

  properties.forEach(property => {
    if (![...validProperties, ...validImmutableProperties].includes(property)) {
      throw new Error(`${property} is not a field in the User model.`);

    } else if (validImmutableProperties.includes(property)) {
      throw new Error(`You are not allowed to change ${property} property of the User model.`);
    }
  });
};

module.exports.getAll = getAll;
module.exports.getById = getById;
module.exports.updateById = updateById;
module.exports.deleteById = deleteById;
