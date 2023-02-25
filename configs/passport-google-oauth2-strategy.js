const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

//Passport to use strategy of google Oauth2
passport.use(new googleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.GOOGLE_CALLBACK_URL,
    },
    function(accessToken,refreshToken,profile,done){
        //Find user
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in google strategy-passport',err); return;};

            if(user){
                //If found set this user as req.user
                return done(null,user);
            }else{
                //If not found, create user and set as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){console.log('error in creating user',err); return;};

                    return done(null,user);
                })
            }
        })
    }
))

module.exports=passport;