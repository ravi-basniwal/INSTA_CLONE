import React,{useContext} from "react";
import { Link,useNavigate} from "react-router-dom";
import { UserContext } from "../App";
const Navbar =()=>
{
  const {state,dispatch} = useContext(UserContext)
  const navigate=useNavigate()
  const renderList = ()=>{
    if(state)
    {
     return [
      <li id="profile"><Link to="/profile"><i className="material-icons" style={{ color: "white",float:"right"}}>
     account_circle
    </i></Link></li>,
      <li><Link to="/create"><i className="material-icons" style={{ color: "white",float:"right"}}>
      add_to_photos
     </i></Link></li>,
      <li><Link to="/myfollowingpost"><i className="material-icons" style={{ color: "white",float:"right"}}>
      explore
     </i></Link></li>,
      <li><i className="material-icons" style={{ color: "white",float:"right"}}
      onClick={()=>{
        localStorage.clear()
        dispatch({type:"CLEAR"})
        navigate('/signin')
      }}>
      exit_to_app
     </i></li>

     ]
    }
    else
    {
     return[
      <li><Link to="/signin">Signin</Link></li>,
      <li><Link to="/signup">Signup</Link></li>
     ]
    }
  }
  return(
    <nav>
    <div className="nav-wrapper #616161 grey darken-2">
      <Link to={state?"/":"/signin"} className="brand-logo left">ZePal</Link>
      <ul id="nav-mobile" className="right">
       {renderList()}
      </ul>
    </div>
  </nav>
  )
}
export default Navbar