'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class requests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      requests.belongsTo(models.users, {
        onDelete: 'CASCADE',
        foreignKey: 'userId'
      });
      requests.belongsTo(models.dogwalkers, {
        onDelete: 'CASCADE',
        foreignKey: 'dogwalkerId'
      });
    }
  }
  requests.init({
    userId: DataTypes.INTEGER,
    dogwalkerId: DataTypes.INTEGER,
    service: DataTypes.TEXT,
    location: DataTypes.TEXT,
    date: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'requests'
  });
  return requests;
};
