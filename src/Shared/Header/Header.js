import React, { Component } from "react";
import  './MainHeader.css';
import 'antd/dist/antd.css';
import {Layout, Menu} from 'antd'
import Logo from "./logo"
import Clock from 'react-analog-clock'

class Header extends Component {
       
    render() {
        const {Header} = Layout;
        return (
        <Header className="mainHeader ">
          
            <Logo/>
           <Clock className="clock"/>
      
            
        </Header>
        )
    }
}

export default Header;