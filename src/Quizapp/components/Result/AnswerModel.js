import React from 'react';
import Button from "@material-ui/core/Button";
import classes from './AnswerModelStyle';



function MyButton (props){
    const {condition , key , value}=props
    var root=''
    {condition=="done"?
        root=(<Button className={classes.doneAnswer} key={key}>{value}</Button>)
        :
        root=(<Button className={classes.undoneAnswer} key={key}>{value}</Button>)
    }
    return root
}


export default MyButton