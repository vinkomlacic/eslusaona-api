/**
 * User routes configuration.
 * @author vmlacic
 */
'use strict';

const express = require('express');
const userController = require('../controller/user');


// Router for the /user route.
const router = express.Router();

/**
 * Handles requests to /user.
 * These actions are available only to logged in administrator account.
 */
router
  .get('/', userController.getAll)
  .get('/:userId', userController.getById)
  .patch('/:userId', userController.updateOrCreateById)
  .delete('/:userId', userController.deleteById);

/**
 * Handles requests to user/login.
 * Contents of the request are username/email and password.
 * In the response the API returns a token.
 * In the header of every consequent request the client must send that token.
 * The token is valid for 5 minutes. Every new request refreshes the token.
 */
router.post('/login', userController.login);

/**
 * Handles requests to user/register.
 * Contents of the request are:
 * -first name
 * -last name
 * -username
 * -email
 * -password
 * 
 * The response is just an OK status if the request passess server validation
 * and the user has to login with the data he specified to access the API.
 */
router.post('/register', userController.register);

/**
 * Handles requests to /user/resetPassword.
 * Contents of the request are:
 * -email
 * -oldPassword
 * -newPassword
 * 
 * The response is status OK is request is valid.
 */
router.post('/', userController.resetPassword);

/**
 * Handles requests to /user/validate.
 * Validates the token.
 * Response status is OK if the token has not expired.
 */
router.post('/', userController.validate);

module.exports = router;