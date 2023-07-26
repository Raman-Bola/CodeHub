const mongoose = require('mongoose');
const { Schema } = mongoose;

const acadSchema = new Schema({
  title:{
    type:String,
    required:true
  },
  topics:{
    type:[String],
    required:true
  },
  description:{
    type:String
  },
  link:String,
  author:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
  ]
});

const Acad= mongoose.model('Acad', acadSchema);


// acadSchema.virtual('properties.popUpMarkup').get(function(){
//     return `
//         <strong><a href="/acad/${this._id}">${this.title}</a></strong>
//         <p>${this.description.substring(0,20)}...</p>
//         `
// });

acadSchema.post('findOneAndDelete',async function (doc){
    // console.log("deleted");
    if(doc){
        await Review.deleteMany({
            _id:{
                $in:doc.reviews
            }
        })
    }
})


module.exports=Acad;

