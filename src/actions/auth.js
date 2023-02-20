import * as api from '../api/index';
import Auth from '../components/Auth/Auth';
import Alert from '../components/Alert';
export const signin=(formData,history)=>async(dispatch)=>{
  try{
   const { data }=await api.signIn(formData);
   dispatch ({type :'AUTH',data});
   history.push('/')
  }
  catch(error)
  {
    alert("Wrong credential")
  }
}
export const signup=(formData,history)=>async(dispatch)=>{
    try{
        const { data }=await api.signUp(formData);
        dispatch ({type :'AUTH',data});
     history.push('/')
    }
    catch(error)
    {
     alert("check the fields properly")
    }
  }