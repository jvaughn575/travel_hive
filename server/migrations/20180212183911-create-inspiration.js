'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Inspirations', {      
      id: {
        allowNull: false,
        primaryKey: true,
        type:Sequelize.UUID,
        default: Sequelize.UUIDV4
      },     
      image: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Inspirations');
  }
};