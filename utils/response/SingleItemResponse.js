/**
 * Response type: 'SingleItemResponse'
 * @author vmlacic
 */
'use strict';

class SingleItemResponse {
  constructor (status, data) {
    this.type = 'SingleItemResponse';
    this.status = status;
    this.data = data;
  }
}

module.exports = SingleItemResponse;