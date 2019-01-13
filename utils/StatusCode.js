/**
 * Class representing status code. Contains code number
 * and status message.
 * @author vmlacic
 */
'use strict';

class StatusCode {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}

module.exports = StatusCode;