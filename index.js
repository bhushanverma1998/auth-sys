require('dotenv').config();
require('./configs/mongoose')
const express=require('express');
const app=express();
const port=process.env.PORT || 8000;
const expressLayouts=require('express-ejs-layouts');
//Used for session cookies
const session=require('express-session');
const passport=require('passport');
const cookieParser=require('cookie-parser');
const MongoStore=require('connect-mongodb-session')(session);

//Local strategy
const passportLocal=require('./configs/passport-local-strategy');
//Google strategy
const passportGoogle=require('./configs/passport-google-oauth2-strategy');
//Facebook strategy
const passportFB=require('./configs/passport-fb-strategy');

//Flash messages
const flash=require('connect-flash');
const customMware=require('./configs/middleware')

//Extraction style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//Setting view Engine
app.set('view engine','ejs');
app.set('views','./views');

//Setting session
app.use(session({
    name:'authentication-system',
    secret: process.env.SECRET_SESSION_KEY,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*1000)
    },
    store:new MongoStore({
            uri:process.env.MONGO_URI,
            autoRemove:'disabled'
    },function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}))

//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

//Use Layout for view Engine
app.use(expressLayouts);
//folder to look out for static files
app.use(express.static('./assets'));


//Initialize passport authentication and session
app.use(passport.initialize());
app.use(passport.session());


//If user logged in set Authentication field in cookies
app.use(passport.setAuthenticatedUser);

//flash message. It should be after passport session
app.use(flash());
app.use(customMware.setFlash);

//Routes
app.use('/',require('./routes/index'));

app.listen(port,()=>{
    console.log(`App is listening at PORT ${port}`)
});