import React, { Component } from "react";
import  './MainHeader.css';
import 'antd/dist/antd.css';
import {Layout, Menu} from 'antd'
import Logo from "./logo"
import Clock from 'react-live-clock'

class Header extends Component {
       
    render() {
        const {Header} = Layout;
        return (
        <Header className="mainHeader ">
            {/* <Menu className={classes.menu_right} theme="dark" mode="horizontal">
                <Menu.Item key="1">
                    گلستان
                </Menu.Item>
                <Menu.Item key="2">
                    ال ام اس
                </Menu.Item>
                <Menu.Item className={classes.float_left} key="3">
                    خروج
                </Menu.Item>
            </Menu> */}
            <Logo/>
            {/* <Clock
        /> */}
      
            
        </Header>
        )
    }
}

export default Header;