/**
 * Script for populating genres table.
 * @author vmlacic
 */
'use strict';

const genresJson = require('./genres.json');

const populateGenres = async (database) => {
  const { Genre } = database;
  const genres = genresJson.map(genre => {
    return { name: genre };
  });

  await Genre.bulkCreate(genres);
};

module.exports = populateGenres;