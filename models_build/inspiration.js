'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InspirationModel = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InspirationModel = exports.InspirationModel = function InspirationModel(sequelizeDB) {
  var Inspiration = sequelizeDB.define('inspiration', {
    id: {
      allowNull: false,
      primaryKey: true,
      defaultValue: _sequelize2.default.UUIDV4,
      type: _sequelize2.default.UUID
    },
    image: {
      type: _sequelize2.default.TEXT
    },
    description: {
      type: _sequelize2.default.STRING
    },
    userId: {
      type: _sequelize2.default.UUID,
      allowNull: false
    }
  });
  Inspiration.associate = function (models) {
    Inspiration.belongsTo(models.User);
  };

  return Inspiration;
};
//# sourceMappingURL=inspiration.js.map