/**
 * Authenticate routes configuration.
 * @author vmlacic
 */
'use strict';

const express = require('express');
const JWTValidationMiddleware = require('../middleware/JWTValidation');
const userController = require('../controller/User');


// Router for the /user route.
const router = express.Router();

/**
 * Handles requests to /user.
 * These actions are available only to logged in administrator account.
 */
router.use(JWTValidationMiddleware.validateForRoles(['ADMINISTRATOR']));

/**
 * @route GET /user
 * @group user - handles CRUD operations on user model. Note: available only to
 * administrator account
 * @produces application/json
 * @returns {User.model} 200 - ListItemResponse: all users
 * @returns {Response.model} 500 - Error if not authenticated.
 * @security JWT
 */
router.get('/', userController.getAll);

/**
 * @route GET /user/{id}
 * @group user - handles CRUD operations on user model. Note: available only to
 * administrator account
 * @produces application/json
 * @returns {User.model} 200 - SingleItemResponse: user with the specified id
 * @return {Response.model} 500 - Error if not authenticated or if the user does
 * not exist
 * @security JWT
 */
router.get('/:userId', userController.getById);

/**
 * @route PATCH /user/{id}
 * @group user - handles CRUD operations on user model. Note: available only to
 * administrator account
 * @param {User.model} newUser.required Partial user model. Can only contain
 * fields from user model. Cannot contain id or uuid field because they are
 * immutable.
 * @produces application/json
 * @consumes application/json
 * @returns {User.model} 200 - SingleItemResponse: updated user model
 * @returns {Response.model} 500 - Error if not authenticated or if the user does
 * not exist or if the request is of invalid format.
 * @security JWT
 */
router.patch('/:userId', userController.updateById);

/**
 * @route DELETE /user/{id}
 * @group user - handles CRUD operations on user model. Note: available only to
 * administrator account
 * @produces application/json
 * @returns {Response.model} 200 - SingleItemResponse: success message
 * @returns {Response.model} 500 - Error if not authenticated or if the user does
 * not exist.
 * @security JWT
 */
router.delete('./:userId', userController.deleteById);

module.exports = router;