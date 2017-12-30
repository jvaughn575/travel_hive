// Load local login strategy for passport
import LocalStrategy from 'passport-local';
import passport from 'passport';

// Load user model
import User from '../server/models/userModel';

// setup for persistent login sessions
passport.serializeUser(function(user, done){
    return done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        return done(err, user);
    });
});

passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
},
(req, email, password, done) => {       
    User.findOne({
        where: {email : email }
        }).then(user => {
            if (user)                                        
                return done(null, false, {
                     code: 409,
                     message: 'User with supplied email already exists'
                    }); 
                
            User.create({
                username: req.body.username,
                email: email,
                password: User.generateHash(req.body.password)
            }).then((User) => {
                console.log("User added!");                
                return done(null, User, {
                    code: 200,
                    message: 'Youre registered!'
                });     
            })
                
            
        });    

}));  

passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField: 'password',
    passReqToCallback : true
},
(req, email, password, done) => {
    User.findOne({
        where: {email : email }
        }).then(user => {
            console.log("Logging in!");
            if (!user)
                return done(null, false, {
                    code: 409,
                    message: "User not found."
                });                           
                    
            if (!User.validPassword(password, user.password))
                return done(null, false, {
                    code: 400,
                    message: "Invalid user credentials."
                });

            return done(null, user, {
                code: 200,
                message: "OK"
            });    
                
            
        });    
    }));
    


export default passport;