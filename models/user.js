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
    RoleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Roles',
        key: 'id',
      },
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notNull: true,
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
  };
  return User;
};