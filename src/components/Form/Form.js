import React from "react";
import { useState ,useEffect} from "react";
import FileBase from 'react-file-base64';
import {TextField,Button,Typography,Paper} from "@material-ui/core";
import { useDispatch } from "react-redux";
import fileBase from 'react-file-base64';
import { useRef } from "react";
import './Formstyle/form.style.css';
import {useStyles} from './Style';
import { createPost,updatePost } from "../../actions/posts";
import { useSelector } from "react-redux";
import axios from "axios";
import zIndex from "@material-ui/core/styles/zIndex";
import Alert from "../Alert";


const Form=({currentId,setCurrentId,salert})=>{
  const Api_endpoint=`https://nominatim.openstreetmap.org/?addressdetails=1`;
    const Api_key=`5ddb6b6aee2a21ad3aa3f5e0de4ef480`;
    const user=JSON.parse(localStorage.getItem('profile'));
    const [postData,setPostdata]=useState({
      title:'',about: '',location:'',tags:'',SelectedFile:''
    })
    const post=useSelector((state)=>currentId?state.posts.find((p)=>p._id===currentId):null);
    useEffect(()=>{
    
   if(post)
   setPostdata(post);
    },[post])
    
    const classes=useStyles();
    const dispatch=useDispatch();
   

    const handlesubmit=async(e)=>{
        e.preventDefault();
        
        if(currentId)
        {   
          axios.get(`${Api_endpoint}&q=${postData.city}&format=json&limit=1`).then((response)=>{
          
           
            var firstKeyValue = response.data[Object.keys(response.data)[0]];
           
            dispatch(updatePost(currentId,{...postData,name: user?.result?.name,lat: firstKeyValue.lat,lon: firstKeyValue.lon}))
        })

        }
       
        else{
          axios.get(`${Api_endpoint}&q=${postData.city}&format=json&limit=1`).then((response)=>{
            var firstKeyValue = response.data[Object.keys(response.data)[0]];
      
              dispatch(createPost({...postData,name: user?.result?.name,lat:firstKeyValue.lat,lon:firstKeyValue.lon}))
          })
        
            
        }
        clear();

    }
    if(!user?.result?.name)
    {return(

      
    <>
    <Alert alert={{msg:"Dear USer , Welcome to VlogBook Kindly Login to Post your vlogs",type:"primary"}}></Alert></>
    
    )

    }
    const clear=()=>{
         setCurrentId(null);
         setPostdata({title:'',about: '',city: '',location:'',tags:'',SelectedFile:''});
    }
    return(

    <>
 
  <Paper className="classes.paper">
    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handlesubmit}>
  <Typography className="formhead" variant="h5">{currentId ? 'Update':'Create'} your Vlog</Typography>
  
  
  <TextField  value={postData.title} onChange={(e)=>setPostdata({...postData,title: e.target.value})} name="title" variant="outlined" label="Name of the Place" fullWidth/>
  <TextField  value={postData.about} onChange={(e)=>setPostdata({...postData,about: e.target.value})} name="about" variant="outlined" label="About the place" fullWidth/>
  <TextField  value={postData.city} onChange={(e)=>setPostdata({...postData,city: e.target.value})} name="city" variant="outlined" label="City" fullWidth/>
  <TextField  value={postData.location} onChange={(e)=>setPostdata({...postData,location: e.target.value})} name="location" variant="outlined" label="Find in map" fullWidth/>
  <div id="maprouter" className="mapouter"><div className="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas" src={`https://maps.google.com/maps?q=${postData.location}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe></div></div>
   
  <TextField   value={postData.tags} onChange={(e)=>setPostdata({...postData,tags: e.target.value.split(',')})} name="tags" variant="outlined" label="tags" fullWidth/>
  <div className={classes.fileInput}>
    <FileBase
    type="file"
    multiple={false}
    onDone={({base64})=>setPostdata({...postData,SelectedFile:base64})} 
    />
  </div>
  <div className="but">
  <button type="submit" className="btn btn-primary">Submit</button>
  
  </div>
    </form>

  </Paper>
    </>
   
    )
}
export default Form;