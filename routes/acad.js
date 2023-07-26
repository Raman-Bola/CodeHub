const express=require('express');
const router=express.Router({mergeParams:true});
const fileUpload=require('express-fileupload');


const Acad= require('../models/acad');
const Review=require('../models/reviews');

const catchAsync=require('../utils/catchAsync');
const ExpressError=require('../utils/ExpressError');
const {validateAcad,isLoggedIn,isAuthorAcad,isReviewAuthor}=require('../middleware');
const { cursorTo } = require('readline');

// Acad HOME
router.get('/', catchAsync(async (req,res)=>{
    const {topics}= req.query;
 
    if(topics){
    //  console.log(topics);
     const acad=await Acad.find({topics} );
    //  console.log(Acad);
     res.render('acad/acadHome',{acad});
    }
    else{
    const acad= await Acad.find({});
    // console.log(dsa);
    res.render('acad/acadHome',{acad});
    }
    
}));


//ADD ONE
router.get('/new',isLoggedIn,async (req,res)=>{
    
    res.render('acad/acadNew');
})
 
router.post('/',isLoggedIn, catchAsync(async (req,res)=>{
    // console.log(req.body.acad);
    const acad= new Acad(req.body.acad);
    for(let topic of acad.topics){
        topic.trim();
        // console.log(topic);
    }
    acad.author= req.user._id;
    await acad.save();
    req.flash('success','Successfully Done');
    res.redirect(`/acad/${acad._id}`);
}));


// SHOW
router.get('/:id',catchAsync(async (req,res)=>{
    const {id}= req.params;
    const acad= await Acad.findById(id).populate({
        path:'reviews',
        populate:{
            path:'author'
        }
    }).populate('author');
    // console.log(acad);
    if(!acad){
        req.flash('error','Cannot Find');
        return res.redirect('/acad');
    }
    res.render('acad/acadShow',{acad});
}));


//EDIT
router.get('/:id/edit',isAuthorAcad, isLoggedIn, catchAsync(async (req,res)=>{
    const {id}=req.params;
    const acad= await Acad.findById(id);
    if(!acad){
        req.flash('error','Cannot Find');
        return res.redirect('/acad');
    }
     res.render('acad/acadEdit',{acad});
}));

router.put('/:id',isAuthorAcad, isLoggedIn, catchAsync(async(req,res)=>{
    const {id}=req.params;
    const acad= await Acad.findByIdAndUpdate(id,{...req.body.acad});
    req.flash('success','Successfully Updated');
    res.redirect(`/acad/${acad._id}`);
}));


//DELETE
router.delete('/:id',isLoggedIn, catchAsync(async (req,res)=>{
    // res.send("Made it");
    const {id}= req.params;
    await Acad.findByIdAndDelete(id);
    res.redirect('/acad');
}));

router.post('/:id/reviews',isLoggedIn, catchAsync(async(req,res)=>{
    const {id}=req.params;
    const acad=await Acad.findById(id);
    const review=new Review(req.body.review);
    review.author=req.user._id;
    acad.reviews.push(review);
    // console.log(Acad);
    await review.save();
    await acad.save();
    req.flash('success','Successfully Created a Review');
    res.redirect(`/acad/${id}`);
}));

//DELETE REVIEWS
router.delete('/:id/reviews/:reviewId',isLoggedIn,isReviewAuthor, catchAsync( async(req,res)=>{
    // res.send("Hit");
    const {id,reviewId}=req.params;
    await Acad.findByIdAndUpdate(id,{ $pull: { reviews:reviewId }});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Successfully Deleted a Review')
    res.redirect(`/acad/${id}`);
}));



module.exports=router;

