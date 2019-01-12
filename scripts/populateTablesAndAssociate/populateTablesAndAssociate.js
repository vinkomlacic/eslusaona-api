/**
 * Wrapper script for all of the scripts in the module
 * @author vmlacic
 */
'use strict';
const populateUsers= require('./populateUsers');
const populateSongs = require('./populateSongs');
const populateArtists = require('./populateArtists');
const populateGenres = require('./populateGenres');
const populateAlbums = require('./populateAlbums');

const associateSongAlbum = require('./associateSongAlbum');
const associateSongArtist = require('./associateSongArtist');
const associateArtistAlbum = require('./associateArtistAlbum');
const associateArtistGenre = require('./associateArtistGenre');
const associateSongGenre = require('./associateSongGenre');

const populateTablesAndAssociate = async (db) => {
  await populateUsers(db, 100);
  await populateSongs(db, 75);  
  await populateArtists(db, 10);
  await populateGenres(db);
  await populateAlbums(db, 7);

  await associateSongAlbum(db);
  await associateSongArtist(db);
  await associateArtistAlbum(db);
  await associateArtistGenre(db);
  await associateSongGenre(db);
};

module.exports = populateTablesAndAssociate;