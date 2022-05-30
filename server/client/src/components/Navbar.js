import React,{useContext,useRef,useEffect,useState} from "react";
import { Link,useNavigate} from "react-router-dom";
import { UserContext } from "../App";
import M from 'materialize-css'
const Navbar =()=>
{
  const searchModal = useRef(null)
  const {state,dispatch} = useContext(UserContext)
  const  [search,setSearch]=useState('')
  const navigate=useNavigate()
  useEffect(()=>{
   M.Modal.init(searchModal.current)
  },[])
  const renderList = ()=>{
    if(state)
    {
     return [
      <li id="search"><i  data-target="modal1" className="material-icons modal-trigger" style={{ color: "white",float:"right"}}>
      search
     </i></li>,
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
    <div id="modal1" className="modal" ref={searchModal} >
    <div className="modal-content" style={{color:"black"}}>
    <input type="text" placeholder="search user"  value={search} onChange={(e)=>setSearch(e.target.value)}/>
    <ul className="collection">
      <li className="collection-item">Alvin</li>
      <li className="collection-item">Alvin</li>
      <li className="collection-item">Alvin</li>
      <li className="collection-item">Alvin</li>
    </ul>
    </div>
    <div className="modal-footer">
      <button className="modal-close waves-effect waves-green btn-flat">Agree</button>
    </div>
  </div>
  </nav>
  )
}
export default Navbar