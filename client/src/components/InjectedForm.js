import React, { Component } from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'

class InjectedForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: "",
            shippingAddress: "",
            city: "",
            country: "",
            cardholderName: "",
            buttonClicked: false
        }
    }

    handleInput = (field, userInput) => {
        this.setState({[field]: userInput})
    }

    sendPayment = () => {
        this.setState({buttonClicked: true})
        this.props.stripe.createToken({name: this.state.name, address_line1: this.state.shippingAddress, address_city: this.state.city, address_country: this.state.country})
        .then(({token}) => {
            console.log(token)
            fetch('http://localhost:5000/api/items/checkout', {
                headers: {
                'authorization': `JWT ${sessionStorage.accessToken}`,
                "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    amount: this.props.totalPrice, 
                    currency: "usd", 
                    description: `Checkout by ${this.props.user.fullName}`, 
                    source: token.id})
            })
            .then(res => res.json())
            .then(charge => {
                console.log(charge)
                this.props.paymentSuccess(charge.charge.receipt_url)
            }
            )
          });

    }

    render() {
        return (
            <form action='/' method="post" id="payment-form">
            <div className="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" onChange={(e) => this.handleInput('name', e.target.value)} placeholder="e.g., Jane Smith" className="form-control" required />
            </div>
            <div className="form-group">
                <label for="address">Shipping Address</label>
                <input type="text" id="address" onChange={(e) => this.handleInput('shippingAddress', e.target.value)} placeholder="e.g., 100 Main St." className="form-control" required />
                <input type="text" id="city" onChange={(e) => this.handleInput('city', e.target.value)} placeholder="e.g., New York" className="form-control" required />
                <input type="text" id="country" onChange={(e) => this.handleInput('country', e.target.value)} placeholder="e.g., USA" className="form-control" required />
            </div>
            <div className="form-group">
                <label for="cardholder-name">Cardholder Name</label>
                <input type="text" id="cardholder-name" onChange={(e) => this.handleInput('cardholderName', e.target.value)} placeholder="Cardholder Name" className="form-control" required />
            </div>

            <div className="card-details-section">
                <label for="card-details">Card Details (Do not enter your real details!)</label>
                <CardElement style={{base: {fontSize: '15px'}}} />
            </div>
            <div className="pay-button-section">
                <div className="pay-offset" id="pay-button"  onClick={this.state.buttonClicked ? null : this.sendPayment}>
                    <h1>{this.state.buttonClicked ? "Please Wait..." : "Buy Now"}</h1>
                </div>
            </div>
        </form>
        )
    }
}

export default injectStripe(InjectedForm);
