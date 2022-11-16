import axios from "../../axios/axios-quiz";
import { QUESTION_CREATE, QUIZ_CREATE } from "./actionTypes";

export function createQuestion(question) {
    return {
        type: QUESTION_CREATE, question
    }
}

export function createQuiz() {
    return async (dispatch, getState) => {
        await axios.post('quizes.json', getState().create.quiz)
        dispatch(resetQuizCreation())
    }
}

function resetQuizCreation() {
    return {
        type: QUIZ_CREATE
    }
}