const express=require('express');
const mongoose=require('mongoose');
const app= express();
const multer  = require('multer');
const fileUpload=require('express-fileupload');

const ExpressError= require('./utils/ExpressError');

const session= require('express-session');
const flash =require('connect-flash');

const passport=require('passport');
const LocalStrategy= require('passport-local');


const Dsa= require('./models/dsa')
const User=require('./models/user');

mongoose.connect('mongodb+srv://raman22062002:Ramanbola123@cluster0.ld65bhm.mongodb.net/?retryWrites=true&w=majority')
    .then(()=>{
        console.log("Connection Open!");
    })
    .catch(err =>{
        console.log("Unable to Connect with Mongoose");
        console.log(err);
    })



const dsaRoutes=require('./routes/dsa');
const devRoutes=require('./routes/dev');
const acadRoutes=require('./routes/acad');
const userRoutes=require('./routes/user');

const ejsMate= require('ejs-mate');
const path=require('path');


app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(fileUpload());


const sessionConfig={
    secret:'SECRET',
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now()+ 1000*60*60*24*7,
        maxAge:1000*60*60*24*7
    }

}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// FOR PARSING REQUEST BODY
const methodOverride= require('method-override')
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.use((req,res,next)=>{
    // console.log(req.session);
    res.locals.currentUser=req.user;
    // console.log(req.user);
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next();
})

app.use('/dsa',dsaRoutes);
app.use('/dev',devRoutes);
app.use('/acad',acadRoutes);
app.use('/',userRoutes);


app.get('/',(req,res)=>{
    res.render('home');
})
app.get('/contactUs',(req,res)=>{
    res.render('contactUs');
})


app.all('*',(req,res,next)=>{
    next(new ExpressError('Page Not Found',404));
})

app.use((err,req,res,next)=>{
    const {statusCode= 500}=err;
    if(!err.message) err.message='Something Went Wrong'
    res.status(statusCode).render('error',{err});
})


const port=3000;
app.listen(port,()=>{ 
    console.log(`Serving on Port ${port}`);
}) 

module.exports.app=app;