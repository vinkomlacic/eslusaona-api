/**
 * Script for associating 5 songs with a random artist.
 * Does this for all artists so some songs might be left without an artist 
 * and some songs might have multiple artists.
 * @todo Add random artists to songs without artist.
 * @author vmlacic
 */
'use strict';

const faker = require('faker');

const associateSongArtist = async(database) => {
  const { Song, Artist } = database;
  const songs = await Song.findAll();
  const artists = await Artist.findAll();

  const promises = artists.map(associateRandomSongs(songs, 5));
  await Promise.all(promises).catch(error => {
    console.error(`Error in associateSongArtist:\n${error.message}`);
  });

  // Reload songs and artists so you have fresh data
  await songs.forEach(song => song.reload());
  await artists.forEach(artist => artist.reload());

  // If song is without an artist add a random one to it
  await Promise.all(songs.map(associateRandomArtist(artists)))
    .catch(error => {
      console.error(`Error in associateSongArtist:\n${error.message}`);
    });

};

const associateRandomSongs = (songs, count) => async(artist) => {
  const randomSongs = [];
  for (let i = 0; i < count; i++) {
    randomSongs.push(faker.random.arrayElement(songs));
  }

  artist.addSongs(randomSongs);
  return artist.save();
};

const associateRandomArtist = artists => async(song) => {
  const artist = faker.random.arrayElement(artists);
  song.addArtist(artist);
  return song.save();
}

module.exports = associateSongArtist;