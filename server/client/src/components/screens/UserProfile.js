import React,{useEffect,useState,useContext} from "react";
import { UserContext } from "../../App";
import { useParams ,Link} from "react-router-dom";
const Profile = () => {
  const  [userProfile,setProfile] = useState(null)
  const  {state,dispatch}= useContext(UserContext)
  
  const {userid}=useParams()
  useEffect(()=>{
   fetch(`/user/${userid}`,{
     headers:{
       "Authorization":"Bearer "+localStorage.getItem("jwt")
     }
   })
  
   .then(res=>
    // console.log(localStorage.getItem("following"))
    res.json())
   .then(result=>{
     console.log(result)
    
     setProfile(result)
   })
  },[])
   console.log(localStorage.getItem("user"))
   const obj = JSON.parse(localStorage.getItem("user"));
  //  console.log(obj.following)
  const [showfollow,setShowFollow] = useState(obj.following.includes(userid)?false:true)
  // console.log(userid)
  //  if(obj.following.length==0)
  //  setShowFollow(true)
  //  else
  // {obj.following.includes(userid)?setShowFollow(false):setShowFollow(true)}
  

  const followUser=()=>{
    fetch('/follow',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt"),},
        body:JSON.stringify({
          followId:userid
        })
      
    }).then(res=>res.json())
    .then(data=>{
      // console.log(data)
      dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
      console.log(data)
      localStorage.setItem("user",JSON.stringify(data))
      setProfile((prevState)=>{
        return{
           ...prevState,
           user:{...prevState.user,
          followers:[...prevState.user.followers,data._id]}
          }
      })
      setShowFollow(false)
    })
  }
  const unfollowUser=()=>{
    fetch('/unfollow',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt"),},
        body:JSON.stringify({
          unfollowId:userid
        })
      
    }).then(res=>res.json())
    .then(data=>{
      // console.log(data)
      dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
      localStorage.setItem("user",JSON.stringify(data))
     
      setProfile((prevState)=>{
        const newFollower = prevState.user.followers.filter(item=>item!= data._id)
        return{
           ...prevState,
           user:{...prevState.user,
          followers:newFollower}
          }
      })
      setShowFollow(true)
     
    })
  }
  return (
      <>
      {userProfile?  
      <div className="home">
       <div style={{maxWidth:"550px",margin:"0 auto "}}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "10px 0px",
          borderBottom: "2px solid pink",
        }}
      >
        <div style={{padding:"6px"}}>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src={userProfile.user.pic}
          />
        </div>
        <div style={{width:"55%", padding:"6px"}} >
          <h4 style={{textAlign:"center"}}>{userProfile.user.name}</h4>
          <h5  style={{fontSize:"80%",textAlign:"center"}} >{userProfile.user.email}</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              // maxwidth: "70%",
            }}
          >
            <h6 style={{fontSize:"80%"}}> {userProfile.posts.length} posts</h6>
            <h6 style={{fontSize:"80%"}}> {userProfile.user.followers.length} followers</h6>
            <h6 style={{fontSize:"80%"}}> {userProfile.user.following.length}  following</h6>
          </div>
          {
            showfollow?<button className="btn waves-effect waves-light #d500f9 purple accent-3" style={{marginTop:"10px",marginBottom:"10px",marginLeft:"100px"}}
            onClick={()=>followUser()}>Follow</button>:<button style={{marginTop:"10px",marginBottom:"10px",marginLeft:"100px"}} className="btn waves-effect waves-light #d500f9 purple accent-3"
            onClick={()=>unfollowUser()}>Unfollow</button>
          }
          
        
        </div>
      </div>
      <div className="gallary">
        {
          userProfile.posts.map(item=>{
            return(
              <img key={item._id} className ="item" src={item.photo} alt={item.title}/>
            )

          })
        }
      
      
      </div>
      </div>
      <footer className="page-footer">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">About ZePal</h5>
              <p className="grey-text text-lighten-4">
                You can use this beautiful platform for posting your best Pal of
                life{" "}
              </p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text" style={{ marginLeft: "5px" }}>
                Explore
              </h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  maxWidth: "30%",
                }}
              >
                <div>
                  <a href="https://www.youtube.com/" target="/blank">
                    <i className="fa fa-youtube-play"></i>
                  </a>
                </div>
                <div>
                  <a href="https://www.facebook.com/" target="/blank">
                    <i class="fa fa-facebook-f"></i>
                  </a>
                </div>
                <div>
                  <a href="https://www.instagram.com/" target="/blank">
                    <i class="fa fa-instagram"></i>
                  </a>
                </div>
                <div>
                  <a href="https://github.com/" target="/blank">
                    <i class="fa fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            © 2022 Copyright <t> </t>
            {/* <a className="grey-text text-lighten-4 right" href="/">
              More
            </a> */}
            <Link to="/" lassName="grey-text text-lighten-4 right">ZePal</Link>
          </div>
        </div>
      </footer>
      
    </div> : <h2> loading ....</h2>}
   
    </>
  );
};

export default Profile;
