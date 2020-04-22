import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './assets/style.css';
import quizServise from './quizService';
import QuestionBox from './components/questionBox';


class Quiz extends Component{

    state = {
        questionBank: []
    };

    // Function to pull questions from the API & populates the state array with the questions
    getQuestions = () => {
        quizServise().then(question => {
            this.setState({
                questionBank: question,
                score: 0,
                responses: 0
            });
        });
    };

    //Function to check the correct answer
    computeAnswer = (answer, correctAnswer) => {
        if(answer === correctAnswer){
            this.setState({
                score: this.state.score + 1
            });
        }
        this.setState({
            responses: this.state.responses < 5 ? this.state.responses + 1 : 5
        });
    }


    //Fetch the questions once the component mounts
    componentDidMount() {
        this.getQuestions();
    }

    render() {
        return(
            <div className="container">
                <div className="title">Quizera</div>
                {
                    this.state.questionBank.length > 0 &&
                    this.state.responses < 5 &&
                    this.state.questionBank.map(({question, answers, correct, questionId}) =>
                            <QuestionBox
                                key={questionId}
                                question={question}
                                options={answers}>
                                selected={answer => this.computeAnswer(answer, correct)}
                        </QuestionBox>
                        )}

                {this.state.responses === 5 ? (<h2>this.state.score</h2>) : null}
            </div>
        );
    }
}

ReactDOM.render(<Quiz />, document.getElementById('root'));