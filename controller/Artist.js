/**
 * Artist controller. Handles requests to /artist resource
 * @author vmlacic
 */
'use strict';

const { statusCodes, InternalError, updateInstance }= require('../utils');
const { SingleItemResponse, ListItemResponse } = require('../utils/response');

/*******************************************************************************
 * Handles GET requests to /artist
 */
const getAll = (req, res, next) => {
  const { Artist } = req.app.get('models');

  Artist.findAll()
  .then(artists => {
    const response = new ListItemResponse(statusCodes.OK, artists);
    res.status(200).send(response);
  })
  .catch(err => {
    next(err);
  });
};

/*******************************************************************************
 * Handles GET requests to /artist/{id}
 */
const getById = (req, res, next) => {
  getArtistById(req)
  .then(artist => {
    const response = new SingleItemResponse(statusCodes.OK, { artist });
    res.status(200).send(response);
  })
  .catch(err => next(err));
};

/*******************************************************************************
 * Handles GET requests to /artist/{id}/songs
 */
const getSongs = (req, res, next) => {
  getArtistById(req)
  .then(artist => artist.getSongs())
  .then(songs => {
    const response = new ListItemResponse(statusCodes.OK, { songs });
    res.status(200).send(response);
  })
  .catch(err => next(err));
};

/*******************************************************************************
 * Handles GET requests to /artist/{id}/albums
 */
const getAlbums = (req, res, next) => {
  getArtistById(req)
  .then(artist => artist.getAlbums())
  .then(albums => {
    const response = new ListItemResponse(statusCodes.OK, { albums });
    res.status(200).send(response);
  })
  .catch(err => next(err));
};

/*******************************************************************************
 * Handles GET requests to /artist/{id}/genres
 */
const getGenres = (req, res, next) => {
  getArtistById(req)
  .then(artist => artist.getGenres())
  .then(genres => {
    const response = new ListItemResponse(statusCodes.OK, { genres });
    res.status(200).send(response);
  })
  .catch(err => next(err));
};

/*******************************************************************************
 * Handles PATCH requests to /artist/{id}
 */
const updateById = updateInstance({
  modelName: 'Artist',
  validProperties: ['name'],
  validImmutableProperties: ['id'],
});

/*******************************************************************************
 * Handles DELETE requests to /artist/{id}
 */
const deleteById = (req, res, next) => {
  getArtistById(req)
  .then(artist => artist.destroy())
  .then(() => {
    const response = new SingleItemResponse(statusCodes.OK, {
      message: `Artist ${req.params.artistId} successfully deleted.`,
    });
    res.status(200).send(response);
  })
  .catch(err => next(err));
};

/**
 * Helper function, not exported.
 * @param {*} req 
 * @throws Error if non existing artist.
 * @async
 */
const getArtistById = async (req) => {
  const { Artist } = req.app.get('models');

  const artist = await Artist.findOne({
    where: {
      id: req.params.artistId,
    },
  });

  if (artist === null) throw new InternalError(statusCodes.nonExistingArtist);

  return artist;
}

module.exports = {
  getAll,
  getById,
  getSongs,
  getAlbums,
  getGenres,
  updateById,
  deleteById,
};
