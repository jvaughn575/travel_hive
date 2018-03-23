'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectToMysqlDB = undefined;

var _config = require('./config/config');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('babel-polyfill');

var Sequelize = require('sequelize');
var mysql = require('mysql');


var mysqlURL = process.env.OPENSHIFT_MYSQL_DB_URL || process.env.MYSQL_URL,
    mysqlURLLabel = "";

console.log("My SQL URL: ", process.env.MYSQL_URL);
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
if (mysqlURL) {
  mysqlConnection = mysql.createConnection(mysqlURL);
} else {
  mysqlConnection = mysql.createConnection({ user: _config.Config.Database.user, password: _config.Config.Database.password, port: _config.Config.Database.options.port });
}

var connectToMysqlDB = exports.connectToMysqlDB = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new Promise(function (resolve, reject) {
              mysqlConnection.connect(function (err) {
                if (err) {
                  console.error('error connecting: '); //+ err.stack);
                  reject();
                }
                mysqlConnection.query('CREATE DATABASE IF NOT EXISTS ' + _config.Config.Database.name, function (error, results, fields) {
                  if (error) {
                    //throw 'cant create db name'
                  }
                  mysqlConnection.changeUser({ database: _config.Config.Database.name }, function (err) {
                    //if (err) throw err;
                  });

                  if (!error) {
                    console.log("Sequelize authenticating");
                    //db should exist now, initialize Sequelize
                    var sequalizeDB = new Sequelize(_config.Config.Database.name, _config.Config.Database.user, _config.Config.Database.password, _config.Config.Database.options);

                    sequalizeDB.authenticate().then(function () {
                      console.log('Connection has been established successfully.');
                      resolve({ sequalizeDB: sequalizeDB, mysqlConnection: mysqlConnection });
                    }).catch(function (err) {
                      console.error('Unable to connect to the database:'); //, err);
                    });
                  }
                });
              });
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function connectToMysqlDB() {
    return _ref.apply(this, arguments);
  };
}();