const express=require('express');
const router=express.Router();
const {loginPage,login,signupPage,signup,signout,resetPasswordPage, setPassword, resetPassMail, updatePassword}=require('../controllers/user_controllers');
const passport=require('passport');

const request=require('request')

const Recaptcha=require('express-recaptcha').RecaptchaV3;
const recaptcha=new Recaptcha(process.env.SITE_KEY,process.env.SECRET_KEY);

//middleware to verify recaptcha
verifyCaptcha = function(req, res, next){
    //if req body is empty or null
    if(req.body === undefined || req.body === '' || req.body === null)
    {
        req.flash('error','reCAPTCHA Incorrect');
        return res.redirect('back');
    }
  
    //secret key
    const secretKey = process.env.SECRET_KEY;
  
    //verification URL
    const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body.captcha + "&remoteip=" + req.connection.remoteAddress;
  
    //check if captcha is valid
    request(verificationURL,function(error, response, body) {
      body = JSON.parse(body);
      //If not succesful
      if(body.success !== undefined && !body.success) {
        req.flash('error','Failed captcha verification');
        return res.redirect('back');
      }
      next();
    });
  }

router.get('/login',loginPage);
router.get('/signup',signupPage);
//Use recaptcha as a middleware to authenticate
router.post('/create', recaptcha.middleware.verify = verifyCaptcha,signup);
//Use recaptcha and passport as a middleware to authenticate
router.post('/createSession',recaptcha.middleware.verify = verifyCaptcha,passport.authenticate('local',{failureRedirect:'/users/login',failureFlash:'Invalid Credentials!'}),login);
router.get('/signout',signout);

//Social Auths route
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/login'}),login);
router.get('/auth/facebook',passport.authenticate('facebook',{
    scope:['public_profile','email']
}));
router.get('/auth/facebook/callback',passport.authenticate('facebook',{failureRedirect:'/users/login'}),login);
router.get('/auth/facebook',passport.authenticate('facebook',{
    scope:['public_profile','email']
}));
router.get('/auth/facebook/callback',passport.authenticate('facebook',{failureRedirect:'/users/login'}),login);

//Reset Password Routes
router.get('/reset-password',resetPasswordPage);
router.get('/reset-password/:accessToken',setPassword);
router.post('/reset-mail',resetPassMail);
router.post('/update-password/:accessToken',updatePassword);

module.exports=router;