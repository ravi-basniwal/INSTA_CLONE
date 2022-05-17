const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    likes:[{type:ObjectId,ref:"User"}],
    comments:[
        {text:String,postedBy:{type:ObjectId,ref:"User"}}],

    postedBy:{
      type:ObjectId,
    //   type:String,
      ref:"User"
    },
    postedBypic:{
        type:String,
        default:"https://res.cloudinary.com/team-mate/image/upload/v1650547463/c2ahc8ecctu40zyqrsmx.jpg"
    }
},{timestamps:true})
mongoose.model("Post",postSchema)