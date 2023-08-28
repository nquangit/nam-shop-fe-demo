import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import jwt_decode from 'jwt-decode';
// import paths
import Home from './paths/Home/Home';
import Cart from './paths/Cart/Cart';


function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [logged, setLogged] = useState(false);

  const [isModalLoginFormOpen, setIsModalLoginFormOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(null);

  const toggleModalLoginForm = (isModalLoginFormOpen, isLoginForm, logged) => {
    setIsModalLoginFormOpen(isModalLoginFormOpen);
    setIsLoginForm(isLoginForm);
    setLogged(logged);
    if (logged) {
      getCurrentUser();
    }
  };

  const getCart = () => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      setCart(JSON.parse(cart));
    }
  };

  const addToCart = (product) => {
    // Check if product is already in cart then increase quantity
    setCart(prevState => {
      const cart = [...prevState];
      const productInCart = cart.find(item => item.id === product.id);

      if (productInCart) {
        productInCart.quantity++;
      } else {
        product.quantity = 1;
        cart.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      return cart;
    });
  }
  const removeFromCart = (productId, count) => {
    // remove count product from cart
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        item.quantity -= count;
      }
      return item;
    }).filter(item => item.quantity > 0);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      setUser(decoded);
      setLogged(true);
    } else {
      setUser(null);
      setLogged(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
    getCart();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={
          <Home
            user={user} setUser={setUser}
            cart={cart} setCart={setCart}
            logged={logged} setLogged={setLogged}
            getCurrentUser={getCurrentUser}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            isModalLoginFormOpen={isModalLoginFormOpen}
            isLoginForm={isLoginForm}
            toggleModalLoginForm={toggleModalLoginForm}
          />}
        />
        <Route path="/cart" element={
          user && logged ?
            <Cart
              user={user} setUser={setUser}
              cart={cart} setCart={setCart}
              logged={logged} setLogged={setLogged}
              getCurrentUser={getCurrentUser}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              isModalLoginFormOpen={isModalLoginFormOpen}
              isLoginForm={isLoginForm}
              toggleModalLoginForm={toggleModalLoginForm}
            />
            :
            <Navigate to="/" />
        } />
      </Routes>
    </Router>
  );
}

export default App;
