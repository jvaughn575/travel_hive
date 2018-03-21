'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/***** userLoginRouter.js - User Login/Logout routes *****/

var UserLoginRouter = exports.UserLoginRouter = function UserLoginRouter(router, passport) {
  router.get('/loggedIn', function (req, res) {
    res.json({ loggedIn: req.isAuthenticated() });
  });

  router.post('/join', passport.authenticate('local-join'), function (req, res) {
    res.json({
      message: "join",
      user: req.user.username
    });
  });

  router.post('/login', passport.authenticate('local-login'), function (req, res) {
    res.json({
      message: "login",
      user: req.user.username,
      bioText: req.user.bioText,
      profileImage: req.user.profileImg
    });
  });

  router.get('/logout', function (req, res) {
    logger("Logging User out!", "info");
    req.logout();
    res.send(200);
  });
  return router;
};
//# sourceMappingURL=userLoginRouter.js.map