'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [      
      await queryInterface.changeColumn('Users', 'profileImg', {        
        type: Sequelize.TEXT('medium'),
        allowNull: true,        
      }),      
      
    ]
    
  },
  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.changeColumn('Users', 'profileImg', {        
        type: Sequelize.BLOB(),
        allowNull: true,
      }),     
           
    ]  
  }    
};