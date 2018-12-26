/**
 * Error handling middleware.
 * @author vmlacic
 */
'use strict';

// Catch all handler
const handle = (err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .send({
      type: 'SingleItemResponse',
      error: {
        ...err,
        message: err.message,
      }
    });
};

module.exports = handle;