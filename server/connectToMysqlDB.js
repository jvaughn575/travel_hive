require('babel-polyfill');
const Sequelize = require('sequelize');
let mysql = require('mysql');
import {Config} from './config/config'

// Database Connection Setup
// must manually create database in mamp with name 'travelhive_user_db'

var mysqlConnection = mysql.createConnection({user:Config.Database.user,password:Config.Database.password,port:Config.Database.options.port});

export let connectToMysqlDB = async function(){
  return new Promise(function(resolve, reject) {
    mysqlConnection.connect(function(err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        reject();
      }
      mysqlConnection.query(`CREATE DATABASE IF NOT EXISTS ${Config.Database.name}`, function (error, results, fields) {
        if(error){
          throw 'cant create db name'
        }
        mysqlConnection.changeUser({database:Config.Database.name}, function(err) {
          if (err) throw err;
        });
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
          console.error('Unable to connect to the database:', err);
        });
      })
    });
  });
};
