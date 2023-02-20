import PropTypes from 'prop-types'
import React, { Component, useState,useEffect} from 'react'
import {Link} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useHistory,useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
 function Navbar(){
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
  const history=useHistory();
  const location=useLocation();
  const dispatch=useDispatch();
  const logout=()=>{
    dispatch({type:'LOGOUT'});
    history.push('/');
    setUser(null);
  }
   
  
   useEffect(()=>{
        const token=user?.token;
        if(token)
        {
          const decodedToken=decode(token);
          if(decodedToken.exp*1000<new Date().getTime())
          logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
   },[location]);
    return (
      <div>
      <nav id="nav" className="navbar fixed-top navbar-expand navbar-light bg-white">
  <div style={{alignItems:"center"}} className="container-fluid">
    <Link className="navbar-brand" to="/">Vlog Book</Link>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       
        <li>
          {user?(
            <div style={{display:"grid",marginLeft:"40px",marginTop:"0px",gridTemplateColumns:"1fr 1fr 1fr",gap:"5px",alignItems:"center"}}>
          <div style={{marginRight:"20px"}}>{user.result.name}</div>
          <img style={{"borderRadius": "50%",width:"30%"}}src={user.result.picture}></img>
          <button syle={{"height":"10px"}}type="button" className="btn btn-success" onClick={logout}>Logout</button>

          </div>
          ):(
            <Link to="/auth"><button type="button" className="btn btn-success">Login</button>
            </Link> 
          )
          }
          </li>
      </ul>
  </div>
</nav>

      </div>
      
    )
  }


export default Navbar