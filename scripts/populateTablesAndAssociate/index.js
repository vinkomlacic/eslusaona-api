/**
 * Module wrapper.
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

const populateTablesAndAssociate = require('./populateTablesAndAssociate');

module.exports = {
  populateUsers,
  populateSongs,
  populateArtists,
  populateGenres,
  populateAlbums,
  associateSongAlbum,
  associateSongArtist,
  associateArtistAlbum,
  associateArtistGenre,
  associateSongGenre,
  populateTablesAndAssociate,
};