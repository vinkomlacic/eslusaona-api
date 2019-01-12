/**
 * Routes configuration for /song
 * @author vmlacic
 */
'use strict';

const express = require('express');
const JWTValidationMiddleware = require('../middleware/JWTValidation');
const songController = require('../controller/Song');

// Router for the /song route.
const router = express.Router();

/**
 * Handles requests to /song.
 * These actions are available to logged in administrator or user account.
 */
router.use(JWTValidationMiddleware.validateForRoles(['ADMINISTRATOR', 'USER']));
router.get('/', songController.getAll);
router.get('/:songId', songController.getById);

/**
 * @todo These actions should be available only to administrator but for the time
 * being they will be available to user also. Change this after rewriting
 * JWTValidationMiddleware module.
 */
router.patch('/:songId', songController.updateById);
router.delete('/:songId', songController.deleteById);

module.exports = router;