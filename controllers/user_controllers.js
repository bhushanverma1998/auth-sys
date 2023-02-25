const User = require('../models/user');
const bcrypt = require('bcrypt');
const crypto=require("crypto");
const userMailer=require('../mailers/users_mailer');

//Render Login Page
const loginPage = (req, res) => {
    if(req.isAuthenticated()){
        req.flash('error','User is Logged in! You cannot go to login Page');
        return res.redirect('/');   
    }
    return res.render('users_login.ejs',{
        captcha:res.recaptcha
    });
}

//Render Signup Page
const signupPage = (req, res) => {
    if(req.isAuthenticated()){
        req.flash('error','User is Logged in! You cannot go to Signup Page');
        return res.redirect('/');   
    }
    return res.render('users_signup.ejs',{
        captcha:res.recaptcha
    });
}

//Authenticate login user
const login = async (req, res) => {
    try {
        req.flash('success','User successfully Logged in');
        return res.redirect('/');
    } catch (error) {
        return res.status(500).json({
            error: error,
            message: "Error while login!"
        })
    }
}

//Create new user
const signup = async (req, res) => {
    try {
        if (req.body.password == req.body.cpassword) {
            const user = await User.findOne({ email: req.body.email });
            console.log('pass matched');
            if (!user) {
                console.log('user not found in db')
                const securePass = await bcrypt.hash(req.body.password, 12);
                const newUser = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: securePass
                });
                newUser.save();
                req.flash('success','User is successfully Created. Proceed to login');
                return res.redirect('/users/login');
            }
            else{
                req.flash('error','User is Already Exists with given Email');
                return res.redirect('/users/signup');
            }
        }
        req.flash('error','Password does not match!');
        return res.redirect('back');
    } catch (error) {
        return res.status(500).json({
            error: error,
            message: "Error while login!"
        })
    }
}

//Signout user from website
const signout=(req,res)=>{
    try {
        //Predefined by passport to clear session
        req.logout(function(err){
            if(err){return next(err);}
        });
        req.flash('success','User successfully logged out');
        return res.redirect('/users/login');
    } catch (error) {
        console.log(error);
    }
}

//Reset Password 
const resetPasswordPage=async (req,res)=>{
    if(req.user){
        const user=await User.findById(req.user._id);
        user.accessToken=await crypto.randomBytes(30).toString('hex');
        user.isTokenValid=true;
        await user.save();
        return res.render('reset_password',{
            access:true,
            accessToken: user.accessToken
        })
    }else{
        return res.render('reset_password',{
            access:false
        });
    }
}

//Reset password Mail
const resetPassMail = async (req, res)=>
{
    try {
        const user=await User.findOne({email: req.body.email})

        if(user)
        {
            if(user.isTokenValid == false)
            {
                user.accessToken = crypto.randomBytes(30).toString('hex');
                user.isTokenValid = true;
                await user.save();
            }

            userMailer.resetPassword(user);

            req.flash('success', 'Password reset link sent. Please check your mail');
            return res.redirect('/');
        }
        else
        {
            req.flash('error', 'Email does not exist. try again! or create a new account');
            return res.redirect('back');
        }
    } catch (error) {
        
        console.log(error);
    }
}

//Set password page
const setPassword=async (req,res)=>{
    const user=await User.findOne({accessToken:req.params.accessToken});
    if(user && user.isTokenValid){
        return res.render('reset_password',{
            title: 'Social palace | Reset Password',
            access: true,
            accessToken: req.params.accessToken
        });
    }
    else{
        req.flash('error','Link is Expired');
        return res.redirect('/users/reset-password');
    }
}

//Updating password
const updatePassword=async(req,res)=>{
    try {
        if(req.body.newPass==req.body.confirmPass){
            const user=await User.findOne({accessToken:req.params.accessToken});
            if(user.isTokenValid!=null && user.isTokenValid==true){
                const cryptedPass=await bcrypt.hash(req.body.newPass,8);
                user.password=cryptedPass;
                user.isTokenValid=false;
                user.accessToken='sample';
                user.save();
                if(req.user){
                    req.logout(function(err){
                        if(err){return next(err);}
                    });
                }

                userMailer.resetPasswordSuccess(user);

                req.flash('success','Password is changed Successfully');
                return res.redirect('/users/login');
            }
            else{
                req.flash('error','Link is Expired!');
                return res.redirect('/users/reset-password');
            }
        }
        else{
            req.flash('error','Password does not match')
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { loginPage, login, signupPage, signup, signout, resetPasswordPage,setPassword,resetPassMail,updatePassword };