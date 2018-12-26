/**
 * Internal exception of the application. Initialized with internal code.
 * @author vmlacic
 */
'use strict';

class InternalError extends Error {
  constructor (status, customMessage) {
    if (status.code < 500) {
      throw Error('Status provided is not an error.');
    }

    if (customMessage === undefined) {
      super(status.message);

    } else {
      super(customMessage);

    }
    this.name = 'InternalError';
    this.code = status.code;
  }
}

module.exports = InternalError;