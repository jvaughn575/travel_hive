import Sequelize from 'sequelize';
import bcrypt from 'bcrypt-nodejs';

// Model definition
export let UserModel = function(sequalizeDB){
  const User = sequalizeDB.define('user',{
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
    },
    password:{ 
      type: Sequelize.STRING,
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
  User.sync({force:true}).then(() => {
    // Table created
    return User.create({
      username: "Jilian Carlile",
      email: "jillian.carlile@fakeEmail.com",
      password: User.generateHash("1234password")
    });
  });
  return User
}