import express from 'express';
import {connectToMysqlDB} from './connectToMysqlDB';
import {UserModel} from '../models/userModel';
import {InspirationModel} from '../models/inspiration';
import {passportStrat} from '../config/passportStrategy';
import logger from './utils/logger';

/*** Routes ***/
import {UserLoginRouter} from './routes/userLoginRouter';
import {ApiVersionRouter} from './routes/apiVersionRouter';
import {ProfileRouter} from './routes/profileRouter';
import {InspirationRouter} from './routes/inspirationRouter';

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
    
    /******* Change below line to restrict to our website origin *********/
    res.header('Access-Control-Allow-Origin', req.headers.origin);    
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
  app.use('/',ApiVersionRouter(router,passport));
  app.use('/',UserLoginRouter(router,passport));
  app.use('/',ProfileRouter(router, passport,userAuthenticated));
  app.use('/',InspirationRouter(router, passport, inspirationModel, userAuthenticated));
  /*****************************************/
      
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
    logger('Api Started','info');    
    console.log('Express api listening on port ' + port );
  }
})()
