import React from 'react'
import { Avatar,Button,Paper,Grid,Typography,Container, TextField} from '@material-ui/core';
import LockoutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import Input from './Input';
import { useStyles } from './Styles';
import { GoogleLogin } from '@react-oauth/google';
import {signin,signup} from '../../actions/auth';
import Icon from './icon';
const initialState={firstName:'',lastName:'',email:'',password:'',confirmPassword:''}
const Auth = () => {
     const history=useHistory();
    const dispatch=useDispatch();
    const classes=useStyles();
    const state=null;
    const [formData,setFormdata]=useState(initialState);
    const [showpassword,setshowpassword]=useState(false);
    const handleshowpassword=()=>{
        setshowpassword((prevShowPassword)=>!prevShowPassword)
    }
    const switchMode=()=>{
           setSignup((prevIsSignup)=> !prevIsSignup);
           handleshowpassword(false);
           
           }
    
    const [isSignup,setSignup]=useState(false);
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(isSignup)
        {
            dispatch(signup(formData,history))
        }
        else{
            dispatch(signin(formData,history))
        }
    }
    const handleChange=(e)=>{
        setFormdata({...formData,[e.target.name]:e.target.value});
    }
    const googleSuccess= async (res)=>{
        var profileobj=jwt_decode(res.credential);
    const result=profileobj;
    const token=res.credential;

    try{
    dispatch({type:'AUTH',data:{result,token}});
    history.push('/');
    }
    catch(error){
           console.log(error);
    }
    }
    const googleFailure=(error)=>{
        console.log(error);
        console.log("Failure in google sign in");
    }
  return (
   
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.Avatar}>
                <LockoutlinedIcon/>
            </Avatar>
            <Typography variant='h5'>{isSignup ? 'Signup':
            'signin'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                 {
                    isSignup && (
                        <>
                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half></Input>
                        <Input name="lastName" label="Last Name" handleChange={handleChange}half></Input>
                          
                        </>
                    )
                 }
                 <Input name="email" label="Email address" handleChange={handleChange} type="email"/>
                 <Input name="password" label="Password" handleChange={handleChange} type={showpassword ? "text":"password"} handleShowPassword={handleshowpassword}/>
                 {isSignup && 
                 <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>
                 
                 
                 }
              </Grid>
              
              <Button type="Submit" fullwidth varaint="contained" style={{backgroundColor:"blue",color:"white",marginTop:"40px"}}className={classes.submit}>
               {isSignup ? "Sign up" : "Sign In" }
              </Button>
              <GoogleLogin 
                 render={(renderProps)=>(
                    <Button className={classes.googleButton} style={{backgroundColor:"blue",color:"white",marginTop:"10px"}} fullwidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>}
                    varaint="contained">
                        Google Sign in
                    </Button>
                 )}
                 onSuccess={googleSuccess}
                 onFailure={googleFailure}
                 //cookiePolicy="single_host_origin"
              />
              <Grid container justify="flex-end">
                    <Grid item>
                           <Button onClick={switchMode}>
                           {isSignup ? "Already have an account? Sign In" : "Don't have an account? Signup"} 
                           </Button>
                    </Grid>
              </Grid>
            </form>
        </Paper>
    </Container>

  )
}

export default Auth
