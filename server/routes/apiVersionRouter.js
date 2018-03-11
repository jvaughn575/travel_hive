/***** inspirationRouter.js - Inspiration routes *****/

export const ApiVersionRouter = function(router,passport){
    router.get('/version', (req, res) => {
        res.json({ version: "1.0.0"});
    });
    return router;
}