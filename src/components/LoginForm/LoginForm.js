import React, { Component } from 'react';
import './LoginForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
import config from '../../config';
import MessagePopup from '../MessagePopup/MessagePopup';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            message: '',
        };
        // Test credentials
        this.state = {
            username: 'kminchelle',
            password: '0lelplR',
            message: '',
        };
        this.handleLoginFormSubmit = this.handleLoginFormSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleCloseMessagePopup = this.handleCloseMessagePopup.bind(this);
    }

    async handleLoginFormSubmit(event) {
        event.preventDefault();
        const { username, password } = this.state;
        try {
            const response = await fetch(`${config.apiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })
            if (!response.ok) {
                this.setState({ message: 'Username or password is incorrect' });
                throw new Error('Something went wrong');
            }
            const data = await response.json();
            localStorage.setItem('token', data.token);
            this.props.toggleModalLoginForm(false, null, true);
        } catch (error) {
            console.log('error: ', error);
        }
        this.setState({
            username: '',
            password: ''
        });
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleCloseMessagePopup() {
        this.setState({ message: '' });
    }

    render() {
        const { username, password, message } = this.state;
        return (
            <div className="nam-shop-login-form-container">
                <div className="nam-shop-login-form-toggle" onClick={() => {
                    this.props.toggleModalLoginForm(false, null, false);
                }}>
                </div>
                <form className="nam-shop-login-form" onSubmit={this.handleLoginFormSubmit}>
                    <div className="nam-shop-login-form-title">
                        <h2>Login</h2>
                    </div>
                    <div className="nam-shop-login-form-input">
                        <FontAwesomeIcon icon={faUser} />
                        <input type="text" placeholder="Username" value={username} required onChange={this.handleUsernameChange} />
                    </div>
                    <div className="nam-shop-login-form-input">
                        <FontAwesomeIcon icon={faLock} />
                        <input type="password" placeholder="Password" value={password} required onChange={this.handlePasswordChange} />
                    </div>
                    <div className="nam-shop-login-form-button">
                        <button>Login</button>
                    </div>
                    <div className="nam-shop-login-form-register">
                        <p>Don't have an account? <span className='nam-shop-login-form-register-button' onClick={() => {
                            this.props.toggleModalLoginForm(true, false, false);
                        }}
                        >Register</span></p>
                    </div>
                    <div className="nam-shop-login-form-forget-password">
                        <NavLink to="#" className="nam-shop-login-form-forget-password-link">
                            Forget password?
                        </NavLink>
                    </div>
                </form>
                <MessagePopup message={message} type="error" handleCloseMessagePopup={this.handleCloseMessagePopup} />
            </div>
        )
    }
}

export default LoginForm;