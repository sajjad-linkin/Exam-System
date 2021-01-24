import React from "react";

import Radio from "@material-ui/core/Radio";
import Textarea from '@material-ui/core/TextareaAutosize';
import Typography from "@material-ui/core/Typography";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from "@material-ui/core/Button";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";

import styles from "./answer-style";
import theme from "../../styles/theme";

class Answer extends React.Component {
    constructor(props){
        super(props);
    this.state={
        selectedFile:null,
        uploadFileResult:  <Button 
        style={{border:"2px solid #DA0000",
        borderRadius:"10px" ,minWidth:"55px" ,
        height:"38px",marginRight:"10px"    }}><CancelIcon
        style={{ color:"#DA0000",
        fontSize:37 
    }}/>هنوز تصویری آپلود نشده است</Button>
   
    };
    this.fileChangeHandler=this.fileChangeHandler.bind(this);}
    onAnswerClick = e => {
        e.preventDefault();
        this.props.onAnswerSelect(this.props.answerIndex);
    };
    
    fileChangeHandler = e =>{
        this.setState({selectedFile: e.target.files[0]},()=>this.fileNameHandler(this.state.selectedFile));
        
    }
    onclick=value=>{
        console.log(value.name)
    }
    fileNameHandler=value=>{
        this.setState({uploadFileResult: 
            <Button 
                style={{border:"2px solid #548DF8",
                borderRadius:"10px" ,minWidth:"55px" ,
                height:"38px",marginRight:"10px"    }}
                onClick={()=>this.onclick(value)}>
            <CloudUploadIcon 
                style={{  color:"#548DF8",
                marginLeft:"5px",
                fontSize:40
             }}/>
             {value.name}
             </Button>})
    }
    returnSelectedFile=()=>{
        return this.state.selectedFile;
    }
    fileUploadResult = () => {
        this.setState({uploadFileResult:<CheckCircleOutlineIcon/>})
    }

    render() {
        const {classes}=this.props
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.answer}>
                    {this.props.answertype==="test"?
                    <>
                    <Radio
                        id={this.props.answerIndex.toString()}
                        color={"primary"}
                        checked={this.props.isSelected}
                        onClick={this.onAnswerClick}
                    />
                    <Typography className={classes.answerTypography} component="p" onClick={this.onAnswerClick}>
                        {this.props.answer}
                    </Typography>
                    </>
                    :
                    <>
                    <Textarea style={{width:"100%", minHeight:"100px", border:"2px solid silver", borderRadius:"5px"}} placeholder="پاسخ خود را تایپ و یا به صورت فایل آپلود کنید"/>
                        <div className={classes.answerFile}>
                        <input
                            accept="image/*"
                            id="contained-button-file"
                            multiple
                            type="file"
                            name="file"
                            style={{display:"none"}}
                            onChange={this.fileChangeHandler}
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">
                            بارگزاری تصویر
                            </Button>
                            
                        </label>
                        <div>   
                                {this.state.uploadFileResult}
                        </div>
                        </div>
                  </>

                    }
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(Answer);
