import { QUESTION_CREATE, QUIZ_CREATE } from "../actions/actionTypes"

const initialState = {
    quiz: []
}

export default function createReducer(state = initialState, action) {
    switch (action.type) {
        case QUESTION_CREATE:
            return {
                ...state,
                quiz: [...state.quiz, action.question]
            }
        case QUIZ_CREATE:
            return {
                ...state, quiz: []
            }
        default:
            return state
    }
}