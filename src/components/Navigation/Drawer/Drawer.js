import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Backdrop from '../../ui/Backdrop/Backdrop';
import classes from './Drawer.css';



class Drawer extends Component {

    handleClick = () => {
        this.props.onClose()
    }

    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        className={({ isActive }) => {
                            if (isActive) return classes.my;
                        }}
                        onClick={this.handleClick}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        const cls = [classes.Drawer];
        if (!this.props.isOpen) {
            cls.push(classes.close)
        }

        const links = []

        if (this.props.isAuthenticated) {
            links.push(
                { to: '/', label: 'Список', exact: true },
                { to: '/quiz-creator', label: 'Создать тест', exact: false },
                { to: '/logout', label: 'Выйти', exact: false },
            )

        } else {
            links.push({ to: '/auth', label: 'Авторизация', exact: false })
        }


        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClose={this.props.onClose} /> : null}
            </React.Fragment>
        )
    }
}

export default Drawer