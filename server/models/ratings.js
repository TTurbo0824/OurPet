'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ratings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      ratings.belongsTo(models.histories, {
        onDelete: 'CASCADE',
        foreignKey: 'historyId'
      });
    }
  }
  ratings.init({
    historyId: DataTypes.INTEGER,
    historyIndex: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ratings'
  });
  return ratings;
};
