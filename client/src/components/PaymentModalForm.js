import React, {Component} from 'react'
import {Elements, CardElement} from 'react-stripe-elements';
import InjectedForm from './InjectedForm'

// import './PaymentModalForm.css'


export default class PaymentModalForm extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            paymentSucceeded: false,
            receiptUrl: ""
        }
    }

    paymentSuccess = (url) => {
        this.setState({paymentSucceeded: true, receiptUrl: url}, () => this.props.setPaymentProcessed()) 
    }

    renderPaymentForm = () => {
        return (
            <div>
                <div className="checkout-header">
                    <h1>Your Payment</h1>                        
                    <h3>Your total is ${this.props.totalPrice}. Since this is a demo, you should not add your real credit card details. To try out the payment functionality, Please enter these payment details below, or return to <a href="#" onClick={this.props.backToCart}>your cart</a>.</h3>                        
                    <h4>Visa: 4242 4242 4242 4242</h4> 
                    <h4>Mastercard: 5555 5555 5555 4444</h4> 
                    <h3>For CVC, enter set of numbers. For expiration, enter any random date in the future.</h3> 
                    <h3>For address and postcode, enter any random address or set of numbers.</h3> 

                </div>  
                <Elements>
                    <InjectedForm paymentSuccess={this.paymentSuccess} user={this.props.user} totalPrice={this.props.totalPrice} />
                </Elements>
            </div>
        )
    }

    renderThankYou = () => {
        return (
            <div>
                <div className="checkout-header">
                    <h1>Thank You</h1>        
                    <h3>Thank you for your purchase, {this.props.user.fullName} !</h3> 
                    <a href={this.state.receiptUrl} rel="noopener noreferrer" target="_blank">Here is your fake receipt, and a fake confirmation is being emailed to the address you provided.</a>
                    <h4>Of course, being a demo site, this wasn't a real purchase. Don't worry, nothing was charged. But thank you for trying out the payment functionality anyway ! </h4>
                </div> 
                <img id="thank-you" src="https://thumbs.gfycat.com/LikableCelebratedHart-small.gif" alt="thank you" />

            </div>
        )
    }

    render() {
        return (
            <div className="payment-modal-box">
                {this.state.paymentSucceeded ? this.renderThankYou() : this.renderPaymentForm()}
            </div>
        )
    }
}

