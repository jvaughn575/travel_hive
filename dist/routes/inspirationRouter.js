'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/***** inspirationRouter.js - Inspiration routes *****/

var InspirationRouter = exports.InspirationRouter = function InspirationRouter(router, passport, inspirationModel, userAuthenticated) {
    router.post('/inspiration', userAuthenticated, function (req, res) {
        inspirationModel.create({ userId: req.user.id, image: req.body.image, description: req.body.description }).then(function (inspiration) {
            res.status(200).send({ message: 'Inspiration successfully saved!' });
        }).catch(function (error) {
            console.log(error);
            res.status(406).send({ message: 'Inspiration was not saved!' });
        });
    });

    router.get('/inspiration', userAuthenticated, function (req, res) {
        inspirationModel.findAndCountAll({
            attributes: ['id', 'image', 'description'],
            where: {
                userId: req.user.id
            }
        }).then(function (result) {
            res.status(200).json({ inspirations: result.rows });
        }).catch(function (error) {
            res.status(400).send({ message: 'Bad Request. Inspirations not sent!' });
        });
    });
    return router;
};