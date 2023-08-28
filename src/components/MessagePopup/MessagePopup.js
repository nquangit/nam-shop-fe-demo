import React, { Component } from 'react';
import './MessagePopup.css';

class MessagePopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: this.props.message,
            type: this.props.type,
            visible: false,
        };
        this.timeoutId = setTimeout(this.hidePopup, 3000);
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.message !== this.props.message) {
            this.setState({
                message: this.props.message,
                type: this.props.type,
            });

            if (this.props.message !== '') {
                this.setState({
                    visible: true,
                });
            }

            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(this.hidePopup, 3000);
        }
    }

    hidePopup = () => {
        this.setState({
            message: '',
            visible: false
        });
        this.props.handleCloseMessagePopup();
    };


    render() {
        const { message, type, visible } = this.state;
        return (
            <div className={`nam-shop-message-popup-container ${type} ${visible ? 'visible' : 'hidden'}`} onClick={this.hidePopup}>
                <div className="nam-shop-message-popup-content">
                    <p>{message}</p>
                </div>
            </div>
        )
    }
}

export default MessagePopup;