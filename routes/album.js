/**
 * Routes configuration for /album
 * @author vmlacic
 */
'use strict';

/**
 * @typedef Album
 * @property {integer} id
 * @property {string} name
 * @property {string} year
 * @property {string} albumArtPath
 */

const express = require('express');
const JWTValidationMiddleware = require('../middleware/JWTValidation');
const albumController = require('../controller/Album');

// Router for the /album route.
const router = express.Router();

/**
 * Handles requests to /album.
 * These actions are available to logged in administrator or user account.
 */
router.use(JWTValidationMiddleware.validateForRoles(['ADMINISTRATOR', 'USER']));

/**
 * @route GET /album
 * @group album - handles CRUD operations on album model
 * @produces application/json
 * @returns {Album.model} 200 - ListItemResponse: all albums
 * @returns {Response.model} 500 - Error if not authenticated.
 * @security JWT
 */
router.get('/', albumController.getAll);

/**
 * @route GET /album/{id}
 * @group album - handles CRUD operations on album model
 * @produces application/json
 * @returns {Album.model} 200 - SingleItemResponse: album with the specified id
 * @returns {Response.model} 500 - Error if not authenticated or if the album does
 * not exist
 * @security JWT
 */
router.get('/:albumId', albumController.getById);

/**
 * @route GET /album/{id}/songs
 * @group album - handles CRUD operations on album model
 * @produces application/json
 * @returns {Song.model} 200 - ListItemResponse: songs which are associated with
 * the album with the specified id
 * @returns {Response.model} 500 - Error if not authenticated or if the album does
 * not exist
 * @security JWT
 */
router.get('/:albumId/songs', albumController.getSongs);

/**
 * @route GET /album/{id}/artists
 * @group album - handles CRUD operations on album model
 * @produces application/json
 * @returns {Artist.model} 200 - ListItemResponse: artists which are associated with
 * the album with the specified id
 * @returns {Response.model} 500 - Error if not authenticated or if the album does
 * not exist
 * @security JWT
 */
router.get('/:albumId/artists', albumController.getArtists);

/**
 * @route PATCH /album/{id}
 * @group album - handles CRUD operations on album model
 * @param {Album.model} newAlbum.required Partial song model. Can only contain fields
 * from album model. Cannot contain id field because it is immutable.
 * @produces application/json
 * @consumes application/json
 * @returns {Album.model} 200 - SingleItemResponse: updated album model
 * @returns {Response.model} 500 - Error if not authenticated or if the album does
 * not exist or if the request is of invalid format.
 * @security JWT
 */
router.patch('/:albumId', albumController.updateById);

/**
 * @route DELETE /album/{id}
 * @group album - handles CRUD operations on album model
 * @produces application/json
 * @returns {Response.model} 200 - SingleItemResponse: success message
 * @returns {Response.model} 500 - Error if not authenticated or if the album
 * does not exist.
 * @security JWT
 */
router.delete('/:albumId', albumController.deleteById);

module.exports = router;