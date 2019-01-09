/**
 * Module wrapper user for easier importing
 * @todo Do this programmatically.
 * @author vmlacic
 */
'use strict';

const checkRequiredAttributes = require('./checkRequiredAttributes');
const InternalError = require('./InternalError');
const password = require('./password');
const statusCodes = require('./statusCodes');

module.exports.checkRequiredAttributes = checkRequiredAttributes;
module.exports.InternalError = InternalError;
module.exports.Password = password;
module.exports.statusCodes = statusCodes;