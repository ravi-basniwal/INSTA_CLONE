import React,{useState,useEffect} from "react";
import {Link,useNavigate} from 'react-router-dom'
import M from "materialize-css"
const Signup = () => {
  const navigate = useNavigate()
  const [name,setName]=useState("")
  const [password,setPassword]=useState("")
  const [email,setEmail]=useState("")
  const [image,setImage]=useState("")
  const [url,setUrl]=useState(undefined)
  useEffect(()=>{
   if(url)
   uploadFiels()
  },[url])
  const Uploadpic = ()=>{
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
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const uploadFiels=()=>{
    function validateEmail(email) 
    {
        var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
        console.log(re.test(email));
        return re.test(email);
    }
    if(!validateEmail(email)){
      M.toast({html:"Invalid email",classes:"#e53935 red darken-1"})
      return
    }
     
      
    fetch("/signup", {
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        password,
        email,
        pic:url
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error)
      {
        M.toast({html: data.error,classes:"#e53935 red darken-1"})
      }
      else
      {
        M.toast({html:data.message,classes:"#1de9b6 teal accent-3"})
        navigate('/signin')
      }
    }).catch(err=>{
      console.log(err)
    })
  

  }
  const PostData = ()=>{
    
    if(image)
    {
      Uploadpic()
    }
    else
    {
      uploadFiels()
    }
    
  }
    
  
  
  return (
    <div className="mycard input-field ">
      <div className="card auth-card">
        <h1>ZePal</h1>
        <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
        <input type="text" placeholder="email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder="password"  value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <div className="file-field input-field">
        <div className="btn">
          <span>Upload Profile Pic</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
        <button className="btn waves-effect waves-light #d500f9 purple accent-3" onClick={()=>PostData()}>Signup</button>
        <h5>
            <Link to="/signin" > Already have a accout?</Link>
            {/* <a href="/signin" style={{color:"yellow"}}> yeey </a> */}
        </h5>
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
export default Signup;
