"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Config = {};
var env = process.env.node_env;

Config.Database = {
  "name": "travelhive_development_db",
  "user": "root",
  "password": "root",
  "options": {
    "host": "localhost",
    "port": "3306",
    "dialect": "mysql"
  },
  "environment": env
};

if (env === 'test') {
  Config.Database = {
    "name": "travelhive_test_db",
    "user": "root",
    "password": "root",
    "options": {
      "host": "localhost",
      "port": "3306",
      "dialect": "mysql",
      "logging": false
    },
    "environment": env
  };
}

exports.Config = Config;