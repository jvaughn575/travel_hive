
import express from 'express';
import passport from '../config/passportStrategy';

const app = express();
const port = process.env.PORT || 3001;

const bodyParser = require('body-parser');
const session = require('express-session');

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
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
 });

// Router
const router = express.Router();

/*********Debug Logging middleware***********/
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
                isLoggedIn: req.isAuthenticated()
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
/*****************************************/   
    
// Register all routes with api prefix
app.use('/api', router);

app.listen(port);
console.log('Express api listening on port ' + port);