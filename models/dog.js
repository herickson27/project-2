'use strict';
module.exports = (sequelize, DataTypes) => {
  const dog = sequelize.define('dog', {
    apiId: DataTypes.INTEGER,
    dogComment: DataTypes.STRING,
    breedId: DataTypes.INTEGER
  }, {});
  dog.associate = function(models) {
    // associations can be defined here
  };
  return dog;
};