'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    length: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});

  Song.associate = function(models) {
    Song.Album = Song.belongsTo(models.Album);
    Song.Artists = Song.belongsToMany(models.Artist, { through: 'SongArtist' });
    Song.Genres = Song.belongsToMany(models.Genre, { through: 'SongGenre' });
  }

  return Song;
};