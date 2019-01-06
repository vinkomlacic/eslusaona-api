/**
 * Error handling middleware.
 * @author vmlacic
 */
'use strict';

const statusCodes = require('../utils/statusCodes');
const InternalError = require('../utils/InternalError');

// Catch all handler
const handle = (err, req, res, next) => {
  console.error(err.stack);

  let status;
  if (err instanceof InternalError) {
    status = err.code;

  } else {
    status = statusCodes.error.code;

  }

  res
    .status(500)
    .send({
      type: 'SingleItemResponse',
      status,
      error: {
        ...err,
        message: err.message,
      }
    });
};

module.exports = handle;