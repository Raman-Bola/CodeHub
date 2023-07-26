const express=require('express');
const router=express.Router({mergeParams:true});

const passport=require('passport');
const { nextTick } = require('process');

const User=require('../models/user');

const catchAsync=require('../utils/catchAsync');

router.get('/register',(req,res)=>{
    res.render('user/register');
})

router.post('/register',catchAsync(async (req,res)=>{
    try{
    const {email,username,password}=req.body;
    const user= new User({email,username});
    const registeredUSer=await User.register(user,password);
    // console.log(registeredUSer);
    req.login(registeredUSer,err=>{
        if(err) return next(err);
        req.flash('success','Welcome To CodeHub');
        res.redirect('/'); 
    })
     
    }
    catch(e){
    req.flash('error','e.message');
    res.redirect('./register');
    }
}));

router.get('/login',(req,res)=>{
    res.render('user/login');
})

router.post('/login',passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),(req,res)=>{
    req.flash('success','Welcome Back');
    const redirectUrl= req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);

})

router.get('/logout',(req,res)=>{
    req.logout((err=>{
        if(!err){
            req.flash('success', "GoodBye");
            res.redirect('/');
        }
        else return nextTick(err);

    }))
    
    
})

module.exports=router;