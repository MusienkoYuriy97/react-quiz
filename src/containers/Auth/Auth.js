import React, { Component } from 'react'
import Button from '../../components/ui/Button/Button';
import Input from '../../components/ui/Input/Input';
import classes from './Auth.css';
import axios from 'axios';

export default class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный имейл',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                autoComplete: 'on',
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
    }

    handleLogin = async () => {
        const request = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBaVxY8qXAH44OTUOXyUhbvQ-X8pCxjOLs', request);
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    }


    handleRegistration = async () => {
        const request = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBaVxY8qXAH44OTUOXyUhbvQ-X8pCxjOLs', request);
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true
        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = this.validateEmail(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }



    handleInputChange = (event, controlName) => {
        console.log(`${controlName}: `, event.target.value)

        const formControls = { ...this.state.formControls }
        const editedControl = { ...formControls[controlName] }

        editedControl.value = event.target.value
        editedControl.touched = true
        editedControl.valid = this.validateControl(editedControl.value, editedControl.validation)

        formControls[controlName] = editedControl

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    valid={control.valid}
                    value={control.value}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange={event => this.handleInputChange(event, controlName)}
                    autoComplete={control.autoComplete}
                />
            )
        })
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.handleSubmit} className={classes.AuthForm}>
                        {this.renderInputs()}
                        <Button
                            type="success"
                            onClick={this.handleLogin}
                            disabled={!this.state.isFormValid}
                        >Войти</Button>
                        <Button
                            type="primary"
                            onClick={this.handleRegistration}
                            disabled={!this.state.isFormValid}
                        >Регистрация</Button>
                    </form>
                </div>
            </div>
        )
    }
}
