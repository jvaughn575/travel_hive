require('babel-polyfill');

const Sequelize = require('sequelize');
let mysql = require('mysql');
import {Config} from './config/config'

let mysqlURL = process.env.OPENSHIFT_MYSQL_DB_URL || process.env.MYSQL_URL,
      mysqlURLLabel = "";

console.log("My SQL URL: ",process.env.MYSQL_URL);
/*
if(mysqlURL == null && process.env.DATABASE_SERVICE_NAME) {
  const mysqlServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
        mysqlHost = process.env[mysqlServiceName + '_SERVICE_HOST'],
        mysqlPort = process.env[mysqlServiceName + '_SERVICE_PORT'],
        mysqlDatabase = process.env[mysqlServiceName + '_DATABASE'],
        mysqlPassword = process.env[mysqlServiceName + '_PASSWORD'],
        mysqlUser = process.env[mysqlServiceName + '_USER'];

  if (mysqlHost && mysqlPort && mysqlDatabase){
    mysqlURLLabel = mysqlURL = 'mysql://';
    if (mysqlUser && mysqlPassword) {
      mysqlURL += mysqlUser + ':' + mysqlPassword + '@';
    }
    // Provide UI label that excludes user id and pw
    mysqlURLLabel += mysqlHost + ':' + mysqlPort + '/' + mysqlDatabase;
    mysqlURL += mysqlHost + ':' +  mysqlPort + '/' + Database;
  }      
}
*/

// Database Connection Setup
// must manually create database in mamp with name 'travelhive_user_db'

//var mysqlConnection = mysql.createConnection({user:Config.Database.user,password:Config.Database.password,port:Config.Database.options.port});
//console.log("Sql connection string: ",mysqlURL,mysqlURLLabel);

var mysqlConnection = "";
if(mysqlURL){
  mysqlConnection = mysql.createConnection(mysqlURL);
} else {
  mysqlConnection = mysql.createConnection({user:Config.Database.user,password:Config.Database.password,port:Config.Database.options.port});
}

export let connectToMysqlDB = async function(){
  return new Promise(function(resolve, reject) {
    mysqlConnection.connect(function(err) {
      if (err) {
        console.error('error connecting: ' );//+ err.stack);
        reject();
      }
      mysqlConnection.query(`CREATE DATABASE IF NOT EXISTS ${Config.Database.name}`, function (error, results, fields) {
        if(error){
          //throw 'cant create db name'
        }
        mysqlConnection.changeUser({database:Config.Database.name}, function(err) {
          //if (err) throw err;
        });
        
        if(!error){
          console.log("Sequelize authenticating");
          //db should exist now, initialize Sequelize
          let sequalizeDB = new Sequelize(
            Config.Database.name,
            Config.Database.user,
            Config.Database.password,
            Config.Database.options
          );

          sequalizeDB
          .authenticate()
          .then(() => {
            console.log('Connection has been established successfully.');
            resolve({sequalizeDB,mysqlConnection})
          })
          .catch(err => {
            console.error('Unable to connect to the database:'); //, err);
          });
       }
      })
    })
  })
  
};
