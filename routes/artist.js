/**
 * Routes configuration for /artist
 * @author vmlacic
 */
'use strict';

/**
 * @typedef Artist
 * @property {integer} id
 * @property {string} name
 */

const express = require('express');
const JWTValidationMiddleware = require('../middleware/JWTValidation');
const artistController = require('../controller/Artist');

// Router for the /artist route.
const router = express.Router();

/**
 * Handles requests to /artist.
 * These actions are available to logged in administrator or user account.
 */
router.use(JWTValidationMiddleware.validateForRoles(['ADMINISTRATOR', 'USER']));

/**
 * @route GET /artist
 * @group artist - handles CRUD operations on artist model
 * @produces application/json
 * @returns {Artist.model} 200 - ListItemResponse: all artists
 * @returns {Response.model} 500 - Error if not authenticated.
 * @security JWT
 */
router.get('/', artistController.getAll);

/**
 * @route GET /artist/{id}
 * @group artist - handles CRUD operations on artist model
 * @produces application/json
 * @returns {Artist.model} 200 - SingleItemResponse: artist with the specified id
 * @returns {Response.mode} 500 - Error if not authenticated or if the song does
 * not exist
 * @security JWT
 */
router.get('/:artistId', artistController.getById);

/**
 * @route GET /artist/{id}/songs
 * @group artist - handles CRUD operations on artist model
 * @produces application/json
 * @returns {Song.model} 200 - ListItemResponse: songs which are associated with
 * the artist with the specified id
 * @returns {Response.model} 500 - Error if not authenticated or if the artist does
 * not exist
 * @security JWT
 */
router.get('/:artistId/songs', artistController.getSongs);

/**
 * @route GET /artist/{id}/albums
 * @group artist - handles CRUD operations on artist model
 * @produces application/json
 * @returns {Album.model} 200 - ListItemResponse: albums which are associated with
 * the artist with the specified id
 * @returns {Response.model} 500 - Error if not authenticated or if the artist does
 * not exist
 * @security JWT
 */
router.get('/:artistId/albums', artistController.getAlbums);

/**
 * @route GET /artist/{id}/genres
 * @group artist - handles CRUD operations on artist model
 * @produces application/json
 * @returns {Genre.model} 200 - ListItemResponse: genres which are associated with
 * the artist with the specified id
 * @returns {Response.model} 500 - Error if not authenticated or if the artist does
 * not exist
 * @security JWT
 */
router.get('/:artistId/genres', artistController.getGenres);

/**
 * @todo These actions should be available only to administrator but for the time
 * being they will be available to user also. Change this after rewriting
 * {@link JWTValidationMiddleware} module.
 */

/**
 * @route PATCH /artist/{id}
 * @group artist - handles CRUD operations on artist model
 * @param {Artist.model} newArtist.required Partial artist model. Can only contain
 * fields from song model. Cannot contain id field because it is immutable.
 * @produces application/json
 * @consumes application/json
 * @returns {Artist.model} 200 - SingleItemResponse: updated artist model
 * @returns {Response.model} 500 - Error if not authenticated or if the song does
 * not exist of if the request is of invalid format.
 * @security JWT
 */
router.patch('/:artistId', artistController.updateById);

/**
 * @route DELETE /artist/{id}
 * @group artist - handles CRUD operations on artist model
 * @produces application/json
 * @returns {Response.model} 200 - SingleItemResponse: success message
 * @returns {Response.model} 500 - Error if not authenticated or if the song does
 * not exist
 * @security JWT
 */
router.delete('/:artistId', artistController.deleteById);

module.exports = router;