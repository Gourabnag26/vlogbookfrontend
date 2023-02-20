import React from "react";
import './places/place.style.css';
import { useEffect,useState } from "react";
import axios from "axios";
import { useRef } from "react";
import {getPosts} from '../../actions/posts';
import { useDispatch } from "react-redux";
export default function Place({lat,lon,setlat,setlon}) {
  const dispatch=useDispatch();
    const [state,setstate]=useState("");
    const[city,setcity]=useState("....");
    const [count,setcount]=useState(0);
    const city2=useRef();
    useEffect(() => {
     
     if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          
      
          } else {
            alert("Location access denied by user");
          }
          function showPosition(position) {
            setlat(position.coords.latitude); 
            setlon(position.coords.longitude);
            
         }
        
        
    },[])

   
    const Api_endpoint=`https://nominatim.openstreetmap.org/?addressdetails=1`;
    const Api_endpoint3=`https://nominatim.openstreetmap.org/reverse?format=jsonv2`;
    const Api_endpoint1=`http://api.positionstack.com/v1/forward?`;
    const Api_key=`5ddb6b6aee2a21ad3aa3f5e0de4ef480`;
     
     const[region,getreg]=useState("");
     const [label, getlabel] = useState("");
     const[locality,getlocal]=useState("");
    
   const check=(e)=>{
      e.preventDefault();
        const city3=city2.current.value;
        axios.get(`${Api_endpoint}&q=${city3}&format=json&limit=1`).then((response)=>{
          
           
            var person = response.data[Object.keys(response.data)[0]];
  
            console.log(person);
            setcity(person.address.city?person.address.city:person.address.county?person.address.county:person.address.state);
            getlabel(person.display_name);
           setlat(person.lat);
           setlon(person.lon);
           dispatch(getPosts());
           
           
     })
    }
    
    
     if(lat&&lon&&count<1)
     {
     
         setcount(1);
        axios.get(`${Api_endpoint3}&lat=${lat}&lon=${lon}`).then((response)=>{
      
          var b=document.getElementById("wel");
          b.style.display="grid";
          var person=response.data;
         // console.log(firstKeyValue[0]);
         console.log(response);
          setcity(response.data.address.city?response.data.address.city:response.data.address.county);
          getlabel(response.data.display_name);
          dispatch(getPosts());
       })
    }
    
    let url="https://maps.google.com/maps?width=600&height=400&hl=en&q="+lat+","+lon+"&t=&z=14&ie=UTF8&iwloc=B&output=embed";  
    return(
   <>
   <div id="wel" >
<div className="title"> Welcome to {city}</div> 
<div className="welcome">Your current place is approximately in {label}</div>
<div></div> 
<div className="coordinate">
           
        <div className="title" >Enter City:</div>   
      <div id="city" className="g1"><input ref={city2} className="form-control" type="text" label="Enter city" /></div>
      <button className="btn-secondary"  style={{"height":"40px"}}onClick={check}>click to confirm</button>
      </div>
      <div id="map"  className="mapouter"><div className="gmap_canvas"><iframe id="test1" className="gmap_iframe" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src={url}></iframe></div></div>
     
</div>
   </>

    )



}