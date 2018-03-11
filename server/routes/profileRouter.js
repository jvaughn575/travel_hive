/***** profileRouter.js - Profile routes *****/

export const ProfileRouter = function(router,passport,userAuthenticated){
    router.post('/profile', userAuthenticated,
    (req, res) => {         
      let paramToUpdate = Object.keys(req.body)[0];   
      
      if ( paramToUpdate === 'bioText'){
        req.user.updateAttributes({
          bioText: req.body[paramToUpdate],
        }).then(() => {                   
          res.status(200).send({message: 'Bio updated successfully!'});
        }).catch(error => {          
          res.status(406).send({message: 'Bio update failed.'});
        })
        
      }         
            
      if( paramToUpdate === "profileImg" ){
        req.user.updateAttributes({
          profileImg: req.body[paramToUpdate],
        }).then(() => {
          res.status(200).send({message:'Profile pic upload successful.'})
        }).catch(error => {
          res.status(406).send({message: 'Profile pic upload failed.'})
        })
      }  
    }
  );
  return router;

}    