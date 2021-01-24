import React from "react";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Answer from "./components/Answer/Answer";
import Result from "./components/Result/Result";
import QuestionParagraph from "./components/Question/Question.js";
import addCssTransition from "./utils/css-transition";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import MyButton from './components/Result/AnswerModel'

import logo from "../assets/logo.svg";
import theme from "./styles/theme";
import styles from "./app-style";
import questionsFactory from "./models/factories/get-questions-factory";
import submitFactory from "./models/factories/submit-questions-factory";
import CircularLoading from "./components/CircularLoading";
import getQuestions from "./models/services/questions/local/get-questions";

class quizApp extends React.Component {
    lastTimeButtonClicked = new Date().getTime();

    state = {
        questions: null,
        result: null,
        questionsAnswers: [],
        currentQuestionIndex: 0
    };

    componentDidUpdate(prevProps, prevState) {
        this.updateButtonsPos();

        setTimeout(() => {
            this.updateButtonsPos();
        }, 0);
    }

    componentDidMount() {
        window.onorientationchange = () => this.updateButtonsPos();
        window.onresize = () => this.updateButtonsPos();

        questionsFactory(false).then(value => {
            this.setState({ questions: value }, () => {
                this.updateButtonsPos();
            });
        });

        this.updateButtonsPos();

        setTimeout(() => {
            this.updateButtonsPos();
        }, 0);
    }

    onNextClick = e => {
        const currentState = this.state;

        if (currentState.currentQuestionIndex === currentState.questions.length - 1 || this.areButtonsAnimating()) {
            return;
        }

        console.log(currentState.currentQuestionIndex);
        this.updatePage(++currentState.currentQuestionIndex);
    };

    onPrevClick = e => {
        const currentState = this.state;

        if (currentState.currentQuestionIndex === 0 || this.areButtonsAnimating()) {
            return;
        }

        this.updatePage(--currentState.currentQuestionIndex);
    };

    onSubmitClick = async () => {
        const currentState = this.state;

        this.setState({
            questions: null,
            questionsAnswers: [],
            currentQuestionIndex: 0
        });

        let result = await submitFactory(null, currentState.questions, currentState.questionsAnswers);
        this.setState({
            result
        });
    };

    onTryAgainPressed = async () => {
        this.setState({
            questions: null,
            questionsAnswers: [],
            currentQuestionIndex: 0,
            result: null
        });

        this.setState({
            questions: await getQuestions()
        })
    };

    onAnswerSelected = answerId => {
        let clickedAnswerIndex = answerId;
        let currentState = this.state;
        const currentAnswers = this.state.questionsAnswers;
        currentAnswers[currentState.currentQuestionIndex] = clickedAnswerIndex;

        this.setState({
            userAnswerIndexes: currentAnswers
        });
    };

    updateButtonsPos = () => {
        if (!this.questionsLoaded()) {
            return false;
        }

        let buttons = Array.from(document.getElementById("buttonsContainer").children);
        let mainContainer = document.getElementById("mainContainer");

        buttons.forEach(button => {
            button.children[0].style.bottom = "0px";
        });

        const bottomPosition = mainContainer.clientHeight - mainContainer.scrollHeight + 20;

        buttons.forEach(button => {
            button.children[0].style.bottom = bottomPosition + "px";
        });
    };

    updatePage = questionIndex => {
        this.lastTimeButtonClicked = new Date().getTime();
        document.getElementById("mainContainer").scrollTop = 0;
        this.setState({
            currentQuestionIndex: questionIndex
        });
    };

