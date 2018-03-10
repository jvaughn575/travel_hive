/***** userLoginRouter.js - User Login/Logout routes *****/

export const UserLoginRouter = function(router,passport){
  router.get('/loggedIn', (req,res) => {
      res.json({ loggedIn: req.isAuthenticated() });
    });

    router.post('/join', passport.authenticate('local-join'), 
      (req,res) => {
        res.json({                  
          message: "join",
          user: req.user.username                                
        });
      }
    );      
        
    router.post('/login', passport.authenticate('local-login'),     
      (req, res) => {            
        res.json({                   
          message: "login",
          user: req.user.username,
          bioText: req.user.bioText,
          profileImage: req.user.profileImg,        
        });
      }   
    );    

    router.get('/logout', 
      (req, res) => {      
        logger("Logging User out!","info");
        req.logout();
        res.send(200);
      }
    );
    return router;
}