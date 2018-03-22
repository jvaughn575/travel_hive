"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/***** inspirationRouter.js - Inspiration routes *****/

var ApiVersionRouter = exports.ApiVersionRouter = function ApiVersionRouter(router, passport) {
    router.get('/version', function (req, res) {
        res.json({ version: "1.0.0" });
    });
    return router;
};