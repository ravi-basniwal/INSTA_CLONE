const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type :String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/team-mate/image/upload/v1650547307/300-3005813_admin-user-icon-free-nickname-icon-hd-png_avasxn.jpg"
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}],
    // mypost:[{type:}]

})
mongoose.model("User",userSchema)