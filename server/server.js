
import express from 'express';
import passport from '../config/passportStrategy';

const app = express();
const port = process.env.PORT || 3001;

const flash = require('connect-flash')

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Passport requirements
// Not secure must change before production
app.use(session({ secret: 'jk_travelhive'}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Router
const router = express.Router();

// Routes
router.get('/version', function(req, res){
    res.json({ version: "1.0.0"});
});

router.post('/join', 
    passport.authenticate('local-signup'),
    function(req, res) {
        res.json({
            code: "200"
            
        });
    
    });  

// Register all routes with api prefix
app.use('/api', router);

app.listen(port);
console.log('Express api listening on port ' + port);