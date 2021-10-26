'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class histories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  histories.init({
    userId: DataTypes.INTEGER,
    dogwalkerId: DataTypes.INTEGER,
    service: DataTypes.TEXT,
    location: DataTypes.TEXT,
    date: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'histories',
  });
  return histories;
};