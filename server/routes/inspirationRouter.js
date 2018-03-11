/***** inspirationRouter.js - Inspiration routes *****/

export const InspirationRouter = function(router,passport,inspirationModel,userAuthenticated){
    router.post('/inspiration', userAuthenticated,
        (req, res) => {     
        inspirationModel.create({userId: req.user.id, image: req.body.image, description: req.body.description})      
        .then((inspiration) => {          
            res.status(200).send({message: 'Inspiration successfully saved!'})        
        }).catch(error => {
            console.log(error);
            res.status(406).send({message: 'Inspiration was not saved!'})
        })
        }
    ); 

    router.get('/inspiration', userAuthenticated,
        (req, res) => {
            inspirationModel
            .findAndCountAll({
                attributes: ['id','image','description'],
                where: {
                userId: req.user.id
                }
            }).then(result => {
                res.status(200).json({inspirations: result.rows});
            }).catch(error => {
                res.status(400).send({message:'Bad Request. Inspirations not sent!'})
            });      
        }
    );
    return router;
}    