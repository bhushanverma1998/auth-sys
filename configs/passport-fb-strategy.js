const passport=require('passport');
const FacebookStrategy=require('passport-facebook').Strategy;
const crypto=require('crypto');
const User=require('../models/user');

passport.use(new FacebookStrategy({
    clientID: process.env.FB_CID,
    clientSecret: process.env.FB_CS,
    callbackURL: process.env.FB_CALLBACK_URL,
    profileFields:['emails','name']
  },
  function(accessToken, refreshToken, profile, done) {
    //Find user
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){console.log('error in facebook strategy-passport',err); return;};

        if(user){
            //If found set this user as req.user
            return done(null,user);
        }else{
            //If not found, create user and set as req.user
            User.create({
                name:profile.name.givenName+' '+profile.name.familyName,
                email:profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){console.log('error in creating user',err); return;};

                return done(null,user);
            })
        }
    })
  }
));

module.exports=passport;