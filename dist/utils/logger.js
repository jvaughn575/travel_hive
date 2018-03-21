'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

_winston2.default.configure({
    transports: [new _winston2.default.transports.File({ filename: './server/utils/api.log' }), new _winston2.default.transports.Console()]
});

function logger(args, level) {
    _winston2.default[level].apply(_winston2.default, _toConsumableArray(args));
}

exports.default = logger;
//# sourceMappingURL=logger.js.map