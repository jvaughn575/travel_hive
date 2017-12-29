const userDB = require('./userDB');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt-nodejs');


// Model definition
var User = userDB.userDB.define('user',{
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
User.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
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

module.exports = {
    User: User,
}