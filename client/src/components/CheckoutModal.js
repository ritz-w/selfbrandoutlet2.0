import React, {Component} from 'react'
import CheckoutModalItem from './CheckoutModalItem'
import './CheckoutModal.css'
import PaymentModalForm from './PaymentModalForm'
const API_URL = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000' : 'https://self-brand-outlet.herokuapp.com/';



class CheckoutModal extends Component{
    constructor(props) {
        super(props)
        this.state = {
            cartData: "",
            cartItems: "",
            totalQty: "",
            totalPrice: '',
            paymentOpen: false
        }
    }

    componentDidMount(){
        let cartData = JSON.parse(sessionStorage.getItem('cart'))
        let cartItemsHash = !!cartData.items ? cartData.items : {}
        let cartItems = []
        for (let key in cartItemsHash) {
            cartItems.push(cartItemsHash[key]);
        }
        this.setState({cartData: cartData, cartItems: cartItems, totalPrice: cartData.totalPrice, totalQty: cartData.totalQty})
    }

    handleIncrementItem = (item, addOrMinus) => { 
        let cartData = JSON.parse(sessionStorage.getItem('cart'))
        fetch(`${API_URL}/api/items/${item.item._id}/update-cart`, 
        {
          headers: {
            'authorization': `JWT ${sessionStorage.accessToken}`,
            "Content-Type": "application/json"
          },
          method: "PUT",
          body: JSON.stringify({sessionCart: cartData, addOrMinus: addOrMinus})
        })
        .then(res => res.json())
        .then(data => {
            sessionStorage.setItem('cart', JSON.stringify(data.cart))
            let updatedCart = JSON.parse(sessionStorage.getItem('cart'))
            console.log(updatedCart)
            this.props.incrementCart(updatedCart.totalQty)
        })
      }

    renderCheckoutItems = () => {
        return this.state.cartItems ? (
            this.state.cartItems.map(item => {
                let artist = this.props.artists.find(artist => artist._id === item.item.artist)
                return <CheckoutModalItem key={`checkout-modal-${item.item._id}`} handleIncrementItem={this.handleIncrementItem} item={item} artist={artist} />
            })
        ) : null
    }

    backToCart = () => {
        this.setState({paymentOpen: false})
    }

    render() {
        return (
            <div className="checkout-modal-container">    
            <script src="https://js.stripe.com/v3/"></script>
    
                    {this.state.paymentOpen ? 
                        (
                        <PaymentModalForm setPaymentProcessed={this.props.setPaymentProcessed} user={this.props.user} backToCart={this.backToCart} totalPrice={this.state.totalPrice} />
                        )
                        : 
                        (
                        <div> 
                            <div className="checkout-header">
                                <h1>Checkout</h1>
                            </div>  
                            <div className="checkout-items-container">
                                {this.renderCheckoutItems()}
                            </div>
                            <div className="checkout-modal-subtotal">
                                <div>
                                    <h2>Number of Items: {this.state.totalQty}</h2>
                                    <h2>Subtotal: {this.state.totalPrice}</h2>
                                </div>
                                <div className="checkout-button-section">
                                    <div onClick={() => this.setState({paymentOpen: true})}className="checkout-offset" id="checkout-button">
                                        <h1>To Payment</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ) 
                    }

            </div>
        )
    }
}

export default CheckoutModal;
