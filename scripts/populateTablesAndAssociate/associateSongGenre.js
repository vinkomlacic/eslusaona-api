/**
 * Script for associating song and genre models (n:m).
 * The script associates song with a random model gotten from set of models from its artist.
 * Since I randomly assigned two genres to each artist for dev purposes, the script
 * will randomly choose one of three options for assigning genres to a song:
 * 1) first artist genre will be the song's genre
 * 2) second artist genre will be the song's genre
 * 3) both artist genres will be the song's genre
 * @author vmlacic
 */
'use strict';

const faker = require('faker');

const associateSongGenre = async (database) => {
  const { Song } = database;

  const songs = await Song.findAll();

  for (const song of songs) {
    const songArtists = await song.getArtists();
    const songGenres = [];

    for (const songArtist of songArtists) {
      const genres = await songArtist.getGenres();
      genres.forEach(genre => songGenres.push(genre));
    }

    const randomGenreOption = faker.random.arrayElement([1, 2, 3]);

    switch (randomGenreOption) {
      case 1:
      song.addGenre(songGenres[0]);
      break;
      case 2:
      song.addGenre(songGenres[1]);
      break;
      case 3:
      song.addGenres(songGenres);
      break;
      default:
      console.error('Oops. You made a mistake in switch statement. associateSongGenre');
    }

    await song.save();

  }
};

module.exports = associateSongGenre;