'use strict';
module.exports = (sequelize, DataTypes) => {
  const pupUser = sequelize.define('pupUser', {
    userId: DataTypes.INTEGER,
    pupId: DataTypes.INTEGER
  }, {});
  pupUser.associate = function(models) {
    // associations can be defined here
  };
  return pupUser;
};