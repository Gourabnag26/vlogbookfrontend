import React from 'react'
import { BrowserRouter, Switch, Route,Redirect } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import {AappBar, TextField,Button} from '@material-ui/core';
import Navbar from "./components/Navbar/Navbar";
import Place from './components/places/Place';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import './components/main/main.style.css';
const App=()=>{
    const user=JSON.parse(localStorage.getItem('profile'));
    
    return(
   
    <div className="mainpage">
     <GoogleOAuthProvider clientId='595903638519-1h8tf7src47u3k1rm1vhhnsad9cudf0l.apps.googleusercontent.com'>
    <BrowserRouter>
     <Navbar/>
     <Switch>
     <Route path="/" exact component={Home} />
     <Route path="/posts" exact component={Home}  />
     <Route path="/posts/search" exact component={Home}  />
     <Route path="/posts/:id" exact component={PostDetails}  />
     <Route path="/auth" exact component={()=>(
        !user?<Auth/> :<Redirect to="/"/>
    )} />
     </Switch>


    
        
     </BrowserRouter>
     </GoogleOAuthProvider>
</div>

    )
}
export default App;