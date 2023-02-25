const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');
const bcrypt=require('bcrypt');

passport.use(new LocalStrategy({
    usernameField:'email'
},
async (email,password,done)=>{
    //Find a user and establish th identity
    try {
        const user=await User.findOne({email:email});
        if(!user){
            return done(null,false);
        }
        const compare=await bcrypt.compare(password,user.password);
        if(!compare){
            return done(null,false);
        }
        return done(null,user);
    } catch (error) {
        return done(error);
    }
}
));

//Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})
//Deserializing the user from the key in the cookies
passport.deserializeUser(async (id,done)=>{
    try {
        const user = await User.findById(id);
        return done(null, user);
    } catch (error) {
        return done(error)
    }
});

//check if the user is authenticated
passport.checkAuthentication=function(req,res,next){
    //If the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //If the user is not signed in
    return res.redirect('/users/login');
}

//
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;