'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserModel = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = process.env.node_env;

// Model definition
var UserModel = exports.UserModel = function UserModel(sequalizeDB) {
  var User = sequalizeDB.define('user', {
    username: {
      type: _sequelize2.default.STRING
    },
    email: {
      type: _sequelize2.default.STRING,
      unique: true
    },
    password: {
      type: _sequelize2.default.STRING
    },
    profileImg: {
      type: _sequelize2.default.BLOB,
      allowNull: true
    },
    bioText: {
      type: _sequelize2.default.TEXT,
      allowNull: true
    }
  });

  // user password encryption
  User.generateHash = function (password) {
    return _bcryptNodejs2.default.hashSync(password, _bcryptNodejs2.default.genSaltSync(8), null);
  };

  // verify if password is correct
  User.validPassword = function (password, userPassword) {
    console.log("Validating Password", userPassword);
    return _bcryptNodejs2.default.compareSync(password, userPassword);
  };

  // Some mock data. If user table exist 'force' equals true will drop it first
  if (env === 'test') {
    User.sync({ force: true }).then(function () {
      // Table created
      return User.create({
        username: "Jilian Carlile",
        email: "jillian.carlile@fakeEmail.com",
        password: User.generateHash("1234password"),
        profileImg: null,
        bioText: null
      });
    });
  } else {
    User.sync({ force: false }).then(function () {});
  }

  return User;
};
//# sourceMappingURL=userModel.js.map