const express=require('express');
const router=express.Router({mergeParams:true});


const Dev= require('../models/dev');
const Review=require('../models/reviews');

const catchAsync=require('../utils/catchAsync');
const ExpressError=require('../utils/ExpressError');
const {validateDev,isLoggedIn,isAuthorDev,isReviewAuthor}=require('../middleware');
const { cursorTo } = require('readline');

// DEV HOME
router.get('/', catchAsync(async (req,res)=>{
    const {topics}= req.query;
 
    if(topics){
    //  console.log(topics);
     const dev=await Dev.find({topics} );
    //  console.log(dev);
     res.render('dev/devHome',{dev});
    }
    else{
    const dev= await Dev.find({});
    // console.log(dsa);
    res.render('dev/devHome',{dev});
    }
    
}));


//ADD ONE
router.get('/new',isLoggedIn,async (req,res)=>{
    
    res.render('dev/devNew');
})
 
router.post('/',isLoggedIn, catchAsync(async (req,res)=>{
    // console.log(req.body.dev);
    const dev= new Dev(req.body.dev);
    for(let topic of dev.topics){
        topic.trim();
        // console.log(topic);
    }
    dev.author= req.user._id;
    await dev.save();
    req.flash('success','Successfully Done');
    res.redirect(`/dev/${dev._id}`);
}));


// SHOW
router.get('/:id',catchAsync(async (req,res)=>{
    const {id}= req.params;
    const dev= await Dev.findById(id).populate({
        path:'reviews',
        populate:{
            path:'author'
        }
    }).populate('author');
    // console.log(dev);
    if(!dev){
        req.flash('error','Cannot Find');
        return res.redirect('/dev');
    }
    res.render('dev/devShow',{dev});
}));


//EDIT
router.get('/:id/edit',isAuthorDev, isLoggedIn, catchAsync(async (req,res)=>{
    const {id}=req.params;
    const dev= await Dev.findById(id);
    if(!dev){
        req.flash('error','Cannot Find');
        return res.redirect('/dev');
    }
     res.render('dev/devEdit',{dev});
}));

router.put('/:id',isAuthorDev, isLoggedIn, catchAsync(async(req,res)=>{
    const {id}=req.params;
    const dev= await Dev.findByIdAndUpdate(id,{...req.body.dev});
    // console.log(dev);
    req.flash('success','Successfully Updated');
    res.redirect(`/dev/${dev._id}`);
}));


//DELETE
router.delete('/:id',isLoggedIn, catchAsync(async (req,res)=>{
    // res.send("Made it");
    const {id}= req.params;
    await Dev.findByIdAndDelete(id);
    res.redirect('/dev');
}));

router.post('/:id/reviews',isLoggedIn, catchAsync(async(req,res)=>{
    const {id}=req.params;
    const dev=await Dev.findById(id);
    const review=new Review(req.body.review);
    review.author=req.user._id;
    dev.reviews.push(review);
    // console.log(dev);
    await review.save();
    await dev.save();
    req.flash('success','Successfully Created a Review');
    res.redirect(`/dev/${id}`);
}));

//DELETE REVIEWS
router.delete('/:id/reviews/:reviewId',isLoggedIn,isReviewAuthor, catchAsync( async(req,res)=>{
    // res.send("Hit");
    const {id,reviewId}=req.params;
    await Dev.findByIdAndUpdate(id,{ $pull: { reviews:reviewId }});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Successfully Deleted a Review')
    res.redirect(`/dev/${id}`);
}));



module.exports=router;

