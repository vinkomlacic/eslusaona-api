/**
 * Routes configuration for /genre
 * @author vmlacic
 */
'use strict';

/**
 * @typedef Genre
 * @property {integer} id
 * @property {string} name
 */

const express = require('express');
const JWTValidationMiddleware = require('../middleware/JWTValidation');
const genreController = require('../controller/Genre');

// Router for the /genre route.
const router = express.Router();

/**
 * Handles requests to /genre.
 * These actions are available to logged in administrator or user account.
 */
router.use(JWTValidationMiddleware.validateForRoles(['ADMINISTRATOR', 'USER']));

/**
 * @route GET /genre
 * @group genre - handles CRUD operations on genre model
 * @produces application/json
 * @returns {Genre.model} 200 - ListItemResponse: all genres
 * @returns {Response.model} 500 - Error if not authenticated.
 * @security JWT
 */
router.get('/', genreController.getAll);

/**
 * @route GET /genre/{id}
 * @group genre - handles CRUD operations on genre model
 * @produces application/json
 * @returns {Genre.model} 200 - SingleItemResponse: genre with the specified id
 * @returns {Response.model} 500 - Error if not authenticated or if the genre does
 * not exist
 * @security JWT
 */
router.get('/:genreId', genreController.getById);

/**
 * @route GET /genre/{id}/songs
 * @group genre - handles CRUD operations on genre model
 * @produces application/json
 * @returns {Genre.model} 200 - ListItemResponse: songs which are associated with
 * the genre with the specified id
 * @returns {Response.model} 500 - Error if not authenticated or if the genre does
 * not exist
 * @security JWT
 */
router.get('/:genreId/songs', genreController.getSongs);

/**
 * @route GET /genre/{id}/artists
 * @group genre - handles CRUD operations on genre model
 * @produces application/json
 * @returns {Artist.model} 200 - ListItemResponse: artists which are associated with
 * the genre with the specified id
 * @returns {Response.model} 500 - Error if not authenticated or if the genre does
 * not exist
 * @security JWT
 */
router.get('/:genreId/artists', genreController.getArtists);

/**
 * @route GET /genre/{id}/albums
 * @group genre - handles CRUD operations on genre model
 * @produces application/json
 * @returns {Album.model} 200 - ListItemResponse: albums which are associated with
 * the genre with the specified id
 * @returns {Response.model} 500 - Error if not authenticated or if the genre does
 * not exist
 * @security JWT
 */
router.get('/:genreId/albums', genreController.getAlbums);