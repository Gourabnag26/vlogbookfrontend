import React from 'react';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import {useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import Place from '../places/Place';
import { Paper,AppBar,TextField,Button, rgbToHex } from '@material-ui/core';
import { useHistory,useLocation } from 'react-router-dom';
import {getPosts,getPostsBySearch} from '../../actions/posts';
import ChipInput from 'material-ui-chip-input';
import {useStyles} from './styles';
import Alert from '../Alert';
import './homestyle/home.style.css';
import { red } from '@material-ui/core/colors';
const Home = () => {
  const [tags,setTags]=useState([]);
  const[search,setsearch]=useState('');
  const [currentId,setCurrentId]=useState(null);
  const[lat,setlat]=useState("");
  const[lon,setlon]=useState("");
  const[load,setload]=useState(1);
  const dispatch=useDispatch();
  const query=useQuery();
  const history=useHistory();
  const page=query.get('page') || 1;
  const searchQuery=query.get('SearchQuery')
  function useQuery()
{
  return  new URLSearchParams(useLocation.search)
}
const badgestyle={
  backgroundColor:"#e44b8d",
  padding:"20px 30px",
  "borderRadius":"20px"
}
const handlekeypress=(e)=>{
  console.log("hello");
}
const salert=(message,type)=>{
  setalert({msg:message,
  type:type})

  setTimeout(() => {
    setalert(null);
  }, 2000);
}
const[alert,setalert]=useState(null)
const searchPost=()=>{
  if(search.length>0 || tags.length>0)
  {
    dispatch(getPostsBySearch({search,tags:tags.join(',')}))
  }
  else{
    history.push('/');
  }
}
 const handlead2=(e)=>{
  e.preventDefault();
  setTags([...tags,e.target.innerHTML]);
 }
 const handleadd=(tag)=>setTags([...tags,tag]);
 const handledelete=(tagToDelete)=>setTags(tags.filter((tag)=>tag!=tagToDelete))
  return (
    <div className="home">
     
       <Place salert={salert} lat={lat} lon={lon} setlat={setlat}  setlon={setlon}/>
        
        <Form  salert={salert} currentId={currentId}  setCurrentId={setCurrentId}/>
          <div id="chip">
          <div  className="input-group"style={{ margin:"40px auto 20px",justifyContent:"center"}}>
  <div  className="form-outline">
    <input id="fom1" type="search"   onChange={(e)=>setsearch(e.target.value)}value={search} style={{width:"1000px",marginRight:"10px"}}   className="form-control" />
   
  </div>
  <button onClick={searchPost}style={{height:"38px"}}type="button" className="btn btn-primary">
    <i className="fas fa-search"></i>
  </button>
          </div>
       
 
  
</div>   
<div style={{display:"flex","justifyContent":"center","marginBottom":"30px","gap":"20px"}}className="container">
  <div className="g1">
  <button onClick={handlead2}style={badgestyle} className="badge badge-primary">Park</button>
<button onClick={handlead2} style={badgestyle} className="badge badge-primary">Caffe</button>
<button onClick={handlead2} style={badgestyle} className="badge badge-primary">Garden</button>
  </div>
<div className="g2">
<button onClick={handlead2} style={badgestyle} className="badge badge-primary">Zoo</button>
<button onClick={handlead2} style={badgestyle} className="badge badge-primary">Temple</button>
<button onClick={handlead2}style={badgestyle} className="badge badge-primary">Party</button>
</div>
<div className="g3">
<button onClick={handlead2} style={badgestyle} className="badge badge-primary">Picnic</button>
<button onClick={handlead2} style={badgestyle} className="badge badge-primary">Club</button>
<button onClick={handlead2} style={badgestyle} className="badge badge-primary">Walk</button>
</div>
</div>
<div id="fom2" style={{"display":"flex","justifyContent":"center","gap":"10px"}}>
<ChipInput 
  
   style={{margin:"10px 0",backgroundColor:"white",justifyContent:"center",padding:"0 30px",width:"700px",display:"flex"}}
   value={tags}
   onAdd={handleadd}
   onDelete={handledelete}
   label="Search tags"
   varaint="outlined"
   />
    <button onClick={searchPost}style={{height:"50px","marginTop":"11px"}}type="button" className="btn btn-primary">
    <i className="fas fa-search"></i>
  </button>
   </div>
    <Posts setlat={setlat} setlon={setlon} lat={lat} lon={lon} load={load} setCurrentId={setCurrentId}/>
    <Paper  elevation={6} >
 
    </Paper>
    </div>
  )
}

export default Home
