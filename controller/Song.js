/**
 * Song controller. Handles /song requests.
 * @author vmlacic
 */
'use strict';

const { statusCodes, InternalError, updateInstance } = require('../utils');
const { SingleItemResponse, ListItemResponse } = require('../utils/response');
const Sequelize = require('sequelize');


const create = async (req, res, next) => {
  const { Song } = req.app.get('models');

  try {
    validateRequest(req);

  } catch (error) {
    next(error);

  }
  
  const album = await findOrCreateAlbum(req);
  const artists = await findOrCreateArtists(req);
  const genres = await fetchGenreInstancesFromDb(req);
  const { title, length, filePath } = req.body.song;

  const newSong = Song.build({
    title,
    length,
    filePath,
  });

  try {
    const savedSong = await newSong.save();
    savedSong.setAlbum(album);
    

    await savedSong.addArtists(artists);
    await savedSong.addGenres(genres);
    
    const response = new SingleItemResponse(statusCodes.OK, { savedSong });
    res.status(200).send(response);

  } catch (err) {
    next(err);

  }

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
};

/**
 * Helper function. Not exported.
 * @async
 */
const findOrCreateArtists = async (req) => {
  const { Artist } = req.app.get('models');
  const { artists } = req.body.song;

  const dbArtists = [];
  for (const artistData of artists) {
    const [artist, created] = await Artist.findOrCreate({
      where: { ...artistData },
    });

    dbArtists.push(artist);
  }

  return dbArtists;
};

/**
 * Helper function. Not exported.
 * @async
 */
const findOrCreateAlbum = async (req) => {
  const { Album } = req.app.get('models');
  const { album } = req.body.song;

  const [dbAlbum, created] = await Album.findOrCreate({
    where: {
      id: album.id,
      name: album.name,
    },
  });

  return dbAlbum;
};

/**
 * Helper function. Not exported.
 * @param {Array} genres ¸
 * @async
 */
const fetchGenreInstancesFromDb = async (req) => {
  const { Genre } = req.app.get('models');
  const { genres } = req.body.song;
  const { Op } = Sequelize;
  const dbGenres = [];

  for (const genre of genres) {
    const dbGenre = await Genre.findOne({
      where: {
        [Op.or]: [{ id: genre.id }, { name: genre.name }],
      },
    });
    if (dbGenre === null) throw new InternalError(statusCodes.nonExistingGenre);
    dbGenres.push(dbGenre);
  }

  return dbGenres;
};

/**
 * Helper function. Not exported. Validates the request.
 */
const validateRequest = (req) => {
  const validProperties = [
    'title',
    'length',
    'filePath',
    'artists',
    'album',
    'genres',
  ];

  if (!req.body.song) {
    throw new InternalError(
      statusCodes.validationError,
      'Data should be wrapped in a \'song\' object.',
    );
  }

  const requestProperties = Object.keys(req.body.song);

  validProperties.forEach(property => {
    if (!requestProperties.includes(property)) {
      throw new InternalError(
        statusCodes.validationError,
        `${property} not found in the request body.`,
      );
    }
  });

  // Type checking
  if (typeof(req.body.song.title) !== 'string') {
    throw new InternalError(statusCodes.validationError, 'Title should be of string type.');

  } else if (typeof(req.body.song.length) !== 'number') {
    throw new InternalError(statusCodes.validationError, 'Length should be a number type.');

  } else if (typeof(req.body.song.filePath) !== 'string') {
    throw new InternalError(statusCodes.validationError, 'FilePath should be of string type.');

  } else if (!Array.isArray(req.body.song.artists)) {
    throw new InternalError(statusCodes.validationError, 'Artists should be of array type.');

  } else if (!Array.isArray(req.body.song.genres)) {
    throw new InternalError(statusCodes.validationError, 'Genres should be of array type.');

  }
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
