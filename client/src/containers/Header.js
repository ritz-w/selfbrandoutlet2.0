import React, {Component} from 'react'
import './Header.css'
import cartImage from '../assets/cart.png'
import {Link} from 'react-router-dom'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import Modal from 'react-responsive-modal';
import CheckoutModal from '../components/CheckoutModal'
import '../components/PaymentModalForm.css'


export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            headerName: props.headerName,
            SignupOpen: false,
            SigninOpen: false,
            CheckoutOpen: false,
            PaymentOpen: false,
            paymentProcessed: false
        }
    }

    setPaymentProcessed = () => {
        this.setState({paymentProcessed: true})
    }

    handleOpen = (modalName) => {
        this.setState({[modalName]: true})
    }


    handleClose = (modalName) => {
        this.setState({[modalName]: false})
        if (this.state.paymentProcessed) {
            this.props.incrementCart(0)
        }
    }

    componentWillMount() {
        this.setState({headerName: this.props.headerName})
    }

    renderSignIn = () => {
        return (
            <h5 onClick={() => this.handleOpen("SigninOpen")}>Sign In</h5>
        )
    }

    renderSignUp = () => {
        return (
            <h5 onClick={() => this.handleOpen("SignupOpen")}>Sign Up</h5>
        )
    }

    renderLogOut = () => {
        return (
            <h5 onClick={this.props.logOut}>Log Out</h5>
        )
    }

    openCheckout = () => {
        this.props.loggedIn ? this.props.numInCart > 0 ? this.handleOpen("CheckoutOpen") : this.props.displayError("You have no items in your cart.", true) : this.props.displayError("You must be logged in to access a shopping cart. Log in or sign up from the menu on the top right.", true)
    }

    render() {
        return (
            <div className="nav-bar">
                    <div className="site-title">
                        <Link to="/">
                        <h1>{this.state.headerName}</h1> <br/>
                        <h1>Brand</h1> <br/>
                        <h1>Outlet</h1> <br/>
                        </Link>
                    </div>
                <div className="subtitle-menu-box">
                <div className="dropdown">
                    <div className="dropdown-menu-button">Menu</div>
                    <div className="dropdown-content">
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/items">All Artworks</Link>
                        {this.props.loggedIn ? null : this.renderSignIn()} 
                        <Modal open={this.state.SigninOpen} onClose={() => this.handleClose("SigninOpen")} >
                            <SignIn logIn={this.props.logIn} closeModal={() => this.handleClose("SigninOpen")} />
                        </Modal>
                        {this.props.loggedIn ? null : this.renderSignUp()} 
                        <Modal open={this.state.SignupOpen} onClose={() => this.handleClose("SignupOpen")} >
                            <SignUp logIn={this.props.logIn} closeModal={() => this.handleClose("SignupOpen")} />
                        </Modal>    
                        {this.props.loggedIn ? this.renderLogOut() : null}                 
                    </div>
                </div>
                    <p>An exhibition</p>
                    <p>of artists' goods</p>
                    <p>in the form</p>
                    <p>of an online shop.</p>
                    <div className="cart-and-counter">
                    <h3 id="item-counter">({this.props.numInCart})</h3>
                    <img src={cartImage} id="shopping-cart-icon" alt="shopping cart" onClick={this.openCheckout}/> 
                    <Modal
                        onClose={() => this.handleClose("CheckoutOpen")}
                        open={this.state.CheckoutOpen}
                        classNames={{
                            overlay: "customOverlay"
                          }}
                    >
                        <CheckoutModal setPaymentProcessed={this.setPaymentProcessed} user={this.props.user} handleOpen={this.handleOpen} incrementCart={this.props.incrementCart} artists={this.props.artists} />
                    
                    </Modal>
                    </div>
                </div>
            </div>
        )
    }
}