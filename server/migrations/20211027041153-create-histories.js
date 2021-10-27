'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        field: 'userId',
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      dogwalkerId: {
        type: Sequelize.INTEGER,
        field: 'dogwalkerId',
        references: {
          model: 'dogwalkers',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      service: {
        type: Sequelize.TEXT
      },
      location: {
        type: Sequelize.TEXT
      },
      date: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('histories');
  }
};
