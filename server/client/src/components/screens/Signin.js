import React,{useState,useContext,} from "react";
import {Link,useNavigate} from 'react-router-dom'
import M from "materialize-css"
import {UserContext} from '../../App'
const Signin = () => {
  const  {state,dispatch} = useContext(UserContext)
  const navigate = useNavigate()
 
  const [password,setPassword]=useState("")
  const [email,setEmail]=useState("")
  const PostData = ()=>{
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
     
      
    fetch("/signin", {
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        
        password,
        email
      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data)
      if(data.error)
      {
        M.toast({html: data.error,classes:"#e53935 red darken-1"})
      }
      else
      {
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        dispatch({type:"USER",payload:data.user})
        M.toast({html:"signed in success",classes:"#1de9b6 teal accent-3"})
        navigate('/')
      }
    }).catch(err=>{
      console.log(err)
    })
  
    
  }

  return (
    <div className="mycard input-field ">
      <div className="card auth-card">
        <h1>ZePal</h1>
        <input type="text" placeholder="email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder="password"  value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button className="btn waves-effect waves-light #d500f9 purple accent-3"
        onClick={()=>PostData()}>Signin</button>
        <h5>
            <Link to="/signup">Not registered yet?</Link>
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
            <Link to="/" className="grey-text text-lighten-4 right">ZePal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Signin;
