const mongoose = require('mongoose');
const { Schema } = mongoose;

const devSchema = new Schema({
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

const Dev = mongoose.model('Dev', devSchema);

devSchema.post('findOneAndDelete',async function (doc){
    // console.log("deleted");
    if(doc){
        await Review.deleteMany({
            _id:{
                $in:doc.reviews
            }
        })
    }
})


module.exports=Dev;

