/**
 * Validates JWT on incoming request. This must be included in all routes that
 * require user to be authenticated beforehand.
 * @todo Needs rewrite so it's easier to validate some routes for user and some
 * for admin. The way it is now there is a need for separating routes into separate
 * routers which is impractical.
 * @author vmlacic
 */
'use strict';

const jwt = require('jsonwebtoken');
const statusCodes = require('../utils/statusCodes');
const InternalError = require('../utils/InternalError');

/**
 * Returns a function that verifies JWT and validates it by role name.
 * @param {Array<string>} allowedRoleNames
 */
const validateForRoles = (allowedRoleNames) => (req, res, next) => {
  const Role = req.app.get('models').Role;
  // Check if role names provided in argument exist in db.
  const checks = [];
  allowedRoleNames.forEach(roleName => {
    checks.push(checkRoleExistInDB(roleName, Role));
  });

  Promise.all(checks)
  .then(roleIds => {
    let token = req.get('authorization');
    if (token === null) {
      const error = new InternalError(statusCodes.noToken);
      next(error);
      return;
    }
    token = token.split(' ')[1];

    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      if (!roleIds.includes(decodedToken.RoleId)) {
        const error = new InternalError(statusCodes.notSufficientRights);
        next(error);
        return;
      }

    } catch (err) {
      if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
        const error = new InternalError(statusCodes.userNotLoggedIn);
        next(error);
      }

    }

    next();
  })
  .catch(err => {
    next(err);
  });
};

/**
 * Helper function - not exported outside of this module.
 * @param {String} roleName 
 * @param {*} Role Model reference
 * @async
 * @returns Id of the role.
 * @throws Error if role with the roleName provided is not found in DB.
 */
const checkRoleExistInDB = async (roleName, Role) => {
  const role = await Role.findOne({
    where: {
      name: roleName,
    },
  });

  if (role === null) {
    throw new Error(`Role with name: ${roleName} does not exist in database.`);
  }

  return role.get('id');
};

module.exports.validateForRoles = validateForRoles;
