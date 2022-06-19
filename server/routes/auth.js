const express=require('express')
const router =express.Router()
const mongoose=require('mongoose')
const User=mongoose.model("User")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../config/keys')
const requireLogin=require("../middleware/requireLogin")
// const nodemailer = require('nodemailer')
// const sendgridTransposrt = require('nodemailer-sendgrid-transport')
// router.get('/protected',requireLogin,(req,res)=>{
//   res.send("hello user")
// })
// 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
// const transporter = nodemailer.createTransport(sendgridTransposrt({
//   auth:{
//     api_key:"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"
//   }
// }))
router.post('/signup',(req,res)=>{
 const {name,email,password,pic} = req.body
 if(!email || !password  || !name)
 {
   return res.status(422).json({error:"Please Fill all the fields"})
 }
//  res.json({message:"successful sent"})
  User.findOne({email:email})
  .then((savedUser)=>{
    if(savedUser)
    {
      return res.status(422).json({error:"user already exists with that email"})
    }
    bcrypt.hash(password,10)
    .then(hashedpassword=>{
      const user=new User({
        email,
        password:hashedpassword,
        name,
        pic
      })
      user.save()
      .then(user=>{
        // transporter.sendMail({
        //   to:user.email,
        //   from:"no.reply.instagraph@gmail.com",
        //   subject:"signup success",
        //   html:"<h1> InstaGraph </h1>"
        // })
        res.json({message:"saved successful"})
      })
      .catch(err=>{
        console.log(err)
      })
    })
    
  })
  .catch(err=>{
    console.log(err)
  })
  
})
router.post('/signin',(req,res)=>{
  const {email,password}=req.body
  if(!email || !password){
    return res.status(422).json({error:"please fill all field"})
  }
  User.findOne({email:email})
  .then(savedUser=>{
    if(!savedUser)
    {
     return  res.status(422).json({error:"Invalid username or password"})
    }
    bcrypt.compare(password,savedUser.password)
    .then(doMatch=>{
      if(doMatch)
      {
        //  res.json({message:"successfully signed in "})
        const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
        const {_id,name,email,followers,following,pic}=savedUser
        res.json({token,user:{_id,name,email,followers,following,pic}})
      }
      else 
      {
        return  res.status(422).json({error:"Invalid username or password"})
      }
    })
    .catch(err=>{
      console.log(err)
    })
  })
})
module.exports=router
