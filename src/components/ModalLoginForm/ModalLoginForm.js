import React, { Component } from "react";
import "./ModalLoginForm.css";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";


class ModalLoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginForm: this.props.isLoginForm,
            // onCloseModal: this.props.toggleModalLoginForm,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.isLoginForm !== prevProps.isLoginForm) {
            this.setState({ isLoginForm: this.props.isLoginForm });
        }
    }

    render() {
        const { isLoginForm } = this.state;
        return (
            <div className="nam-shop-modal-login-form-container">
                {isLoginForm ? (
                    <LoginForm toggleModalLoginForm={this.props.toggleModalLoginForm} />
                ) : (
                    <RegisterForm toggleModalLoginForm={this.props.toggleModalLoginForm} />
                )}
            </div>
        )
    }
}

export default ModalLoginForm;