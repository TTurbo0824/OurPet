'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dogwalkers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      dogwalkers.hasMany(models.requests, {
        foreignKey: 'dogwalkerId'
      });
      dogwalkers.hasMany(models.histories, {
        foreignKey: 'dogwalkerId'
      });
    }
  }
  dogwalkers.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    location: DataTypes.TEXT,
    tags: DataTypes.TEXT,
    charges: DataTypes.TEXT,
    certified: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'dogwalkers'
  });
  return dogwalkers;
};
