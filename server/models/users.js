'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      users.hasMany(models.requests, {
        foreignKey: 'userId'
      });
      users.hasMany(models.histories, {
        foreignKey: 'userId'
      });
    }
  }
  users.init({
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    salt: DataTypes.TEXT,
    password: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'users'
  });
  return users;
};
