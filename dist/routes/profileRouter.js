'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/***** profileRouter.js - Profile routes *****/

var ProfileRouter = exports.ProfileRouter = function ProfileRouter(router, passport, userAuthenticated) {
  router.post('/profile', userAuthenticated, function (req, res) {
    var paramToUpdate = Object.keys(req.body)[0];

    if (paramToUpdate === 'bioText') {
      req.user.updateAttributes({
        bioText: req.body[paramToUpdate]
      }).then(function () {
        res.status(200).send({ message: 'Bio updated successfully!' });
      }).catch(function (error) {
        res.status(406).send({ message: 'Bio update failed.' });
      });
    }

    if (paramToUpdate === "profileImg") {
      req.user.updateAttributes({
        profileImg: req.body[paramToUpdate]
      }).then(function () {
        res.status(200).send({ message: 'Profile pic upload successful.' });
      }).catch(function (error) {
        res.status(406).send({ message: 'Profile pic upload failed.' });
      });
    }
  });
  return router;
};