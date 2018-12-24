/**
 * Logs the request time and content to console.
 * Middleware implementation.
 * @author vmlacic
 */
'use strict'

const consoleLogger = function(req, res, next) {
  const time = new Date();

  console.error(
    `\n\nIncoming request (${time}):
    ----------------------------------------------------------------------------
    IP: ${req.ip}
    Protocol: ${req.protocol}
    Method: ${req.method}
    Route: ${req.route}
    Params: ${JSON.stringify(req.params)}
    Body: ${JSON.stringify(req.body)}`
  );

  next();
};

module.exports.consoleLogger = consoleLogger;