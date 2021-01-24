import logo from './logo.svg';
import React, { PureComponent,useState , useEffect,useContext,useReducer} from 'react'
import str from './Shared/Strings'
import Clock from 'react-clock'
import RecentExams from "./Teacher/RecentExams"
import ExamResult from "./Teacher/ExamResults"
import CreateExam from "./Teacher/CreateExamForm"
import CourseList from "./Shared/Tables/CollapsibleTable"

  import {Layout, Divider, Col, Row} from 'antd'
import './App.css';
import Header from './Shared/Header/Header'
import PROAside from './Shared/Sidebar/Aside'
import STUAside from './Shared/Sidebar/STUAside'

import Content from './Shared/Content'
import Title from './Shared/ContentTitle/Title'
import classes from './Shared/Sidebar/Aside.module.css'
import Login from './Component/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import QuizApp from './Quizapp/quizApp'

export const myContext=React.createContext()

const stateReducer=(state,action)=>{
    switch(action){
      case 'userLogin':
          return state=true
        break;
        case 'userLogout':
          return state=false;
        break;
    }
}
//const initialexamStates =[] ???
const examStateReducer=(state,action)=>{
  switch(action){
    case 'examNotHeld':
        return state='notHeld'
      break;
    case 'examHolding':
        return state='holding'
      break;
    case 'examHeld':
        return state='done'  
  }
}

function App() {
  
  const [loginState , dispatch]=useReducer(stateReducer,false)
  const [examState , setExamState]=useState("notHeld")
  useEffect(() => {
    {localStorage.getItem('accessToken')?
    dispatch('userLogin'):
    dispatch('userLogout')
    }
  })


  // toggle=()=>{
  //   setIsLoginMode(prevMode => !prevMode);
  // }
  // let sidebarClassname = sidebarOpen ? 'sidebar open' : 'sidebar';
  // let contentClassname = sidebarOpen ? 'content open' : 'content';
    function switchStatement(item){
    switch(item) {
      case "PROFESSOR":
         return(
        <>
        <PROAside/>
        <Col span={19} style={{marginRight:"18px"}}>
        <Layout className="site-layout" >  
        <Header />
        <Switch>
          <Redirect exact from="/" to="/recentExam" />
          <Route exact path="/recentExam">
            <Title name="آزمون های اخیر"/>    
            <RecentExams headcells={str.PROFESSORS_RECENT_EXAMS}  />
          </Route>
          <Route exact path="/courses">
            <Title name="لیست دروس"/>    
            <CourseList headcells={str.PROFESSORS_EXAMS_LIST} mainHeadcells={str.PROFESSORS_COURSES_LIST} />
          </Route>
          <Route exact path="/createExam">
          <Title name="ایجاد آزمون"/>    
          <CreateExam />
          </Route>
          <Route exact path="/results">
          <Title name="نتایج آزمون"/>    
            <ExamResult mainHeadcells={str.PROFESSORS_EXAMS_LIST} headcells={str.PROFESSORS_EXAMS_STUDENTS_LIST} />
          </Route>
         
        </Switch>
  
        </Layout>
        </Col>
        </>);
      break;
      case "STUDENT": 
          if(examState=='holding'){
            return <QuizApp/>
          }
          else{
            return(
      
              <>
              <STUAside/>
              <Col span={19} style={{marginRight:"18px"}}>
              <Layout className="site-layout">  
              <Header />
              <Switch>
                <Redirect exact from="/" to="/courses" />
                {/* <Route exact path="/recentExams">
                  <Title name="آزمون های اخیر"/>    
                  {console.log()}
                  <RecentExams headcells={str.STUDENTS_RECENT_EXAMS}  />
                </Route> */}
                <Route exact path="/courses">
                  <Title name="لیست دروس"/>    
                  <CourseList headcells={str.STUDENTS_EXAMS_LIST} mainHeadcells={str.STUDENTS_COURSES_LIST} />
                </Route>
               
                <Route exact path="/results">
                <Title name="نتایج آزمون"/>    
                  <ExamResult mainHeadcells={str.PROFESSORS_EXAMS_LIST} headcells={str.PROFESSORS_EXAMS_STUDENTS_LIST} />
                </Route>
              </Switch>
        
              </Layout>
              </Col>
              </>
              )
    
    
          }
      
      break;
      
      }
    
    
    }

  return (
    <Router>
      <Layout className="container" style={{height:'100vh'}}>
      <myContext.Provider value={{loginState:loginState , userDispatch:dispatch}}>
      {loginState?
      switchStatement("PROFESSOR"):
        <Login />
      } 
      </myContext.Provider>  
      </Layout>
      
    </Router>
  );
}

export default App;