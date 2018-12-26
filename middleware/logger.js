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

/**
 * Creates a logger. You need to specify output medium.
 * Default is console.
 */
class Logger {
  constructor(output) {
    if (output === undefined) {
      this.log = consoleLogger;
      return;
    }

    if (!output instanceof str) {
      throw Error('Invalid argument type.');
    }

    if (output.toLowerCase() === 'console') {
      this.log = consoleLogger;
    } else {
      throw Error(`${output} is not yet implemented.`);
    }
  }
}

module.exports = Logger;