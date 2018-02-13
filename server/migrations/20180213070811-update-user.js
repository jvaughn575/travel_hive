'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [      
      await queryInterface.changeColumn('Users', 'profileImg', {        
        type: Sequelize.TEXT('medium'),
        allowNull: true,        
      }),
      
      await queryInterface.changeColumn('Users','id', {
        type: Sequelize.UUID,
        default: Sequelize.UUIDV4
      }),
      
    ]
    
  },
  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.changeColumn('Users', 'profileImg', {        
        type: Sequelize.BLOB(),
        allowNull: true,
      }),

      await queryInterface.changeColumn('Users', 'id', {
        type: Sequelize.INTEGER,
        autoincrement: true
      }),
           
    ]  
  }    
};