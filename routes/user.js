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
router.get('/', userController.getAll);
router.get('/:userId', userController.getById);
router.patch('/:userId', userController.updateById);
router.delete('./:userId', userController.deleteById);

module.exports = router;