/**
 * Database connection wrapper
 * @author vmlacic
 */
'use strict'

const mysql = require('mysql');

// Local mysql db connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'eslusaona',
});

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;