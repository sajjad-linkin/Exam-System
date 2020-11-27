import logo from './logo.svg';
import React, { PureComponent } from 'react'
import Clock from 'react-clock'

import {Layout, Divider, Col, Row} from 'antd'
import './App.css';
import Header from './Component/Header'
import Aside from './Component/Aside'
import Content from './Component/Content'
import  './Component/MainHeader.css'
import Title from './Component/Title'
import classes from './Component/Aside.module.css'


function App() {
  // const [SideBarOpen, setSideBarOpen] = useState(true)


  // toggle=()=>{
  //   setIsLoginMode(prevMode => !prevMode);
  // }
  // let sidebarClassname = sidebarOpen ? 'sidebar open' : 'sidebar';
  // let contentClassname = sidebarOpen ? 'content open' : 'content';

  return (
    <React.Fragment>
      
      <Layout className="container" style={{height:'100vh'}}>
      <Aside></Aside>
      <Layout className="site-layout">  
        <Header></Header>
        <Title/>
        <Content></Content>
        </Layout>
          
      </Layout>
      
    </React.Fragment>
  );
}

export default App;
