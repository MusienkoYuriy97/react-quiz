import React, { Component } from 'react'
import Button from '../../components/ui/Button/Button';
import Input from '../../components/ui/Input/Input';
import classes from './Auth.css';

export default class Auth extends Component {
    handleSubmit = (event) => {
        event.preventDefault()
    }

    handleLogin = () => {

    }

    handleRegistration = () => {

    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.handleSubmit} className={classes.AuthForm}>
                        <Input label="Email" />
                        <Input label="Пароль" errorMessage='TEST' />
                        <Button type="success" onClick={this.handleLogin}>Войти</Button>
                        <Button type="primary" onClick={this.handleRegistration}>Регистрация</Button>
                    </form>
                </div>
            </div>
        )
    }
}
