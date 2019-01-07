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
      unique: true,
    },
    length: DataTypes.INTEGER,
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbnailPath: DataTypes.STRING,
  }, {});

  Song.associate = function(models) {
    Song.Album = Song.belongsTo(models.Album);
    Song.Artists = Song.belongsToMany(models.Artist, { through: 'SongArtist' });
    Song.Genres = Song.belongsToMany(models.Genre, { through: 'SongGenre' });
  }

  return Song;
};