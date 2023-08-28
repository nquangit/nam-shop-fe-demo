// import logo from public folder
import logo from '../../assets/images/logo.png';
import React, { Component } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import config from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCartShopping, faRightToBracket, faIdCard, faCircleUser, faBell } from '@fortawesome/free-solid-svg-icons'
import { Popover, Badge } from 'antd';
// import components
import ModalLoginForm from '../ModalLoginForm/ModalLoginForm';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalLoginFormOpen: this.props.isModalLoginFormOpen,
            isLoginForm: this.props.isLoginForm,
            search: this.props.search,
            cart: this.props.cart,
            logged: this.props.logged,
            user: this.props.user,
            isScrollingDown: false,
            prevScrollY: 0,
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > this.state.prevScrollY) {
            this.setState({ isScrollingDown: true });
        } else {
            this.setState({ isScrollingDown: false });
        }

        this.setState({ prevScrollY: currentScrollY });
    };

    componentDidUpdate(prevProps) {
        if (this.props.cart !== prevProps.cart) {
            this.setState({ cart: this.props.cart });
        }
        if (this.props.search !== prevProps.search) {
            this.setState({ search: this.props.search });
        }
        if (this.props.isModalLoginFormOpen !== prevProps.isModalLoginFormOpen) {
            this.setState({ isModalLoginFormOpen: this.props.isModalLoginFormOpen });
        }
        if (this.props.isLoginForm !== prevProps.isLoginForm) {
            this.setState({ isLoginForm: this.props.isLoginForm });
        }
        if (this.props.logged !== prevProps.logged) {
            this.setState({ logged: this.props.logged });
        }
        if (this.props.user !== prevProps.user) {
            this.setState({ user: this.props.user });
        }
    }

    handleSearchChange(event) {
        this.setState({ search: event.target.value });
    }

    handleSearchFormSubmit(event) {
        event.preventDefault();
        const { search } = this.state;
        this.setState({ search: '' });
        console.log('search: ', search);
    }

    handleLogout() {
        localStorage.removeItem('token');
        this.props.setLogged(false);
        this.props.setUser(null);
        // const response = await axios.get(`${config.baseUrl}/logout`);
    }

    render() {
        const { isModalLoginFormOpen, isLoginForm, search, cart, user, isScrollingDown } = this.state;
        const new_cart = [...cart]
        new_cart.reverse();
        const content = new_cart.slice(0, 10).map((item, index) => (
            <div key={`key-${index}-${item.title}`}>
                <div className="nam-shop-cart-item">
                    <div className="nam-shop-cart-item-image">
                        <img src={item.thumbnail} alt="nam-shop-cart-item" />
                    </div>
                    <div className="nam-shop-cart-item-info">
                        <div className="nam-shop-cart-item-name">
                            {item.title}
                        </div>
                        <div className="nam-shop-cart-item-price">
                            $ {item.price}
                        </div>
                    </div>
                </div>
                <div className="nam-shop-cart-item-separator"></div>
            </div>
        ));
        const userPopoverContent = (
            <div>
                <div className="nam-shop-user-popover-content">
                    <div className="nam-shop-user-popover-content-item">
                        <NavLink to="/profile" className="nam-shop-user-popover-content-link">
                            Profile
                        </NavLink>
                    </div>
                    <div className="nam-shop-user-popover-content-item">
                        <NavLink to="/order" className="nam-shop-user-popover-content-link">
                            Order
                        </NavLink>
                    </div>
                    <div className="nam-shop-user-popover-content-item">
                        <NavLink to="#" className="nam-shop-user-popover-content-link" onClick={this.handleLogout}>
                            Logout
                        </NavLink>
                    </div>
                </div>
            </div>
        );
        return (
            <div className={`nam-shop-header-container ${isScrollingDown ? 'nam-shop-header-container-collapse' : 'nam-shop-header-container-expand'}`} >
                {!user ? (
                    <div className="nam-shop-header-section nam-shop-nav-container">
                        <div className="nam-shop-nav-register" onClick={() =>
                            this.props.toggleModalLoginForm(true, false, false)
                        }>
                            <FontAwesomeIcon icon={faIdCard} />
                            Register
                        </div>
                        <div className='nam-shop-nav-separator'>|</div>
                        <div className="nam-shop-nav-login" onClick={() => {
                            this.props.toggleModalLoginForm(true, true, false);
                        }}>
                            <FontAwesomeIcon icon={faRightToBracket} />
                            Login
                        </div>
                    </div>
                ) : (
                    <div className="nam-shop-header-section nam-shop-nav-container">
                        <div className="nam-shop-nav-notification">
                            <FontAwesomeIcon icon={faBell} />
                            Notifications
                        </div>
                        <div className='nam-shop-nav-separator'>|</div>
                        <Popover content={userPopoverContent} title="" placement="bottom">
                            <div className="nam-shop-nav-login">
                                <FontAwesomeIcon icon={faCircleUser} />
                                {user.username}
                            </div>
                        </Popover>
                    </div>
                )
                }
                <div className="nam-shop-header-section nam-shop-search-container">
                    <NavLink to="/" className="nam-shop-logo-name">
                        <div className="nam-shop-header-logo">
                            <img src={logo} alt="nam-shop-logo" />
                        </div>
                        <div className="nam-shop-header-name">
                            {config.companyName}
                        </div>
                    </NavLink>
                    <div className="nam-shop-search-box">
                        <form className="nam-shop-search-form" onSubmit={this.handleSearchFormSubmit}>
                            <input type="text" className="nam-shop-search-input" placeholder="Search" value={search} onChange={this.handleSearchChange} />
                            <button type="submit" className="nam-shop-search-button">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </form>
                    </div>
                    <div className="nam-shop-cart">
                        <Popover content={content} title="10 recent carts" placement="bottomRight">
                            <NavLink to="/cart" className="nam-shop-cart-link">
                                <Badge count={cart.length} size="large" >
                                    <div className="nam-shop-cart-icon">
                                        <FontAwesomeIcon icon={faCartShopping} />
                                    </div>
                                </Badge>
                            </NavLink>
                        </Popover>
                    </div>
                </div>
                {
                    isModalLoginFormOpen && (
                        <ModalLoginForm
                            isLoginForm={isLoginForm}
                            toggleModalLoginForm={this.props.toggleModalLoginForm}
                        />
                    )
                }
            </div >
        );
    }
}

export default Header;