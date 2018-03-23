let Config = {}
const env = process.env.node_env;

Config.Database = {
  "name": "travelhive_development_db",
  "user": "USER",
  "password": "PASS",
  "options": {
    "host": "mysql",
    "port": "3306",
    "dialect": "mysql"
  },
  "environment": env
}

if(env === 'test'){
  Config.Database = {
    "name": "travelhive_test_db",
    "user": "root",
    "password": "root",
    "options": {
      "host": "localhost",
      "port": "3306",
      "dialect": "mysql",
      "logging" : false,
    },
    "environment": env
  }
}

export {Config};