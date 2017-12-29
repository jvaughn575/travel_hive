// Load local login strategy for passport
const LocalStrategy = require('passport-local').Strategy;

// Load user model
const User = require('../server/models/userModel').User;

module.exports = function(passport) {

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
        //console.log(User);    
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
    
};