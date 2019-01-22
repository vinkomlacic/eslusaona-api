/**
 * Routes configuration for /song
 * @author vmlacic
 */
'use strict';

/**
 * @typedef Song
 * @property {integer} id
 * @property {string} title
 * @property {integer} length
 * @property {string} filePath
 * @property {integer} AlbumId foreign key from albums table
 */

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

/**
 * @route GET /song
 * @group song - handles CRUD operations on song model
 * @produces application/json
 * @returns {Song.model} 200 - ListItemResponse: all songs
 * @returns {Response.model} 500 - Error if not authenticated.
 * @security JWT
 */
router.get('/', songController.getAll);

/**
 * @route POST /song/search
 * @group song - handles CRUD operations on song model
 * @produces application/json
 * @returns {Song.model} 200 - ListItemResponse: all songs matching the query
 * @returns {Response.model} 500 - Error if not authenticated.
 * @security JWT
 */
router.post('/search', songController.search);

/**
 * @route GET /song/{id}
 * @group song - handles CRUD operations on song model
 * @produces application/json
 * @returns {Song.model} 200 - SingleItemResponse: song with the specified id
 * @returns {Response.model} 500 - Error if not authenticated or if the song does
 * not exist
 * @security JWT
 */
router.get('/:songId', songController.getById);

/**
 * @route GET /song/{id}/album
 * @group song - handles CRUD operations on song model
 * @produces application/json
 * @returns {Album.model} 200 - SingleItemResponse: album of the song with the
 * specified id
 * @returns {Response.model} 500 - Error if not authenticated or if the song does
 * not exist
 * @security JWT
 */
router.get('/:songId/album', songController.getAlbum);

/**
 * @route GET /song/{id}/artists
 * @group song - handles CRUD operations on song model
 * @produces application/json
 * @returns {Artist.model} 200 - ListItemResponse: artists which are associated with
 * the song with the specified id
 * @returns {Response.model} 500 - Error if not authenticated or if the song does
 * not exist
 * @security JWT
 */
router.get('/:songId/artists', songController.getArtists);

/**
 * @router GET /song/{id}/genres
 * @group song - handles CRUD operations on song model
 * @produces application/json
 * @returns {Genre.model} 200 - ListItemResponse: genres associated with the song
 * with the specified id
 * @returns {Response.model} 500 - Error if not authenticated or if the song does
 * not exist
 * @security JWT
 */
router.get('/:songId/genres', songController.getGenres);


/**
 * @todo These actions should be available only to administrator but for the time
 * being they will be available to user also. Change this after rewriting
 * {@link JWTValidationMiddleware} module.
 */

/**
 * @route POST /song
 * @group song - handles CRUD operations on song model
 * @param {Song.model} newSong.required Song model.
 * @produces application/json
 * @consumes application/json
 * @returns {Song.model} 200 - SingleItemResponse: newly created song model
 * @returns {Response.model} 500 - Error if not authenticated or if the model
 * has not passed server validation.
 * @security JWT
 */
router.post('/', songController.create);

/**
 * @route PATCH /song/{id}
 * @group song - handles CRUD operations on song model
 * @param {Song.model} newSong.required Partial song model. Can only contain fields
 * from song model. Cannot contain id field because it is immutable.
 * @produces application/json
 * @consumes application/json
 * @returns {Song.model} 200 - SingleItemResponse: updated song model
 * @returns {Response.model} 500 - Error if not authenticated or if the song does
 * not exist or if the request is of invalid format.
 * @security JWT
 */
router.patch('/:songId', songController.updateById);

/**
 * @route DELETE /song/{id}
 * @group song - handles CRUD operations on song model
 * @produces application/json
 * @returns {Response.model} 200 - SingleItemResponse: success message
 * @returns {Response.model} 500 - Error if not authenticated or if the song
 * does not exist.
 * @security JWT
 */
router.delete('/:songId', songController.deleteById);

module.exports = router;