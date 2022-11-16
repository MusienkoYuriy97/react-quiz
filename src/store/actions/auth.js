import axios from "axios";
import { AUTH_LOGOUT, AUTH_SUCCESS } from "./actionTypes";

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authRequest = { email, password, returnSecureToken: true }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBaVxY8qXAH44OTUOXyUhbvQ-X8pCxjOLs'
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBaVxY8qXAH44OTUOXyUhbvQ-X8pCxjOLs'
        }
        const response = await axios.post(url, authRequest)

        localStorage.setItem('token', response.data.idToken)
        localStorage.setItem('userId', response.data.localId)
        localStorage.setItem('expirationDate', new Date(new Date().getTime() + response.data.expiresIn * 1000))

        dispatch(authSuccess(response.data.idToken))
        dispatch(autoLogout(response.data.expiresIn))

    }
}

export function autoLogin() {
   return dispatch => {
    const token = localStorage.getItem('token')
    if(!token) {
        dispatch(logout())
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'))
        if (expirationDate <= new Date()) {
            dispatch(logout())
        } else {
            dispatch(authSuccess(token))
            dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
        }
    }
   }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return {
        type: AUTH_LOGOUT
    }
}

function autoLogout(expiresIn) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expiresIn * 1000)
    }
}

function authSuccess(idToken) {
    return {
        type: AUTH_SUCCESS,
        token: idToken
    }
}