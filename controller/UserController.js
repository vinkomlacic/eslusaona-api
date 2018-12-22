/**
 * User controller
 * @author vmlacic
 */
'use strict'

const User = require('../model/UserModel');

exports.getAllUsers = function (req, res) {
  User.getAllUsers(function(err, user) {
    console.log('controller');

    if (err) {
      res.send(err);
      console.log('res', user);

    } else {
      res.send(user);
    }
  });
};

exports.getUser = function(req, res) {
  User.getUserById(req.params.userId, function(err, user) {
    if (err) {
      res.send(err);
      console.log('res', user);

    }

    res.json(user);
  });
};

exports.createUser = function(req, res) {
  const newUser = new User(req.body);

  // handles null error
  if (!newUser) {
    res.status(400).send({ error: true, message: 'Please provide user' });

  } else {
    User.createUser(newUser, function(err, user) {
      if (err) {
        res.send(err);

      }

      res.json(user);
    });
  }
}