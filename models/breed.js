'use strict';
module.exports = (sequelize, DataTypes) => {
  const breed = sequelize.define('breed', {
    userId: DataTypes.INTEGER,
    breedName: DataTypes.STRING,
    collectionComment: DataTypes.STRING
  }, {});
  breed.associate = function(models) {
    models.breed.hasMany(models.dog)
    models.breed.belongsTo(models.user)
    // associations can be defined here
  };
  return breed;
};