import React, { Component } from "react";
import "./Cart.css";

// import components
import Header from "../../components/Header/Header";
import CartList from "../../components/CartList/CartList";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: this.props.cart,
            search: "",
            isModalLoginFormOpen: this.props.isModalLoginFormOpen,
            isLoginForm: this.props.isLoginForm,
            logged: this.props.logged,
            user: this.props.user,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.cart !== this.props.cart) {
            this.setState({ cart: this.props.cart });
        }
        if (prevProps.user !== this.props.user) {
            this.setState({ user: this.props.user });
        }
        if (prevProps.logged !== this.props.logged) {
            this.setState({ logged: this.props.logged });
        }
    }

    render() {
        const { cart, search, isModalLoginFormOpen, isLoginForm, logged, user } = this.state;
        return (
            <div className="nam-shop-cart-container">
                <Header
                    logged={logged}
                    setLogged={this.props.setLogged}
                    user={user}
                    setUser={this.props.setUser}
                    cart={cart}
                    setCart={this.props.setCart}
                    search={search}
                    toggleModalLoginForm={this.toggleModalLoginForm}
                    isModalLoginFormOpen={isModalLoginFormOpen}
                    isLoginForm={isLoginForm}
                />
                <CartList
                    cart={cart}
                    setCart={this.props.setCart}
                    logged={logged}
                    user={user}
                    isModalLoginFormOpen={isModalLoginFormOpen}
                    isLoginForm={isLoginForm}
                    toggleModalLoginForm={this.toggleModalLoginForm}
                    addToCart={this.props.addToCart}
                    removeFromCart={this.props.removeFromCart}
                />
            </div>
        );
    }
}

export default Cart;