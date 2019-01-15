/**
 * Song controller. Handles /song requests.
 * @author vmlacic
 */
'use strict';

const { statusCodes, InternalError, updateInstance } = require('../utils');
const { SingleItemResponse, ListItemResponse } = require('../utils/response');

const create = (req, res, next) => {

};

/*******************************************************************************
 * Handles GET requests to /song. Returns all songs.
 * @todo Write more controller methods that can limit and range this list
 * response for better performance.
 */
const getAll = (req, res, next) => {
  const { Song } = req.app.get('models');

  Song.findAll()
  .then(songs => {
    const response = new ListItemResponse(statusCodes.OK, { songs });
    res.status(200).send(response);
  })
  .catch(err => {
    next(err);
  });
};

/*******************************************************************************
 * Handles GET requests to /song/{id}
 * @todo Create streaming endpoint.
 */
const getById = (req, res, next) => {
  getSongById(req)
  .then(song => {
    const response = new SingleItemResponse(statusCodes.OK, { song });
    res.status(200).send(response);
  })
  .catch(err => {
    next(err);
  });
};

/*******************************************************************************
 * Handles GET requests to /song/{id}/album
 */
const getAlbum = (req, res, next) => {
  getSongById(req)
  .then(song => song.getAlbum())
  .then(album => {
    const response = new SingleItemResponse(statusCodes.OK, { album });
    res.status(200).send(response);
  })
  .catch(err => next(err));
};

/*******************************************************************************
 * Handles GET requests to /song/{id}/artists
 */
const getArtists = (req, res, next) => {
  getSongById(req)
  .then(song => song.getArtists())
  .then(artists => {
    const response = new ListItemResponse(statusCodes.OK, { artists });
    res.status(200).send(response);
  })
  .catch(err => next(err));
};

/*******************************************************************************
 * Handles GET requests to /song/{id}/genres
 */
const getGenres = (req, res, next) => {
  getSongById(req)
  .then(song => song.getGenres())
  .then(genres => {
    const response = new ListItemResponse(statusCodes.OK, { genres });
    res.status(200).send(response);
  })
  .catch(err => next(err));
};

/*******************************************************************************
 * Handles PATCH requests to /song/{id}
 */
const updateById = updateInstance({
  modelName: 'Song',
  validProperties: [
    'title',
    'length',
    'filePath',
    'AlbumId',
  ],
  validImmutableProperties: ['id'],
});

/*******************************************************************************
 * Handles DELETE requests to /song/{id}. 
 */
const deleteById = (req, res, next) => {
  getSongById(req)
  .then(song => song.destroy())
  .then(() => {
    const response = new SingleItemResponse(statusCodes.OK, {
      message: `Song ${req.params.songId} successfully deleted.`,
    });
    res.status(200).send(response);
  })
  .catch(err => {
    next(err);
  });
};

/**
 * Helper function that fetches song instance by id. Not exported. 
 * @todo Same logic exists in other controllers. Write HOF
 * @async
 */
const getSongById = async (req) => {
  const { Song } = req.app.get('models');

  const song = await Song.findOne({
    where: { id: req.params.songId },
  });

  if (song == null) throw new InternalError(statusCodes.nonExistingSong);

  return song;
}

module.exports = {
  create,
  getAll,
  getById,
  getAlbum,
  getArtists,
  getGenres,
  updateById,
  deleteById,
};
