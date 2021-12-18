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
    type: DataTypes.STRING,
    location: DataTypes.STRING,
    date: DataTypes.STRING,
    time: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'requests'
  });
  return requests;
};
