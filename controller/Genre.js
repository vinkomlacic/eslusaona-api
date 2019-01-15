/**
 * Genre controller. Handles /genre requests
 * @author vmlacic
 */
'use strict';

const { statusCodes, InternalError, updateInstance } = require('../utils');
const { SingleItemResponse, ListItemResponse } = require('../utils/response');

/*******************************************************************************
 * Handles GET requests to /genre
 */
const getAll = (req, res, next) => {
  const { Genre } = req.app.get('models');

  Genre.findAll()
  .then(genres => {
    const response = new ListItemResponse(statusCodes.OK, { genres });
    res.status(200).send(response);
  })
  .catch(err => next(err));
};

/*******************************************************************************
 * Handles GET requests to /genre/{id}.
 */
const getById = (req, res, next) => {
  getGenreById(req)
  .then(genre => {
    const response = new SingleItemResponse(statusCodes.OK, { genre });
    res.status(200).send(response);
  })
  .catch(err => next(err));
};


/*******************************************************************************
 * Handles GET requests to /genre/{id}/songs.
 */
const getSongs = (req, res, next) => {
  getGenreById(req)
  .then(genre => genre.getSongs())
  .then(songs => {
    const response = new ListItemResponse(statusCodes.OK, { songs });
    res.status(200).send(response);
  })
  .catch(err => next(err));
};


/*******************************************************************************
 * Handles GET requests to /genre/{id}/artists.
 */
const getArtists = (req, res, next) => {
  getGenreById(req)
  .then(genre => genre.getArtists())
  .then(artists => {
    const response = new ListItemResponse(statusCodes.OK, { artists });
    res.status(200).send(response);
  })
  .catch(err => next(err));
};

/*******************************************************************************
 * Handles GET requests to /genre/{id}/albums.
 */
const getAlbums = (req, res, next) => {
  getGenreById(req)
  .then(genre => genre.getAlbums())
  .then(albums => {
    const response = new ListItemResponse(statusCodes.OK, { albums });
    res.status(200).send(response);
  })
  .catch(err => next(err));
};

/**
 * Helper function. Not exported.
 * @todo This logic exists in other controllers with other models. DRY!
 * @async
 */
const getGenreById = async (req) => {
  const { Genre } = req.app.get('models');

  const genre = await Genre.findOne({ where: { id: req.params.genreId } });
  if (genre === null) throw new InternalError(statusCodes.nonExistingGenre);

  return genre;
};

module.exports = {
  getAll,
  getById,
  getSongs,
  getArtists,
  getAlbums,
};