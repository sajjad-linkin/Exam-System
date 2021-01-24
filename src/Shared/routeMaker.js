import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
  } from "react-router-dom";
  


  const routeMaker=(props)=>{
      const items=props.items.routes
    //   const finalItems=items.routes
    //   const finalRoute=''
    //   for(let item in finalItems){
    //     finalRoute+= <Route path={item.routes.path} render={item.routes.component}/>;
    //   }
      return(
          <Switch>
              <Route exact path={items.path} render={items.component}/>
          </Switch>
      )

  }

  export default routeMaker