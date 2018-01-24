// Load local login strategy for passport
import LocalStrategy from 'passport-local';
import passport from 'passport';

const env = process.env.node_env;

export let passportStrat = async function(User){
    /*****setup for persistent login sessions for passport******/
    passport.serializeUser((user, done) => {
        env === 'debug' ? console.log("!!!!!!!!   SERIALIZING  !!!!!!!!!!") : null;
        return done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {    
        env === 'debug' ? console.log("!!!!!!!!   DESERIALIZING   !!!!!!!!!!") : null;
        const user = await User.findOne({
            where: { id : id }
            })
        return done(null, user);
    });
    /**************************************************/

    /************** Helper Functions ******************/
    const createUser = async (username, email, password) => {
        const user = await User.create({
                        username: username,
                        email: email,
                        password: User.generateHash(password)
                     }).then( user => {return user});
        return user;
            
    };

    const getUserWithEmail =  async (email) => {
        const user = await User.findOne({
            where: {email : email }
        })
        return user;
    }   
    /**************************************************/

    /***********Passport Strategy Local-Join************/
    passport.use('local-join', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    (req, email, password, done) => {     
        // get user with given email. If user already exists return false  
        getUserWithEmail(email)
            .then(user => {
                env == 'debug' ? console.log("Passport local-join",user): null;  
                if (user) {
                    console.log("User already Exists");
                    return done(null, false);    
                }    

                // else create and return user                    
                createUser(req.body.username, email, req.body.password)
                    .then(user => {          
                        console.log("User added!");                    
                        return done(null, user);   
                    });       
        });      

    }));
    /****************************************************/

    /***********Passport Strategy Local-Login************/
    // Logins in the user
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField: 'password',
        passReqToCallback : true
    },
    (req, email, password, done) => {   
            getUserWithEmail(email)
                .then(user => {
                    if( env === 'debug'){
                        console.log("Getting user with email:",email);
                        console.log('Login user object',user);
                    }
                    if (!user){
                        return done(null, false);
                    }                             
                            
                    if (!User.validPassword(password, user.password)){
                        console.log("Password is not valid");
                        return done(null, false);    
                    }
                    return done(null, user);          
                        
                });
            
    }));
    return passport;
}