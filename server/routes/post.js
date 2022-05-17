const express=require('express')
const router =express.Router()
const mongoose=require('mongoose')
const requireLogin =require("../middleware/requireLogin")
const Post = mongoose.model('Post')
router.get('/allpost',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name pic ")
    .populate("comments.postedBy","_id name pic ")
    .sort('-createdAt')
    .then(posts=>{
        // console.log(posts)
        res.json({posts})

    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/getsubpost',requireLogin,(req,res)=>{
    Post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name pic ")
    .populate("comments.postedBy","_id name pic ")
    .sort('-createdAt')
    .then(posts=>{
        // console.log(posts)
        res.json({posts})

    })
    .catch(err=>{
        console.log(err)
    })
})
router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body,pic}=req.body
    if(!title || !body  || !pic )
    {
        return res.status(422).json({error:"Please filled all fields"})

    }
    
    req.user.password=undefined
    const post=new Post({
        title,
        body,
        photo:pic,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name pic ")
    .populate("comments.postedBy","_id name pic ")
    .then(mypost=>{
        
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})
// router.get('/myfu',requireLogin,(req,res)=>{
//     Post.find({postedBy:req.user._id})
//     .populate("postedBy","_id name")
//     .populate("comments.postedBy","_id name")
//     .then(mypost=>{
        
//         res.json({mypost})
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })


router.put('/like',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).populate("postedBy","_id name pic ")
    .populate("comments.postedBy","_id name pic ")
    .exec((err,result)=>{
        if(err)
        {
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})
router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).populate("postedBy","_id name pic ")
    .populate("comments.postedBy","_id name pic ")
    .exec((err,result)=>{
        if(err)
        {
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})
router.put('/comments',requireLogin,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    }).populate("comments.postedBy","_id name pic ")
    .populate("postedBy","_id name pic ")
    .exec((err,result)=>{
        if(err)
        {
            return res.status(422).json({error:err})
        }
        else{
            console.log(result)
            res.json(result)
        }
    })
})
router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post)
        {
            return res.status(402).json({error:err})
        }
        // console.log(req.user._id)
       
            // console.log(req.user)
            post.remove()
            .then(result=>{
                // console.log(post)
                res.json(result)
            })
            .catch(err=>{
                console.log(err)
            })
        
    })
})
// router.delete('/deletecomment/:postId/:commentId',requireLogin,(req,res)=>{
//     Post.findb(req.params.postId)
//     .populate("comments.postedBy","_id name")
//     .exec((err,post)=>{
//         if(err || !post)
//         {
//             return res.status(402).json({error:err})
//         }
//             Post.findByIdAndUpdate(req.body.commentId,{
//                 $pull:{comments:req.body.commentId}
//             },{
//                 new:true
//             }).populate("postedBy","_id name")
//             .populate("comments.postedBy","_id name")
//             .then(result=>{
                
//                     res.json(result)
//                 })
//                 .catch(err=>{
//                     console.log(err)
//                 })
            
        

        
//     })
// })
router.delete('/deletecomment/:postId/:commentId', requireLogin, (req, res) => {
    Post.findById(req.params.postId)
    //   .populate("postedBy","_id name")
      .populate("comments.postedBy","_id name pic ")
      .exec((err,post)=>{
          if(err || !post){
            return res.status(422).json({message:"Some error occured!!"});
          }
        //   console.log(post)
          const comment = post.comments.find((comment)=>
            comment._id.toString() === req.params.commentId.toString()
            );
            if (comment.postedBy._id.toString() === req.user._id.toString()) {
                
                const removeIndex = post.comments
                .map(comment => comment._id.toString())
                .indexOf(req.params.commentId);
                post.comments.splice(removeIndex, 1);
                post.save()
                .then(result=>{
                    res.json(result)
                }).catch(err=>console.log(err));
            }
      })
  });
//   router.get('/updatepostprofilepic',requireLogin,(req,res)=>{
//     Post.findByIdAndUpdate()
    
// })
module.exports = router