const {dsaSchema,reviewSchema,devSchema,acadSchema}=require('./schemas');
const ExpressError=require('./utils/ExpressError');



const Dsa= require('./models/dsa');
const Dev= require('./models/dev');
const Review= require('./models/reviews');
const Acad=require('./models/acad');


module.exports.validateDsa=(req,res,next)=>{
     const {error}=dsaSchema.validate(req.body);
     console.log(error);
    if(error){
        const msg= error.details.map(el=> el.message).join(',');
        throw new ExpressError(msg,400);
    }
    else{
        next();
    }
}
module.exports.validateDev=(req,res,next)=>{
     const {error}=devSchema.validate(req.body);
     console.log(error);
    if(error){
        const msg= error.details.map(el=> el.message).join(',');
        throw new ExpressError(msg,400);
    }
    else{
        next();
    }
}

module.exports.validateAcad=(req,res,next)=>{
     const {error}=acadSchema.validate(req.body);
     console.log(error);
    if(error){
        const msg= error.details.map(el=> el.message).join(',');
        throw new ExpressError(msg,400);
    }
    else{
        next();
    }
}

module.exports.isLoggedIn= (req,res,next)=>{

    if(!req.isAuthenticated()){
        req.session.returnTo=req.originalUrl;
        req.flash('error','You must be Signed In');
        return res.redirect('/login');
    }
    next();
}

module.exports.isAuthor= async(req,res,next)=>{
    const id=req.params.id;
    const dsa= await Dsa.findById(id);
    if(!dsa.author.equals(req.user._id) && !dsa.author.username=='Raman'){
        req.flash('error','You dont have permission to do that');
        return res.redirect(`/dsa/${id}`);
    }
    next();

}
module.exports.isAuthorDev= async(req,res,next)=>{
    const id=req.params.id;
    const dev= await Dev.findById(id);
    if(!dev.author.equals(req.user._id) && !dev.author.username=='Raman'){
        req.flash('error','You dont have permission to do that');
        return res.redirect(`/dev/${id}`);
    }
    next();
}

module.exports.isAuthorAcad= async(req,res,next)=>{
    const id=req.params.id;
    const acad= await Acad.findById(id);
    if(!acad.author.equals(req.user._id) && !acad.author.username=='Raman'){
        req.flash('error','You dont have permission to do that');
        return res.redirect(`/acad/${id}`);
    }
    next();

}

module.exports.isReviewAuthor= async(req,res,next)=>{
    const {id,reviewId}=req.params;
    const review= await Review.findById(reviewId);
    if(!review.author.equals(req.user._id) && !review.author.username=='Raman'){
        req.flash('error','You dont have permission to do that');
        return res.redirect('/');
    }
    next();

}