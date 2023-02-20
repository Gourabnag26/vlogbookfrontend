import React from 'react'
import { useSelector } from 'react-redux';
import {Grid,CircularProgress} from '@material-ui/core';
import Post from './Post/Post';
import './Post/Poststyle/post.style.css';
const Posts=({setCurrentId,setlat,setlon,lat,lon,load})=> {
    const posts=useSelector((state)=>(state.posts));
    function degreesToRadians(degrees) {
      return degrees * Math.PI / 180;
    }
    function distance(lat1, lon1, lat2, lon2){
      var earthRadiusKm = 6371;
      var dLat = degreesToRadians(lat2-lat1);
      var dLon = degreesToRadians(lon2-lon1);
    
      lat1 = degreesToRadians(lat1);
      lat2 = degreesToRadians(lat2);
    
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var ret=earthRadiusKm * c;
      return ret.toFixed(2);
    }
  return (
   
    !posts.length ? (<div style={{"display":"flex","justifyContent":"center","marginTop":"40px"}}><CircularProgress/></div> ): (
      <div id="posts">
      <Grid >
        { 
          posts.map((post)=>(
          
            <Grid id="gridpost"style={{margin:"40px auto 40px",maxWidth:"600px"}} key={post._id} item xs={12} sm={6}>
              
             {load && distance(lat,lon,post.lat,post.lon)<100 && (<Post style={{"margin-top":"50px"}}post={post}  lat={lat} lon={lon}  setCurrentId={setCurrentId}/>)}
              </Grid>
          ))
        }
      </Grid>
     </div>
    )
 


  )
}

export default Posts
