import * as api from '../api';

//Action Creator

export const getPosts=()=>async(dispatch)=>{
    try{
      const {data}=await api.fetchPosts();
      dispatch({type:'FETCH_ALL',payload:data})
    }catch(error){
       console.log(error.message);
    }
    
}

export const getPostsBySearch=(searchQuery)=>async(dispatch)=>
{
  try{
    const{data :{data}}=await api.fetchPostsBySearch(searchQuery);
    dispatch({type:'FETCH_SEARCH',payload:data})
  }catch(error){
     console.log(error.message);
  }
  
}

export const createPost=(post)=>async (dispatch)=>{
  try{
   const {data}= await api.createPost(post);
   dispatch({type:'CREATE',payload:data});
  }
  catch(error)
  {alert('error');
  }
}

export const updatePost=(id,post)=>async (dispatch)=>{
  try{
   const {data}= await api.updatePost(id,post);
   dispatch({type:'UPDATE',payload:data});
  }
  catch(error)
  {console.log(error.message);
  }
}

export const deletePost=(id)=>async(dispatch)=>{
  try{
      await api.deletePost(id);
      dispatch({type:'DELETE',payload:id});
  }
  catch(error)
  {
    console.log(error.message);
  }
}

export const likePost=(id)=>async(dispatch)=>{
  try{
    const {data}= await api.likePost(id);
    dispatch({type:'LIKE',payload:data});
  }
  catch(error)
  {
    console.log(error.message);
  }
}

export const commentPost=(value,id)=>
async(dispatch)=>{
  try{
  const {data}=await api.comment(value,id);
  dispatch({type:'COMMENT',payload:data});
  return data.comments;
  }
  catch(error)
  {
    console.log(error);
  }
}