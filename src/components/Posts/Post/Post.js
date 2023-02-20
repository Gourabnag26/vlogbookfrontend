import React, { useState } from 'react';
import {Card,CardActions,CardContent,CardMedia,Button,Typography, TextField} from'@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import axios from 'axios';
import { useEffect } from 'react';
import { useStyles } from './Styles';
import { useDispatch } from 'react-redux';
import { deletePost,likePost,commentPost } from '../../../actions/posts';
import  './Poststyle/post.style.css';

const Post=({post,setCurrentId,lat,lon})=>{
  const dispatch=useDispatch();
  const [comment,setcomment]=useState("");
  const[comments,setcomments]=useState([post?.comments]);
  const user=JSON.parse(localStorage.getItem('profile'));
  const[com,setcom]=useState(0);
  const handlecomment=async(e)=>{
    setcom(1);
    const finalComment=`${user.result.name} : ${comment}`;
    const newComments=await
    dispatch(commentPost(finalComment,post._id));
    setcomments(newComments);
    setcomment('');

  }
  const handlechange=(e)=>{
    e.preventDefault();
    setcomment(e.target.value);
  }

    const classes=useStyles();

    const Likes=()=>{
      if(post.likes.length>0)
      {
        return post.likes.find((like)=>like=== (user?.result?.sub || user?.result?._id))
        ?(
          <>
          <ThumbUpAltIcon  fontSize='small'/>&nbsp;
          {post.likes.length>2? `you and ${post.likes.length -1 } others`:`${post.likes.length} like${post.likes.length >1 ? 's':''}`} 
          </>
        ):(
          <>
          <ThumbUpAltIcon  fontSize='small'/>&nbsp;
          {post.likes.length}{post.likes.length===1?'Like':'Likes' }
          </>
        )
      }
      return<>
      <ThumbUpAltIcon  fontSize='small'/>&nbsp;
      Like 
      </>
    }
    const mystyle={
      "display":"grid",
      "width": "40rem","border":"1px solid white","borderRadius":"10px"
    }
  
    


    
  return (
    
   /*<Card className={classNamees.card}>
    <CardMedia className={classNamees.media} image={post.SelectedFile} title={post.title} />
    <div className={classNamees.overlay}>
       <Typography variant="h6">{post.creator}</Typography>
       <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
    </div>
    <div className={classNamees.overlay2}>
      <Button  style={{color:'white'}} size="small" onClick={()=>setCurrentId(post._id)}>
        <MoreHorizIcon fontSize='default' />

        </Button> 
    </div>
    <div className={classNamees.details}>
      <Typography variant="body2" color="textSecondary">{post.tags.map((tag)=>`#${tag}`)}</Typography>
      <Typography className="classNamees.title" variant="h5" gutterBottom>
   {post.title}
  </Typography>
      <CardContent>
        
      <Typography  variant="h5" gutterBottom>
   {post.about}
  </Typography>
  <div><a href={`${post.location}`}>Google map Location</a></div>
      </CardContent>
    <cardActions className={classNamees.cardActions}>
      <Button size="small"  onClick={()=>dispatch(likePost(post._id))} color="primary" >
        <ThumbUpAltIcon fontSize="small" />
        Like  
        {post.likeCount}
         </Button>
         <Button size="small" color="primary" onClick={()=>dispatch(deletePost(post._id))}>
        <DeleteIcon fontSize="small" />
         Delete
         </Button>
    </cardActions>
    </div>
   </Card>*/
   <>
   <div className="card" style={mystyle}>
    <div className="head" >
    <div className="left">
    <p className="heading">{post.name}</p>
    <p className="moment">{moment(post.createdAt).fromNow()}</p>
    </div>
    <div className="right">
    <Button   size="small" onClick={()=>setCurrentId(post._id)}>
        <MoreHorizIcon fontSize='medium' />
        </Button>
    </div>
    
    </div>
  <img className="card-img-top" style={{"height":"300px"}} src={post.SelectedFile} alt="Card image cap"/>
  <div className="card-body">
    <h2>{post.title}</h2>
    <Typography variant="body2" color="textSecondary">{post.tags.map((tag)=>`#${tag}`)}</Typography>
    <h5 className="card-text">{post.about}</h5>
    <div className="mapouter"><div className="gmap_canvas"><iframe width="600" height="200" id="gmap_canvas" src={`https://maps.google.com/maps?q=${post.location}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe><br/></div></div>
    <div style={{marginBottom:"10px"}}><a href={`https://maps.google.com/maps?q=${post.location}`}>Google map Location</a></div>
    <Button size="small" 
     disabled={!user?.result}
    onClick={()=>dispatch(likePost(post._id))} color="primary" >
     
          <Likes/>
         </Button>
         {(user?.result?.sub===post?.creator || user?.result?._id===post?.creator)&&(
           <Button size="small" color="primary" onClick={()=>dispatch(deletePost(post._id))}>
           <DeleteIcon fontSize="small" />
            Delete
            </Button>
         )}
  
  <p>
  <a className="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
    Comments
  </a>
</p>
<div className="collapse" id="collapseExample">
  { com?
  (<div className="card card-body">
  {comments.map((c,i)=>(
      <Typography style={{"marginBottom":"20px"}}key={0}>
       {c}
      </Typography>
    ))
  }
  </div>):(<div className="card card-body">
  {comments.map((c,i)=>(
      c.map((d,j)=>
        <div style={{"marginBottom":"20px"}} key={j}>{d}</div>
      )
    ))
  }
  </div>)
}

 
</div>
{user?.result?.name && (
  <>
<TextField fullWidth rows={4} variant="outlined" label="comment" value={comment}
onChange={handlechange}
/>
<button fullwidth disabled={!comment} onClick={handlecomment} style={{marginTop:"10px"}}>Comment</button>
</>
)}
  </div>
    
</div>
  </>
  )
}

export default Post
