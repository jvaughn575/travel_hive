/*import Sequelize from 'sequelize';

  export const InspirationModel = function(sequelizeDB){
    const Inspiration = sequelizeDB.define('inspiration', {
      id: {
        allowNull: false,
        primaryKey: true,
        default: Sequelize.UUIDV4,
        type: Sequelize.UUIDV4,        
      },    
      image: {
        type: Sequelize.TEXT,
      },  
      description: {
        type: Sequelize.STRING,
      }  
  });
  return Inspiration;
  } */

  import Sequelize from 'sequelize';

  const InspirationModel = function(sequelizeDB){
    const Inspiration = sequelizeDB.define('inspiration', {
      id: {
        allowNull: false,
        primaryKey: true,
        default: Sequelize.UUIDV4,
        type: Sequelize.UUIDV4,        
      },    
      image: {
        type: Sequelize.TEXT,
      },  
      description: {
        type: Sequelize.STRING,
      }  
  });
  return Inspiration;
  }

  //export default InspirationModel;