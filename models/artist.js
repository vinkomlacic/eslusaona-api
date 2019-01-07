'use strict';
module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('Artist', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});

  Artist.associate = models => {
    Artist.Songs = Artist.belongsToMany(models.Song, { through: 'SongArtist' });
    Artist.Albums = Artist.belongsToMany(models.Album, { through: 'ArtistAlbum' });
    Artist.Genres = Artist.belongsToMany(models.Genre, { through: 'ArtistGenre' });
  };

  return Artist;
};