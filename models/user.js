/**
 * User model configuration
 * @author vmlacic  
 */
'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [6, undefined],
      },
    },
  }, {});
  User.associate = function(models) {
    User.Role = User.belongsTo(models.Role);
  };
  return User;
};