/**
 * Associate songs with a random album.
 * @author vmlacic
 */
'use strict';

const faker = require('faker');

const associateSongAlbum = async (database) => {
  const { Song, Album } = database;
  const albums  = await Album.findAll();

  const albumIds = albums.map(album => album.get('id'));

  await Song.findAll()
  .then(songs => {
    const promises = songs.map(associateRandomAlbum(albumIds));
    return Promise.all(promises);
  })
  .catch(error => {
    console.error(`Error occurred in associateSongAlbum:\n${error.message}`);
  });
};

/**
 * Creates a function which associates a song with an album from the specified set
 * @param {*} song
 * @returns Function
 */
const associateRandomAlbum = (albumIds) => (song) => {
  const albumId = faker.random.arrayElement(albumIds);
  song.set('AlbumId', albumId);
  return song.save();
}

module.exports = associateSongAlbum;