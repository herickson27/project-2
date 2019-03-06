'use strict';
module.exports = (sequelize, DataTypes) => {
  const breed = sequelize.define('breed', {
    userId: DataTypes.INTEGER,
    breedName: DataTypes.STRING,
    collectionComment: DataTypes.STRING
  }, {});
  breed.associate = function(models) {
    breed.hasMany(models.breed,{
      foreignKey: 'userId',
      as: 'breed',
    });
    // associations can be defined here
  };
  return breed;
};