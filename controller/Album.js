/**
 * Album controller. Handles requests to /album resourse.
 * @author vmlacic
 */
'use strict';
const { statusCodes, InternalError, updateInstance } = require('../utils');
const { SingleItemResponse, ListItemResponse } = require('../utils/response');

/*******************************************************************************
 * Handles GET requests to /album.
 */
const getAll = (req, res, next) => {
  const { Album } = req.app.get('models');

  Album.findAll()
  .then(albums => {
    const response = new ListItemResponse(statusCodes.OK, { albums });
    res.status(200).send(response);
  })
  .catch(err => next(err));
};

/*******************************************************************************
 * Handles GET requests to /album/{id}.
 */
const getById = (req, res, next) => {
  getAlbumById(req)
  .then(album => {
    const response = new SingleItemResponse(statusCodes.OK, { album });
    res.status(200).send(response);
  })
  .catch(err => next(err));
};

/*******************************************************************************
 * Handles GET requests to /album/{id}/songs.
 */
const getSongs = (req, res, next) => {
  getAlbumById(req)
  .then(album => album.getSongs())
  .then(songs => {
    const response = new ListItemResponse(statusCodes.OK, { songs });
    res.status(200).send(response);
  })
  .catch(err => next(err));
};

/*******************************************************************************
 * Handles GET requests to /album/{id}/artists.
 */
const getArtists = (req, res, next) => {
  getAlbumById(req)
  .then(album => album.getArtists())
  .then(artists => {
    const response = new ListItemResponse(statusCodes.OK, { artists });
    res.status(200).send(response);
  })
  .catch(err => next(err));
};

/*******************************************************************************
 * Handles PATCH requests to /album/{id}.
 */
const updateById = updateInstance({
  modelName: 'Album',
  validProperties: [
    'name',
    'year',
    'albumArtPath',
  ],
  validImmutableProperties: [
    'id',
  ],
});

/*******************************************************************************
 * Handles DELETE requests to /album/{id}.
 */
const deleteById = (req, res, next) => {
  getAlbumById(req)
  .then(album => album.destroy())
  .then(() => {
    const response = new SingleItemResponse(statusCodes.OK, {
      message: `Album ${req.params.albumId} successfully deleted.`,
    });
    res.status(200).send(response);
  })
  .catch(err => next(err));
};

/**
 * Helper function. Not exported.
 * @todo Same logic in other controllers. Write HOF.
 * @param {*} req 
 * @async
 */
const getAlbumById = async (req) => {
  const { Album } = req.app.get('models');

  const album = await Album.findOne({
    where: { id: req.params.albumId },
  });

  if (album === null) throw new InternalError(statusCodes.nonExistingAlbum);

  return album;
};

module.exports = {
  getAll,
  getById,
  getSongs,
  getArtists,
  updateById,
  deleteById,
};