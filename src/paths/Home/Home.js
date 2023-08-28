import React, { Component } from 'react';
import './Home.css';

// import components
import Header from '../../components/Header/Header';
import ProductList from '../../components/ProductList/ProductList';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: this.props.cart,
            search: '',
            isModalLoginFormOpen: this.props.isModalLoginFormOpen,
            isLoginForm: this.props.isLoginForm,
            logged: this.props.logged,
            user: this.props.user,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.user !== prevProps.user) {
            this.setState({ user: this.props.user });
        }
        if (this.props.cart !== prevProps.cart) {
            this.setState({ cart: this.props.cart });
        }
        if (this.props.logged !== prevProps.logged) {
            this.setState({ logged: this.props.logged });
        }
        if (this.props.isModalLoginFormOpen !== prevProps.isModalLoginFormOpen) {
            this.setState({ isModalLoginFormOpen: this.props.isModalLoginFormOpen });
        }
        if (this.props.isLoginForm !== prevProps.isLoginForm) {
            this.setState({ isLoginForm: this.props.isLoginForm });
        }
    }

    render() {
        const { cart, search, isModalLoginFormOpen, isLoginForm, logged, user } = this.state;
        return (
            <div className="nam-shop-container">
                <Header
                    logged={logged} setLogged={this.props.setLogged}
                    user={user} setUser={this.props.setUser}
                    cart={cart} setCart={this.props.setCart}
                    search={search}
                    toggleModalLoginForm={this.props.toggleModalLoginForm}
                    isModalLoginFormOpen={isModalLoginFormOpen} isLoginForm={isLoginForm}
                    getCurrentUser={this.props.getCurrentUser}
                />
                <ProductList cart={cart} addToCart={this.props.addToCart} />
            </div>
        );
    }
}

export default Home;