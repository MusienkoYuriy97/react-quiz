import React, { Component } from 'react';
import classes from './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import axios from '../../axios/axios-quiz';
import Loader from '../../components/ui/Loader/Loader';

class Quiz extends Component {
    state = {
        results: {},
        isQuizFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [],
        loading: true
    }

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return;
            }
        }
        const activeQuiz = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results ? this.state.results : {};
        if (activeQuiz.rightAnswerId === answerId) {
            if (!results[activeQuiz.id]) {
                results[activeQuiz.id] = 'success';
            }
            this.setState({ answerState: { [answerId]: 'success' }, results });
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({ isQuizFinished: true });
                } else {
                    this.setState({ activeQuestion: this.state.activeQuestion + 1, answerState: null });
                }
                window.clearTimeout(timeout);
            }, 1000);
        } else {
            results[activeQuiz.id] = 'error';
            this.setState({ answerState: { [answerId]: 'error' }, results });
        }
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isQuizFinished: false,
            results: null
        });
    }


    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }


    async componentDidMount() {
        try {
           
            console.log(this.props.match)
            const response = await axios.get(`quizes/${this.props.match.params.id}.json`)
            const quiz = response.data
            this.setState({
                quiz,
                loading: false
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        console.log('quiz render')
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1 key={'1'}>Ответьте на все вопросы</h1>

                    {
                        this.state.loading
                            ? <Loader />
                            : this.state.isQuizFinished
                                ? <FinishedQuiz
                                    results={this.state.results}
                                    quiz={this.state.quiz}
                                    onRetry={this.retryHandler}
                                />
                                : <ActiveQuiz
                                    key={'2'}
                                    state={this.state.answerState}
                                    answers={this.state.quiz[this.state.activeQuestion].answers}
                                    question={this.state.quiz[this.state.activeQuestion].question}
                                    onAnswerClick={this.onAnswerClickHandler}
                                    quizLength={this.state.quiz.length}
                                    answerNumber={this.state.activeQuestion + 1}
                                />

                    }

                </div>
            </div>
        )
    }
}

export default Quiz;