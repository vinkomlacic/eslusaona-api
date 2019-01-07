'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});

  Genre.associate = models => {
    Genre.Songs = Genre.belongsToMany(models.Song, { through: 'SongGenre' });
    Genre.Artists = Genre.belongsToMany(models.Artist, { through: 'ArtistGenre' });
  };

  return Genre;
};