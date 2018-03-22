import Sequelize from 'sequelize';
import bcrypt from 'bcrypt-nodejs';

const env = process.env.node_env;

// Model definition
export let UserModel = function(sequalizeDB){
  const User = sequalizeDB.define('user',{
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password:{ 
      type: Sequelize.STRING,
    },
    profileImg:{
      type: Sequelize.BLOB,
      allowNull: true,
    },
    bioText:{
      type: Sequelize.TEXT,
      allowNull: true,
    }
  });  

  // user password encryption
  User.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  // verify if password is correct
  User.validPassword = (password,userPassword) => {
    console.log("Validating Password", userPassword);
    return bcrypt.compareSync(password, userPassword);
  };

  // Some mock data. If user table exist 'force' equals true will drop it first
  if( env === 'test'){
    User.sync({force:true}).then(() => {
      // Table created
       return User.create({
        username: "Jilian Carlile",
        email: "jillian.carlile@fakeEmail.com",
        password: User.generateHash("1234password"),
        profileImg: null,
        bioText: null,
      }); 
    });
  } else {
    User.sync({force:false}).then(() => {
      
    });
  } 
 
  return User
}