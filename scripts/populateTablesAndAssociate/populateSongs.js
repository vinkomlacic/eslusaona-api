/**
 * Populates songs table
 * @author vmlacic
 */
'use strict';
const faker = require('faker');

const populateSongs = async (database, count) => {
  const { Song } = database;

  for (let i = 0; i < count; i++) {
    const title = faker.company.catchPhraseAdjective();
    const length = 194;
    const filePath = faker.internet.url();

    await Song.create({
      title,
      length,
      filePath,
    })
    .catch(error => {
      console.error(`Error occurred in populateSongs:\n${error.message}`);
    });
  }
};

module.exports = populateSongs;