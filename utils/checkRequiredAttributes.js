/**
 * Checks required attributes inside a request body.
 * @author vmlacic
 */
'use strict';

const InternalError = require('../utils/InternalError');
const statusCodes = require('../utils/statusCodes');

/**
 * Checks required attributes.
 * @param {Array<string>} requiredAttributes List of required object attributes.
 * @throws TypeError in case of invalid arguments.
 * @returns Error if validation fails or true if OK.
 */
const checkRequiredAttributes = (requiredAttributes, req) => {
  if (!Array.isArray(requiredAttributes)) {
    throw TypeError('Invalid argument type: requiredArguments');
  }

  if (!req.body) {
    return new InternalError(statusCodes.noBodyInRequest);
  }

  let returnValue = true;
  requiredAttributes.forEach(attribute => {
    if (typeof attribute !== 'string') {
      throw TypeError('Invalid argument type. All members of requiredAttributes array must be strings!');
    }

    if (!req.body[attribute]) {
      returnValue = new InternalError(
        statusCodes.requiredAttributeNotFound,
        `Required attribute: ${attribute} does not exist in request body.`,
      );
    }
  });

  return returnValue; 
}

module.exports = checkRequiredAttributes;