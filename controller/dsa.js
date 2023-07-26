const Dsa= require('../models/dsa');
const Review=require('../models/reviews');

module.exports.home=async (req,res)=>{
    const {topics}= req.query;
    
    if(topics){
    //  console.log(topics);
   
     const dsa=await Dsa.find({topics} );
    //  console.log(dsa);
     res.render('dsa/dsaHome',{dsa});
    }
    else{
    const dsa= await Dsa.find({});
    // console.log(dsa);
    res.render('dsa/dsaHome',{dsa});
    }
}

module.exports.dsaNewForm=async (req,res)=>{
    
    res.render('dsa/dsaNew');
}

module.exports.createDsa=async (req,res)=>{
    console.log(req.body);
    const dsa= new Dsa(req.body.dsa);
    for(let topic of dsa.topics){
        topic.trim();
        // console.log(topic);
    }
   
    dsa.author= req.user._id;
    await dsa.save();
    req.flash('success','Successfully Done');
    res.redirect(`/dsa/${dsa._id}`);
}

module.exports.showDsa=async (req,res)=>{
    const {id}= req.params;
    const dsa= await Dsa.findById(id).populate({
        path:'reviews',
        populate:{
            path:'author'
        }
    }).populate('author');
    // console.log(dsa);
    if(!dsa){
        req.flash('error','Cannot Find');
        return res.redirect('/dsa');
    }
    res.render('dsa/dsaShow',{dsa});
}

module.exports.dsaEditForm=async (req,res)=>{
    const {id}=req.params;
    const dsa= await Dsa.findById(id);
    if(!dsa){
        req.flash('error','Cannot Find');
        return res.redirect('/dsa');
    }
     res.render('dsa/dsaEdit',{dsa});
}

module.exports.dsaEdit=async(req,res)=>{
    const {id}=req.params;
    const dsa= await Dsa.findByIdAndUpdate(id,{...req.body.dsa});
    req.flash('success','Successfully Updated');
    res.redirect(`/dsa/${dsa._id}`);
};

module.exports.deleteDsa=async (req,res)=>{
    // res.send("Made it");
    const {id}= req.params;
    await Dsa.findByIdAndDelete(id);
    res.redirect('/dsa');
}

module.exports.review=async(req,res)=>{
    const {id}=req.params;
    const dsa=await Dsa.findById(id);
    const review=new Review(req.body.review);
    review.author=req.user._id;
    dsa.reviews.push(review);
    await review.save();
    await dsa.save();
    req.flash('success','Successfully Created a Review');
    res.redirect(`/dsa/${id}`);
}

module.exports.deleteReview=async(req,res)=>{
    // res.send("Hit");

    const {id,reviewId}=req.params;
    await Dsa.findByIdAndUpdate(id,{ $pull: { reviews:reviewId }});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Successfully Deleted a Review')
    res.redirect(`/dsa/${id}`);
};