'use strict';
module.exports = (sequelize, DataTypes) => {
  const pup = sequelize.define('pup', {
    apiId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    breedName: DataTypes.STRING,
    sex: DataTypes.STRING,
    age: DataTypes.STRING,
    img: DataTypes.STRING
  }, {});
  pup.associate = function(models) {
    // associations can be defined here
    models.pup.belongsToMany(models.user, {through: "pupUser"})
  };
  return pup;
};