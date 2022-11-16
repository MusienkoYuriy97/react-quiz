import axios from "../../axios/axios-quiz"
import { FETCH_QUIZE_BY_ID_SUCCESS, FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, QUIZ_SET_STATE, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETRY } from "./actionTypes"

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('quizes.json')
            const quizes = []
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Вопрос №${index + 1}`
                })
            })
            dispatch(fetchQuizesSuccess(quizes))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get(`quizes/${quizId}.json`)
            const quiz = response.data
            dispatch(fetchQuizByIdSuccess(quiz))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === 'success') {
                return;
            }
        }
        const activeQuiz = state.quiz[state.activeQuestion];
        const results = state.results ? state.results : {};
        if (activeQuiz.rightAnswerId === answerId) {
            if (!results[activeQuiz.id]) {
                results[activeQuiz.id] = 'success';
            }
            dispatch(quizSetState({ [answerId]: 'success' }, results))
            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz())
                } else {
                    dispatch(quizNextQuestion())
                }
                window.clearTimeout(timeout);
            }, 1000);
        } else {
            results[activeQuiz.id] = 'error';
            dispatch(quizSetState({ [answerId]: 'error' }, results))
        }
    }
}

export function retryQuiz() {
    return (dispatch) => {
        dispatch(quizRetry())
    }
}

function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length
}


function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState, results
    }
}

function quizRetry() {
    return {
        type: QUIZ_RETRY,
    }
}

function quizNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number
    }
}

function finishQuiz() {
    return {
        type: FINISH_QUIZ,
    }
}

function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}

function fetchQuizByIdSuccess(quiz) {
    return {
        type: FETCH_QUIZE_BY_ID_SUCCESS,
        quiz
    }
}