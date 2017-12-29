// Load local login strategy for passport
import LocalStrategy from 'passport-local';
import passport from 'passport';

// Load user model
import User from '../server/models/userModel';

// setup for persistent login sessions
passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
},
function(req, email, password, done) {       
    User.findOne({
        where: {email : email }
        }).then(user => {
            if (user){
                return done(null, false, req.flash('signupMessage', 'That email is already in use.'));
            } else {                    
                    
                User.create({
                    username: req.body.username,
                    email: email,
                    password: User.generateHash(req.body.password)
                });    
            }
        });             
        return done(null, User); 
    

}));  

export default passport;