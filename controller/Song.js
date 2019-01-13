/**
 * Song controller. Handles /song requests.
 * @author vmlacic
 */
'use strict';

const { statusCodes, InternalError } = require('../utils');
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
    const response = new ListItemResponse(statusCodes.OK, songs);
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
  const { Song } = req.app.get('models');

  Song.findOne({
    where: {
      id: req.params.songId,
    },
  })
  .then(song => {
    if (song === null) throw new InternalError(statusCodes.nonExistingSong);

    const response = new SingleItemResponse(statusCodes.OK, { song });
    res.status(200).send(response);
  })
  .catch(err => {
    next(err);
  });
};

const getAlbum = (req, res, next) => {

};

const getArtists = (req, res, next) => {

};

const getGenres = (req, res, next) => {

};

/*******************************************************************************
 * Handles PATCH requests to /song/{id}
 */
const updateById = (req, res, next) => {
  const { Song } = req.app.get('models');
  const newSong = req.body.song;

  try {
    validateSongInstance(newSong);

  } catch (err) {
    next(err);

  }

  Song.findOne({
    where: {
      id: req.params.songId,
    },
  })
  .then(song => {
    if (song === null) throw new InternalError(statusCodes.nonExistingSong);
    return updateSongInstance(song, newSong);
  })
  .then(song => {
    const response = new SingleItemResponse(statusCodes.OK, { song });
    res.status(200).send(response);
  })
  .catch(err => {
    next(err);
  });
};

/*******************************************************************************
 * Handles DELETE requests to /song/{id}. 
 */
const deleteById = (req, res, next) => {
  const { Song } = req.app.get('models');

  Song.findOne({
    where: {
      id: req.params.songId,
    },
  })
  .then(song => {
    if (song === null) throw new InternalError(statusCodes.nonExistingSong);
    return song.destroy();
  })
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
 * Validation logic for input data.
 * @todo This logic already exists in user controller. Write a higher order function.
 * @param {*} song 
 */
const validateSongInstance = song => {
  const properties = Object.keys(song);
  const validProperties = [
    'title',
    'length',
    'filePath',
    'AlbumId',
  ];

  const validImmutableProperties = ['id'];

  properties.forEach(property => {
    if(![...validProperties, ...validImmutableProperties].includes(property)) {
      throw new InternalError(
        statusCodes.validationError,
        `${property} is not a field in the Song model.`,
      );

    } else if (validImmutableProperties.includes(property)) {
      throw new InternalError(
        statusCodes.validationError,
        `You are not allowed to change ${property} of the Song model.`,
      );

    }
  });
};

/**
 * Updates song instance.
 * @todo This logic already exists in user controller. DRY!
 * @param {*} song 
 * @param {*} newSong 
 */
const updateSongInstance = async (song, newSong) => {
  const properties = Object.keys(newSong);

  properties.forEach(property => song.set(property, newSong[property]));
  await song.save();

  return song;
};

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