    questionsLoaded = () => (this.state.questions !== null ? true : false);
    getCurrentQuestion = () => this.state.questions[this.state.currentQuestionIndex].question;
    getCurrentAnswers = () => this.state.questions[this.state.currentQuestionIndex].answers;
    getCurrentAnswerType = () =>this.state.questions[this.state.currentQuestionIndex].questionType;
    isAnswerSelected = answerIndex => this.state.questionsAnswers[this.state.currentQuestionIndex] === answerIndex;
    shouldShowSubmit = () =>
        this.state.currentQuestionIndex === this.state.questions.length - 1 && true
        // this.state.questionsAnswers[this.state.questions.length - 1] !== undefined;
    shouldShowNext = () => 
         this.state.currentQuestionIndex !== this.state.questions.length - 1 && true
        // this.state.questionsAnswers[this.state.currentQuestionIndex] !== undefined;
    shouldShowPrev = (value) => value; // this.state.currentQuestionIndex !== 0;
    MyButton (condition , key , value){
        var root=''
        const { classes } = this.props;
        {condition=="done"?
            root=(<Button className={classes.doneAnswer} key={key}>{value}</Button>)
            :
            root=(<Button className={classes.undoneAnswer} key={key}>{value}</Button>)
        }
        return root
    }
    examAnswerModel = () =>{
        var examModel = [];
        for (var i = 0; i < this.state.questions.length;  i++) {
            examModel.push(this.MyButton("done",i,i+1));
        }
        return <div>{examModel}</div>;
    }
    
    areButtonsAnimating = () => {
        const transitionTime = 600;
        const currentTime = new Date().getTime();

        return currentTime - transitionTime <= this.lastTimeButtonClicked;
    };

    render() {
        const { classes } = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                {addCssTransition(
                    <Paper id="mainContainer" className={classes.paper} elevation={2}>
                        {/* <img key={"logo"} src={logo} className={classes.logo} alt="logo" />
                        <hr key={"horizontalLine"} width={"100%"} /> */}
                        {this.questionsLoaded() && this.state.result == null ? (
                            <div style={{direction:"rtl"}}>
                                {this.examAnswerModel()}
                                <hr key={"horizontalLine"} width={"100%"} />

                                {addCssTransition(
                                    
                                    <div key={this.getCurrentQuestion()}>
                                        <QuestionParagraph
                                            question={this.getCurrentQuestion()}
                                            questionIndex={this.state.currentQuestionIndex + 1}
                                            questionsLength={this.state.questions.length}
                                        />

                                        <div className={classes.answerContainer}>
                                            {console.log(this.getCurrentAnswerType())}
                                            {this.getCurrentAnswerType()==="test" ?
                                             this.getCurrentAnswers().map((currentAnswer, index) => (
                                                <Answer
                                                    answertype={this.getCurrentAnswerType()}
                                                    answerIndex={index}
                                                    key={this.getCurrentQuestion() + index}
                                                    answer={currentAnswer}
                                                    isSelected={this.isAnswerSelected(index)}
                                                    onAnswerSelect={this.onAnswerSelected}
                                                />
                                                
                                            )):
                                            <Answer
                                                    answertype={this.getCurrentAnswerType()}
                                                    // key={this.getCurrentQuestion() + index}
                                                    // isSelected={this.isAnswerSelected(index)}
                                                    // onAnswerSelect={this.onAnswerSelected}
                                                />
                                        }
                                        </div>

                                        <div id="buttonsContainer">
                                            {this.shouldShowSubmit()
                                                ? addCssTransition(
                                                      <Button
                                                          variant="contained"
                                                          className={classes.btnSubmit}
                                                          onClick={this.onSubmitClick}
                                                          color="primary"
                                                      >
                                                          Submit
                                                      </Button>
                                                  )
                                                : null}

                                            {this.shouldShowNext()
                                                ? addCssTransition(
                                                      <Button
                                                          variant="contained"
                                                          className={classes.btnNext}
                                                          onClick={this.onNextClick}
                                                          color="primary"
                                                      >
                                                          Next
                                                      </Button>
                                                  )
                                                : null}

                                            {this.shouldShowPrev()
                                                ? addCssTransition(
                                                      <Button
                                                          variant="contained"
                                                          className={
                                                              this.shouldShowSubmit()
                                                                  ? classes.btnPrevSubmit
                                                                  : classes.btnPrev
                                                          }
                                                          onClick={this.onPrevClick}
                                                          color="primary"
                                                      >
                                                          Prev
                                                      </Button>
                                                  )
                                                : null}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : this.state.result !== null ? (
                            addCssTransition(
                                <Result result={this.state.result} tryAgainPressed={this.onTryAgainPressed} />
                            )
                        ) : (
                            <CircularLoading key={"loadingCircle"} />
                        )}
                    </Paper>
                )}
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(quizApp);
