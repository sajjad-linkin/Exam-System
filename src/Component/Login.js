import React, { useReducer, useEffect,useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {Layout} from 'antd'
import {myContext} from '../App'
import './style1.css'
import decode from 'jwt-decode'
import { Container } from '@material-ui/core';
import { Check } from '@material-ui/icons';



const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
// var initState={
//   IsLoggedIn: false,
//   CurrentUserId:' ',
//   AccessToken:' ',
//   RefreshToken:' ',
//   Rule: undefined
//   }
//   function reducer(action){
//     switch(action){
//     case 'Loggedin':
//     Return {
//              this.state.IsLoggedIn = true
//              state.AccessToken=
    
//     }
//     }
//   Const [userState, dispatch] = useReducer(reducer , initialState)


export default function FormPropsTextFields() {
  const userContext=useContext(myContext)
  const[username , setUsername]=useState('')
  const[pass , setPass]=useState('')
  const handleSubmit=()=> {
 
    fetch("http://localhost:9090/login",
    {method:"POST",
    body: JSON.stringify({username:username , password:pass})})
    .then((r) =>{ return r.json()})
    .then((d) =>{
      console.log(d)
      localStorage.setItem('accessToken',d.access.token)
      localStorage.setItem('refreshToken',d.refresh.token)
      userContext.userDispatch('userLogin')
    });
  }
  
 

    
const classes = useStyles();
  
  return (
    <Layout className="container" style={{height:'100vh'}}>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField required id="stdusername" label="user name " 
          fullWidth
          onChange={(e)=>{setUsername(e.target.value)}} />   

          <TextField
          required id="stdpasswd"
          label="Password"
          required='true'
          type="password"
          autoComplete="current-password"
          fullWidth
          onChange={(e)=>{setPass(e.target.value)}}
          />
        </div>

        <div> 
          <Button variant="contained" style={{marginTop:'30px'} } color="primary"
           fullWidth
           disabled={ !username && !pass } onClick={handleSubmit} >LOG IN</Button>
        </div>
      </form>
    </Layout>
  );
  
}