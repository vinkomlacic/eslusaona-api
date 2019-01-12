/**
 * Script for populating albums table.
 * @author vmlacic
 */
'use strict';
const faker = require('faker');

const populateAlbums = async (database, count) => {
  const { Album } = database;

  for (let i = 0; i < count; i++) {
    await Album.create({
      name: faker.company.catchPhraseAdjective(),
      year: faker.date.past(50).getUTCFullYear(),
      albumArtPath: faker.internet.url(), // won't work
    });
  }
};

module.exports = populateAlbums;