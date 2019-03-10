'use strict';
module.exports = (sequelize, DataTypes) => {
  const dog = sequelize.define('dog', {
    apiId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    breedName: DataTypes.STRING,
    sex: DataTypes.STRING,
    age: DataTypes.STRING,
    img: DataTypes.STRING
  }, {});
  dog.associate = function(models) {
    models.dog.belongsToMany(models.users, {through: 'dogUser'})
    // associations can be defined here
  };
  return dog;
};