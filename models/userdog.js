'use strict';
module.exports = (sequelize, DataTypes) => {
  const userDog = sequelize.define('userDog', {
    userId: DataTypes.INTEGER,
    dogId: DataTypes.INTEGER
  }, {});
  userDog.associate = function(models) {
    // associations can be defined here
  };
  return userDog;
};