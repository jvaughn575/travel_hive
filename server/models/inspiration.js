  import Sequelize from 'sequelize';

  export let InspirationModel = function(sequelizeDB){
    const Inspiration = sequelizeDB.define('inspiration', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID,        
      },    
      image: {
        type: Sequelize.TEXT,
      },  
      description: {
        type: Sequelize.STRING,
      }  
    });
    Inspiration.associate = models => {
      Inspiration.belongsTo(models.User);
    }

  return Inspiration;
  }

 