const express=require('express');
const router=express.Router({mergeParams:true});


const Dsa= require('../models/dsa');
const Review=require('../models/reviews');

const catchAsync=require('../utils/catchAsync');
const ExpressError=require('../utils/ExpressError');
const {validateDsa,isLoggedIn,isAuthor,isReviewAuthor}=require('../middleware');
const { cursorTo } = require('readline');

const dsas=require('../controller/dsa');

// DSA HOME
router.get('/', catchAsync(dsas.home));


//ADD ONE
router.get('/new',isLoggedIn,dsas.dsaNewForm);

 
router.post('/',isLoggedIn, catchAsync(dsas.createDsa));


// SHOW
router.get('/:id',catchAsync(dsas.showDsa));




//EDIT
router.get('/:id/edit',isAuthor, isLoggedIn, catchAsync(dsas.dsaEditForm));


router.put('/:id',isAuthor, isLoggedIn, catchAsync(dsas.dsaEdit));



//DELETE
router.delete('/:id',isLoggedIn, catchAsync(dsas.deleteDsa));


router.post('/:id/reviews',isLoggedIn, catchAsync(dsas.review));


//DELETE REVIEWS
router.delete('/:id/reviews/:reviewId',isLoggedIn,isReviewAuthor, catchAsync(dsas.deleteReview));




module.exports=router;

