import React,{useEffect,createContext,useReducer,useContext} from 'react';
import Navbar from './components/Navbar';
import "./App.css"
import {BrowserRouter,Route, Routes,useNavigate} from 'react-router-dom'
import Home from "./components/screens/Home"
import Signin from './components/screens/Signin';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
import Createpost from './components/screens/Createposst';
import {reducer,initialState} from './reducers/userReducers'
import UserProfile from './components/screens/UserProfile'
import SubscribedUserPosts from './components/screens/SubscribesUserPosts'

export const UserContext = createContext()



const Routing = ()=>{
  const navigate =useNavigate()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>
  {
     const user = JSON.parse( localStorage.getItem("user"))
     if(user)
     {
       dispatch({type:"USER",payload:user})
      //  navigate('/')
     }
     else
     {
       navigate('/signin')
     }
  },[])
  return(
    <Routes>
     
    <Route exact path="/" element={<Home />} />
    <Route path="/signin" element={<Signin />} />
    <Route exact path="/profile" element={<Profile />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/create" element={<Createpost />} />
    <Route path="/profile/:userid" element={<UserProfile />} />
    <Route path="/myfollowingpost" element={<SubscribedUserPosts />} />
   
  </Routes>
  )
}
function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <Navbar />
     <Routing/>
</BrowserRouter>
</UserContext.Provider>
  );
}

export default App;
