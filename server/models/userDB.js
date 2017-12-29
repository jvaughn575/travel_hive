// Database Connection Setup
// must manually create database in mamp with name 'travelhive_user_db'
const Sequelize = require('sequelize');
const config = require('config');
const dbConfig = config.get('Database.dbConfig');
const userDB = new Sequelize(dbConfig.name, 
                               dbConfig.user, 
                               dbConfig.pswd,
                               dbConfig.options);

// Authenticate and connect to database running on localhost:3306
userDB
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        

    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);    
    });

module.exports = {
    userDB: userDB,
    
    
}