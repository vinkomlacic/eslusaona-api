/**
 * Script for associating artist and genre models (n:m).
 * Associates an artist with 2 random genres.
 * @author vmlacic
 */
'use strict';

const faker = require('faker');

const associateArtistGenre = async (database) => {
  const { Genre, Artist } = database;

  const artists = await Artist.findAll();
  const genres = await Genre.findAll();

  for (const artist of artists) {
    const genre = faker.random.arrayElement(genres);
    artist.addGenre(genre);
    await artist.save();
  }
  
};

module.exports = associateArtistGenre;