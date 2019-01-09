'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
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
    year: DataTypes.STRING,
    albumArtPath: DataTypes.STRING,
  }, {});

  Album.associate = models => {
    Album.Songs = Album.hasMany(models.Song);
    Album.Artists = Album.belongsToMany(models.Artist, { through: 'ArtistAlbum' });
  };
  return Album;
};