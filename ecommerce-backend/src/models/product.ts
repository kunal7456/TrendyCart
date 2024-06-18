import mongoose,{Schema} from "mongoose";

const productSchema=new Schema({

   name:{
    type:String,
    required:[true,"Please Enter name"],
   },

   description:{
    type:String,
    required: [true, "Please Enter product Description"],
},

   photo:{
    type:[String],
    required:[true,"Please Enter photo"],
   },

   ratings: {
    type: Number,
    default: 0,
  },

   price:{
    type:Number,
    required:[true,"Please enter Price"],
   },

   stock:{
    type:Number,
    required:[true,"Please enter Stock"],
   },

   category:{
    type:String,
    required:[true,"Please Enter Category"],
    trim:true,
   },
   numOfReviews: {
    type: Number,
    default: 0,
  },

   reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
},{
    timestamps:true,
})

export const Product=mongoose.model("Product",productSchema);