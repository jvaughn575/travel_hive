let Config = {}

console.log("Database Environment: ",process.env.node_env);

const env = process.env.node_env;

if(env === 'development'){
  Config.Database = {
    "name": "travelhive_development_db",
    "user": "root",
    "password": "root",
    "options": {
      "host": "localhost",
      "port": "3306",
      "dialect": "mysql"
    }
  }
} else if (env === 'test'){
  Config.Database = {
    "name": "travelhive_test_db",
    "user": "root",
    "password": "root",
    "options": {
      "host": "localhost",
      "port": "3306",
      "dialect": "mysql",
      "logging" : false,
    }
  }
}

export {Config};