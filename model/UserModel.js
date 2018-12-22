/**
 * User model
 * @author vmlacic
 */
'use strict'

const sql = require('./db');

// Task object constructor
const User = function(user) {
  this.name = user.name;
  this.surname = user.surname;
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
  this.createdAt = new Date();
}

User.createUser = function (newUser, result) {
  sql.query('INSERT INTO users SET ? ', newUser, function(err, res) {

    if (err) {
      console.log('error: ', err);
      result(err, null);

    } else {
      console.log(res.insertId);
      result(null, res.insertId);

    }

  });
}

User.getAllUsers = function (result) {
  sql.query('SELECT * FROM users', function(err, res) {

    if (err) {
      console.log('error: ', err);
      result(null, err);

    } else {
      console.log('tasks: ', res);
      result(null, res);

    }

  });

  User.getUserById = function (userId, result) {
    sql.query('SELECT * FROM users WHERE ID = ?', userId, function(err, res) {

      if (err) {
        console.log('error: ', err);
        result(err, null);

      } else {
        console.log('user: ', res);
        result(null, res);

      }

    });
  }
}

module.exports = User;