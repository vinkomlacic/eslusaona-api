/**
 * Script for populating artists table.
 * @author vmlacic
 */
'use strict';
const faker = require('faker');

const populateArtists = async (database, count) => {
  const { Artist } = database;

  for (let i = 0; i < count; i++) {
    const name = faker.name.findName();

    await Artist.create({
      name,
    })
    .catch(error => {
      console.error(`Error occured in populateArtists:\n${error.message}`);
    });
  }
};

module.exports = populateArtists;