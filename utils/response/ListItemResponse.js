/**
 * Response type: 'ListItemResponse'
 * @author vmlacic
 */
'use strict';

class ListItemResponse {
  /**
   * Creates list item response
   * @param {*} status Internal status code.
   * @param {*} data An array of data.
   */
  constructor (status, data) {
    this.type = 'ListItemResponse';
    this.status = status;
    this.data = data;
  }
}