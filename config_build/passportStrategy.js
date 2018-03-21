'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.passportStrat = undefined;

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // Load local login strategy for passport


var env = process.env.node_env;

var passportStrat = exports.passportStrat = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(User) {
        var _this = this;

        var createUser, getUserWithEmail;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        /*****setup for persistent login sessions for passport******/
                        _passport2.default.serializeUser(function (user, done) {
                            env === 'debug' ? console.log("!!!!!!!!   SERIALIZING  !!!!!!!!!!") : null;
                            return done(null, user.id);
                        });

                        _passport2.default.deserializeUser(function () {
                            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, done) {
                                var user;
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                env === 'debug' ? console.log("!!!!!!!!   DESERIALIZING   !!!!!!!!!!") : null;
                                                _context.next = 3;
                                                return User.findOne({
                                                    where: { id: id }
                                                });

                                            case 3:
                                                user = _context.sent;
                                                return _context.abrupt('return', done(null, user));

                                            case 5:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, _this);
                            }));

                            return function (_x2, _x3) {
                                return _ref2.apply(this, arguments);
                            };
                        }());
                        /**************************************************/

                        /************** Helper Functions ******************/

                        createUser = function () {
                            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(username, email, password) {
                                var user;
                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                _context2.next = 2;
                                                return User.create({
                                                    username: username,
                                                    email: email,
                                                    password: User.generateHash(password)
                                                }).then(function (user) {
                                                    return user;
                                                });

                                            case 2:
                                                user = _context2.sent;
                                                return _context2.abrupt('return', user);

                                            case 4:
                                            case 'end':
                                                return _context2.stop();
                                        }
                                    }
                                }, _callee2, _this);
                            }));

                            return function createUser(_x4, _x5, _x6) {
                                return _ref3.apply(this, arguments);
                            };
                        }();

                        getUserWithEmail = function () {
                            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(email) {
                                var user;
                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                    while (1) {
                                        switch (_context3.prev = _context3.next) {
                                            case 0:
                                                _context3.next = 2;
                                                return User.findOne({
                                                    where: { email: email }
                                                });

                                            case 2:
                                                user = _context3.sent;
                                                return _context3.abrupt('return', user);

                                            case 4:
                                            case 'end':
                                                return _context3.stop();
                                        }
                                    }
                                }, _callee3, _this);
                            }));

                            return function getUserWithEmail(_x7) {
                                return _ref4.apply(this, arguments);
                            };
                        }();
                        /**************************************************/

                        /***********Passport Strategy Local-Join************/


                        _passport2.default.use('local-join', new _passportLocal2.default({
                            usernameField: 'email',
                            passwordField: 'password',
                            passReqToCallback: true
                        }, function (req, email, password, done) {
                            // get user with given email. If user already exists return false  
                            getUserWithEmail(email).then(function (user) {
                                env == 'debug' ? console.log("Passport local-join", user) : null;
                                if (user) {
                                    console.log("User already Exists");
                                    return done(null, false);
                                }

                                // else create and return user                    
                                createUser(req.body.username, email, req.body.password).then(function (user) {
                                    console.log("User added!");
                                    return done(null, user);
                                });
                            });
                        }));
                        /****************************************************/

                        /***********Passport Strategy Local-Login************/
                        // Logins in the user
                        _passport2.default.use('local-login', new _passportLocal2.default({
                            usernameField: 'email',
                            passwordField: 'password',
                            passReqToCallback: true
                        }, function (req, email, password, done) {
                            getUserWithEmail(email).then(function (user) {
                                if (env === 'debug') {
                                    console.log("Getting user with email:", email);
                                    console.log('Login user object', user);
                                }
                                if (!user) {
                                    return done(null, false);
                                }

                                if (!User.validPassword(password, user.password)) {
                                    console.log("Password is not valid");
                                    return done(null, false);
                                }
                                return done(null, user);
                            });
                        }));
                        return _context4.abrupt('return', _passport2.default);

                    case 7:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function passportStrat(_x) {
        return _ref.apply(this, arguments);
    };
}();
//# sourceMappingURL=passportStrategy.js.map