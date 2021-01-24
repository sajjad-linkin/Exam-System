import React from 'react'
import Rct from '../Teacher/RecentExams'
import Ex from '../Teacher/ExamResults'
import {Layout, Divider, Col, Row} from 'antd'
import '../App.css';
import Header from '../Shared/Header/Header'
import Aside from '../Shared/Sidebar/Aside'
import RouteMaker from './routeMaker'
import Login from '../Component/FormPropsTextFields'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";

var PRF_Routes = {

    role:"PROFESSOR",
    routes:{
    path: "/recentExam",
    component: ()=> Rct}
    };

var STU_Routes = {
  role:"STUDENT",
  routes:{
    path: "/",
    component: ()=> Ex,
    }
  };



const routerView =props=>{
  function switchStatement(item){
    switch(item) {
      case "PROFESSOR": return  <RouteMaker items={PRF_Routes}/>;
      break;
      case "STUDENT": return <RouteMaker items={STU_Routes}/>;
      break;
      
      }
    }
  if(props.isAuth){
  return(
    <Layout className="container" style={{height:'100vh'}}>
    <Aside ></Aside>
      <Layout className="site-layout">  
        <Header />
        { switchStatement(props.role)}
      </Layout>
    </Layout>

    
  )
  }
  else{
    return <Login/>
  }
  
}
  export default routerView;