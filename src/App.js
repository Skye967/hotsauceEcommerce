/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */ 

import React, {useState, useEffect, Fragment} from 'react'
import {Products, Navbar, Cart, Checkout} from './components'
import {commerce} from './lib/commerce.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import banner from './assets/sauceBanner.jpg'
const App = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const fetchProducts = async () => {
        const {data} = await commerce.products.list();

        setProducts(data);
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }

    const handleAddToCart = async (productId, quantity) => {
        const {cart} = await commerce.cart.add(productId, quantity);

        setCart(cart);
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const {cart} = await commerce.cart.update(productId, {quantity});

        setCart(cart);
    }

    const handleRemoveFromCart = async (productId) => {
        const {cart} = await commerce.cart.remove(productId);

        setCart(cart);
    }

    const handleEmptyCart = async () => {
        const {cart} = await commerce.cart.empty();

        setCart(cart);
    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();

        setCart(newCart);
    }

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try{
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

            setOrder(incomingOrder);

            refreshCart();
        }catch(error){
            setErrorMessage(error.data.error.message);
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

  return (
    <div>
        
        <Router>
            <Fragment>
            <div>
                <Navbar totalItems={cart.total_items}/>
                <section className="section-main bg padding-y">
        <div className="container">
        <div className="row">
            <div className="col-md-9">
                <article className="banner-wrap">
                    <img src={banner} className="w-100 rounded" />
                </article>
            </div> 
        </div> 
        </div> 
        </section>
                <Routes>
                    <Route exact path="/" element={
                        <section className="section-name padding-y-sm">
                        <div className="container">
                            <header className="section-heading">
                                <a href="#" className="btn btn-outline-primary float-right">See all</a>
                                <h3 className="section-title">Popular products</h3>
                            </header>
                            
                            <div className="row">
                            <Products products={products} onAddToCart={handleAddToCart}/>
                            </div>
                        </div>
                    </section>
                    }>
                    </Route >
                    <Route exact path="/cart" element={
                        <Cart cart={cart}
                        handleUpdateCartQty={handleUpdateCartQty}
                        handleRemoveFromCart={handleRemoveFromCart}
                        handleEmptyCart={handleEmptyCart}/>
                    }>
                    </Route>
                    <Route exact path='/checkout' element={
                        <Checkout
                            cart={cart} 
                            order={order} 
                            onCaptureCheckout={handleCaptureCheckout}
                            error={errorMessage}
                        />
                    }>
                    </Route>
                </Routes>
            </div>
            </Fragment>
        </Router>
       
      
        <section className="section-name padding-y bg">
        <div className="container">
        <div className="row">
        <div className="col-md-6">
            <h3>Download app</h3>
            <p>Get an amazing app  to make Your life easy</p>
        </div>
        <div className="col-md-6 text-md-right">
            <a href="#"><img src="assets/images/misc/appstore.png" height="40" /></a>
            <a href="#"><img src="assets/images/misc/appstore.png" height="40" /></a>
        </div>
        </div> 
        </div>
        </section>
        
        
        <footer className="section-footer border-top bg">
        <div className="container">
          <section className="footer-top  padding-y">
            <div className="row">
              <aside className="col-md col-6">
                <h6 className="title">Company</h6>
                <ul className="list-unstyled">
                  <li> <a href="#">About us</a></li>
                  <li> <a href="#">Rules and terms</a></li>
                  <li> <a href="#">Sitemap</a></li>
                </ul>
              </aside>
              <aside className="col-md col-6">
                <h6 className="title">Help</h6>
                <ul className="list-unstyled">
                  <li> <a href="#">Contact us</a></li>
                  <li> <a href="#">Money refund</a></li>
                  <li> <a href="#">Order status</a></li>
                  <li> <a href="#">Shipping info</a></li>
                  <li> <a href="#">Open dispute</a></li>
                </ul>
              </aside>
              <aside className="col-md col-6">
                <h6 className="title">Account</h6>
                <ul className="list-unstyled">
                  <li> <a href="#"> User Login </a></li>
                  <li> <a href="#"> User register </a></li>
                  <li> <a href="#"> Account Setting </a></li>
                  <li> <a href="#"> My Orders </a></li>
                </ul>
              </aside>
              <aside className="col-md">
                <h6 className="title">Social</h6>
                <ul className="list-unstyled">
                  <li><a href="#"> <i className="fab fa-facebook"></i> Facebook </a></li>
                  <li><a href="#"> <i className="fab fa-twitter"></i> Twitter </a></li>
                  <li><a href="#"> <i className="fab fa-instagram"></i> Instagram </a></li>
                  <li><a href="#"> <i className="fab fa-youtube"></i> Youtube </a></li>
                </ul>
              </aside>
            </div> 
          </section>  
          <section className="footer-bottom row">
            <div className="col-md-2">
              <p className="text-muted">   2021 Kalani Hot Sauce </p>
            </div>
            <div className="col-md-8 text-md-center">
              <span  className="px-2">info@com</span>
              <span  className="px-2">+000-000-0000</span>
              <span  className="px-2">Street name 123, ABC</span>
            </div>
          </section>
        </div>
        </footer>
    </div>
  )
}

export default App