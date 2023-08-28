import React, { Component } from 'react';
import "./RegisterForm.css";
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
        };
        this.handleRegisterFormSubmit = this.handleRegisterFormSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    async handleRegisterFormSubmit(event) {
        event.preventDefault();
        const { email, username, password } = this.state;
        this.setState({
            email: '',
            username: '',
            password: ''
        });
        console.log('email: ', email);
        console.log('username: ', username);
        console.log('password: ', password)
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    render() {
        const { email, username, password } = this.state;
        return (
            <div className="nam-shop-register-form-container">
                <div className="nam-shop-login-form-toggle" onClick={() => {
                    this.props.toggleModalLoginForm(false, null);
                }}>
                </div>
                <form className="nam-shop-login-form" onSubmit={this.handleRegisterFormSubmit}>
                    <div className="nam-shop-login-form-title">
                        <h2>Register</h2>
                    </div>
                    <div className="nam-shop-login-form-input">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <input type="email" placeholder="Email" value={email} required onChange={this.handleEmailChange} />
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
                        <button>Register</button>
                    </div>
                    <div className="nam-shop-login-form-register">
                        <p>Already have an account? <span className='nam-shop-login-form-register-button' onClick={() => {
                            this.props.toggleModalLoginForm(true, true);
                        }}
                        >Login</span></p>
                    </div>
                    <div className="nam-shop-login-form-forget-password">
                        <NavLink to="#" className="nam-shop-login-form-forget-password-link">
                            Forget password?
                        </NavLink>
                    </div>
                </form>
            </div>
        )
    }
}

export default RegisterForm;