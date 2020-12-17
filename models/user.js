'use strict';
const {encryptPwd} = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    postcode: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
      hooks : {
        beforeCreate(user){
          user.password = encryptPwd(user.password)
        },
      },
    sequelize,
    modelName: 'User',
  });
  return User;
};