'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.httpServer = exports.app = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _connectToMysqlDB = require('./connectToMysqlDB');

var _userModel = require('../models_build/userModel');

var _inspiration = require('../models_build/inspiration');

var _passportStrategy = require('../config_build/passportStrategy');

var _logger = require('./utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _userLoginRouter = require('./routes/userLoginRouter');

var _apiVersionRouter = require('./routes/apiVersionRouter');

var _profileRouter = require('./routes/profileRouter');

var _inspirationRouter = require('./routes/inspirationRouter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/*** Routes ***/


var app = exports.app = (0, _express2.default)();
var httpServer = exports.httpServer = require('http').createServer(app);
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var session = require('express-session');
var env = process.env.node_env;

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var mysqlDB, userModel, inspirationModel, passport, router, showRequest, userAuthenticated;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _connectToMysqlDB.connectToMysqlDB)();

        case 2:
          mysqlDB = _context.sent;
          _context.next = 5;
          return (0, _userModel.UserModel)(mysqlDB.sequalizeDB);

        case 5:
          userModel = _context.sent;
          _context.next = 8;
          return (0, _inspiration.InspirationModel)(mysqlDB.sequalizeDB);

        case 8:
          inspirationModel = _context.sent;
          _context.next = 11;
          return (0, _passportStrategy.passportStrat)(userModel);

        case 11:
          passport = _context.sent;


          app.use(bodyParser.json());

          // Passport requirements
          // Not secure must change before production
          app.use(session({
            secret: 'jk_travelhive',
            resave: false,
            saveUninitialized: false
          }));
          app.use(passport.initialize());
          app.use(passport.session());

          app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Credentials', true);

            /******* Change below line to restrict to our website origin *********/
            res.header('Access-Control-Allow-Origin', req.headers.origin);
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
          });

          // Router
          router = _express2.default.Router();

          /*********Debug Logging middleware***********/

          if (env === 'debug') {
            app.use(function (req, res, next) {
              var status = req.isAuthenticated() ? 'logged in' : 'logged out';
              console.log('status:', status, '\n', req.sessionStore, req.sessionID, req.session);
              next();
            });

            showRequest = function showRequest(req, res, next) {
              console.log(req.session);
              next();
            };
          }
          /****************************************** */

          /*************** Helper middleware *******************/

          userAuthenticated = function userAuthenticated(req, res, next) {
            if (req.isAuthenticated()) {
              return next();
            }
            res.sendStatus(401);
          };
          /****************************************** */

          /*************** Routes*******************/


          app.use('/', (0, _apiVersionRouter.ApiVersionRouter)(router, passport));
          app.use('/', (0, _userLoginRouter.UserLoginRouter)(router, passport));
          app.use('/', (0, _profileRouter.ProfileRouter)(router, passport, userAuthenticated));
          app.use('/', (0, _inspirationRouter.InspirationRouter)(router, passport, inspirationModel, userAuthenticated));
          /*****************************************/

          // Register all routes with api prefix
          app.use('/api', router);

          /* Needed for test otherwise sequelize can't find the database tables */
          if (env === 'test') {
            mysqlDB.sequalizeDB.sync({ force: false }).then(function () {
              httpServer.listen(port, function () {
                console.log('Express api listening on port ' + port);
                app.emit('serverStarted');
              });
            });
            /**********************************************************************/
          } else {
            httpServer.listen(port);
            (0, _logger2.default)('Api Started', 'info');
            console.log('Express api listening on port ' + port);
          }

        case 26:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}))();
//# sourceMappingURL=server.js.map