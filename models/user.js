'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  //add validations here
  const user = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,99],
          msg: 'Invalid User Name. Must be between 1-99 characters.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {msg: 'Invalid Email Address.'}
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,99],
          msg: "Password must be at least 8 character."
        }
      }
    }
  }, {
    //hooks to hash password before the db is created. pending user, options
    hooks: {
      beforeCreate: function(pendingUser, options) {
        if (pendingUser && pendingUser.password) {
          var hash = bcrypt.hashSync(pendingUser.password, 12);
          pendingUser.password = hash;
        } //our database will have the hashed password saved. 
      }
    }
  });
  user.associate = function(models) {
    // associations can be defined here
    //images, location
  }; 
  //validate function to compare entered password to hash password. There is a bcrypt function that is used here
  user.prototype.validPassword = function(passwordTyped) {
    return bcrypt.compareSync(passwordTyped, this.password);
  };
  //function to remove password before sending the user object so the password is not sent 
  user.prototype.toJSON = function() {
    var userData = this.get();
    delete userData.password;
    return userData;
  }
  return user;
};