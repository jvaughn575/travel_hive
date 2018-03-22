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


// Database Connection Setup
// must manually create database in mamp with name 'travelhive_user_db'

var mysqlConnection = mysql.createConnection({ user: _config.Config.Database.user, password: _config.Config.Database.password, port: _config.Config.Database.options.port });

var connectToMysqlDB = exports.connectToMysqlDB = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new Promise(function (resolve, reject) {
              mysqlConnection.connect(function (err) {
                if (err) {
                  console.error('error connecting: ' + err.stack);
                  reject();
                }
                mysqlConnection.query('CREATE DATABASE IF NOT EXISTS ' + _config.Config.Database.name, function (error, results, fields) {
                  if (error) {
                    throw 'cant create db name';
                  }
                  mysqlConnection.changeUser({ database: _config.Config.Database.name }, function (err) {
                    if (err) throw err;
                  });
                  //db should exist now, initialize Sequelize
                  var sequalizeDB = new Sequelize(_config.Config.Database.name, _config.Config.Database.user, _config.Config.Database.password, _config.Config.Database.options);

                  sequalizeDB.authenticate().then(function () {
                    console.log('Connection has been established successfully.');
                    resolve({ sequalizeDB: sequalizeDB, mysqlConnection: mysqlConnection });
                  }).catch(function (err) {
                    console.error('Unable to connect to the database:', err);
                  });
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