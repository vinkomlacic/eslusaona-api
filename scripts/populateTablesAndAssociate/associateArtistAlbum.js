/**
 * Script for creating associations between Artist and Album models (n:m).
 * The scripts looks for songs in every album and assigns distinct artists to album from songs.
 * @author vmlacic
 */
'use strict';

const associateArtistAlbum = async (database) => {
  const { Album } = database;

  const albums = await Album.findAll();

  for (const album of albums) {
    const songs = await album.getSongs();

    const distinctArtists = [];
    for (const song of songs) {
      const artists = await song.getArtists();
      artists.forEach(artist => {
        if (!distinctArtists.includes(artist)) {
          distinctArtists.push(artist);
        }
      });
    }

    for (const artist of distinctArtists) {
      album.addArtist(artist);
      await album.save();
    }
  }
  
};

module.exports = associateArtistAlbum;