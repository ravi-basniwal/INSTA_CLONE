import React,{useEffect,useState,useContext} from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";

const Profile = () => {
  const  [mypics,setPics] = useState([])
  const  {state,dispatch}= useContext(UserContext)
  const [image,setImage]=useState("")
  const [url,setUrl]=useState("")
  useEffect(()=>{
   fetch('/mypost',{
     headers:{
       "Authorization":"Bearer "+localStorage.getItem("jwt")
     }
   })
   .then(res=>res.json())
   .then(result=>{
    //  console.log(result)
    setPics(result.mypost)
   })
  },[])
  useEffect(()=>{
    if(image)
    {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "Team-Mate");
      fetch("https://api.cloudinary.com/v1_1/Team-Mate/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setUrl(data.url);
          // localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
          // dispatch({type:"UPDATEPIC",payload:data.url})
          fetch('/updateprofilepic',{
            method:"put",
            headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
            ,body:JSON.stringify({
              pic:data.url,
            })
          })
          .then(res=>res.json())
          .then(result=>{
            console.log(result)
              localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
          dispatch({type:"UPDATEPIC",payload:result.pic})
          })
        })
        .catch((err) => {
          console.log(err);
        });
    }
  })
  const uploadprofilepic = (file)=>{
    setImage(file)
   
  }
  // console.log(typeof(state))
  return (
    
    // console.log(state.followers),
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
         
           {/* <input  type="file" onChange={(e) => uploadprofilepic(e.target.files[0])} /> */}
           
           {/* <input type="image" style={{ width: "160px", height: "160px", borderRadius: "80px" }}  src={state?state.pic:"https://res.cloudinary.com/team-mate/image/upload/v1650283939/cld-sample.jpg"} alt="Submit" width="48" height="48" onChange={(e) => uploadprofilepic(e.target.images[0])}></input> */}
           
           <div className="file-field input-field">
        <div className="btn"  style={{ width: "160px", height: "160px", borderRadius: "80px",padding:"0px", marginLeft:"21px"}}>
          <span> <img
            style={{ width: "160px", height: "160px", borderRadius: "80px"}}
           src={state?state.pic:"https://res.cloudinary.com/team-mate/image/upload/v1650283939/cld-sample.jpg"}
           
          /></span>
          <input style={{ width: "160px", height: "160px", borderRadius: "80px", marginLeft:"35px"}} type="file" onChange={(e) => uploadprofilepic(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" hidden="true" />
        </div>
      </div>
        </div>
        <div style={{width:"55%", padding:"6px" ,marginTop:"33px" }} >
          <h4 style={{textAlign:"center"}}>{state?state.name:"loading"}</h4>
          {/* <h5 style={{fontSize:"80%",textAlign:"center"}}>{state?state.email:"loading"}</h5> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              // maxwidth: "70%",
            }}
          >
            
            <h6 style={{fontSize:"80%"}}> {mypics.length} posts</h6>
            
            <h6 style={{fontSize:"80%"}}> {state?state.followers.length:"loading"} followers</h6>
            <h6 style={{fontSize:"80%"}}> {state?state.following.length:"loading"}  following</h6>
          </div>
          
        </div>
      </div>
      <div className="gallary">
        {
          mypics.map(item=>{
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
    </div>
    
  );
};
export default Profile;
