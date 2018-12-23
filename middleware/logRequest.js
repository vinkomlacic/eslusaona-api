/**
 * Logs the request time and content to console.
 * Middleware implementation.
 * @author vmlacic
 */
'use strict'

const logRequest = function(req, res, next) {
  const time = new Date().now();

  console.error(
    `Incoming request (${time}):
    ----------------------------------------------------------------------------
    ${req}`
  );

  next();
};

module.exports.logRequest = logRequest;