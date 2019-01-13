/**
 * Error handling middleware.
 * @author vmlacic
 */
'use strict';

const { statusCodes, InternalError } = require('../utils');
const { SingleItemResponse } = require('../utils/response');

// Catch all handler
const handle = (err, req, res, next) => {
  console.error(err.stack);

  let status;
  if (err instanceof InternalError) {
    status = err.code;

  } else {
    status = statusCodes.error.code;

  }

  const response = new SingleItemResponse(status, {
    error: {
      ...err,
      message: err.message,
    },
  });

  res.status(500).send(response);
};

module.exports = handle;