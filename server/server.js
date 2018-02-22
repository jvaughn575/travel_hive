import express from 'express';
import {connectToMysqlDB} from './connectToMysqlDB';
import {UserModel} from '../models/userModel';
import {InspirationModel} from '../models/inspiration';
import {passportStrat} from '../config/passportStrategy';

export const app = express();
export const httpServer = require('http').createServer(app);
const port = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const session = require('express-session');
const env = process.env.node_env;

(async function(){
  let mysqlDB = await connectToMysqlDB();
  let userModel = await UserModel(mysqlDB.sequalizeDB);  
  let inspirationModel = await InspirationModel(mysqlDB.sequalizeDB);
  let passport = await passportStrat(userModel);

  app.use(bodyParser.json());

  // Passport requirements
  // Not secure must change before production
  app.use(session({ 
    secret: 'jk_travelhive',
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    //res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
   });

  // Router
  const router = express.Router();

  /*********Debug Logging middleware***********/
  if(env === 'debug'){
    app.use((req, res, next) => {
      const status = req.isAuthenticated() ? 'logged in' : 'logged out';
      console.log(
        'status:', status, '\n',
        req.sessionStore,
        req.sessionID,
        req.session
      );
      next();
    });

    let showRequest = (req,res,next) => {
      console.log(req.session);
      next();
    }
  }
  /****************************************** */

   /*************** Helper middleware *******************/
    const userAuthenticated = (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }
      res.sendStatus(401);
    } 
   /****************************************** */

  /*************** Routes*******************/
  router.get('/version', (req, res) => {
    res.json({ version: "1.0.0"});
  });

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
      console.log("Logging User out!");
      req.logout();
      res.send(200);
    }
  );

  /************* Profile routes ***********************/
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
  /*****************************************/   

  /************** Inspiration Routes ********************/
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

  /**************************************************** */
      
  // Register all routes with api prefix
  app.use('/api', router);
  
  /* Needed for test otherwise sequelize can't find the database tables */
  if(env === 'test'){
    mysqlDB.sequalizeDB.sync({force: false}).then(function() {      
        httpServer.listen(port, function(){
        console.log('Express api listening on port ' + port );
        app.emit('serverStarted');
      });     
    });
  /**********************************************************************/   
  } else {    
    httpServer.listen(port);
    console.log('Express api listening on port ' + port );
  }
})()
