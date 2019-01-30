import React, {Component} from 'react'
import './ItemModal.css'
const API_URL = (process.env.NODE_ENV === 'development') ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL;

export default class ItemModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayedImage: 'vectorPhoto',
      clicked: false
    }
  }

  handleSwitch = (photoType) => {
    this.setState({displayedImage: photoType})
  }

  handleClicked = () => {
    this.setState({clicked: true})
  }

  handleAddToCart = () => { 
    if (this.props.loggedIn) {
      this.handleClicked()
      if (!sessionStorage.getItem('cart')) {
        console.log('resetting cart')
        sessionStorage.setItem('cart', JSON.stringify({items: {}, totalQty: 0, totalPrice: 0}))
      }
      let cartData = JSON.parse(sessionStorage.getItem('cart'))
      console.log(cartData)
      fetch(`${API_URL}/api/items/${this.props.item._id}/add-to-cart`, 
      {
        headers: {
          'authorization': `JWT ${sessionStorage.accessToken}`,
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({sessionCart: cartData})
      })
      .then(res => res.json())
      .then(data => {
        sessionStorage.setItem('cart', JSON.stringify(data.cart))
        let updatedCart = JSON.parse(sessionStorage.getItem('cart'))
        console.log(updatedCart)
        this.props.incrementCart(updatedCart.totalQty)
      })
    } else {
      this.props.displayError("You must be logged in to shop for items.", true)
    }
  }

  render() {
    return (
      <div className="modal-box">
          <div className="modal-item-container">
            <div className="modal-item-column">
              <h2>{this.props.item.name}</h2>
              <div className="modal-image-box">
                <img src={this.state.displayedImage === "vectorPhoto" ? this.props.item.vectorPhoto : this.props.item.contextPhoto} alt={this.props.item.name} />
              </div>
              <div className="image-toggler-box">
                <div className="image-toggler">
                  <img src={this.props.item.vectorPhoto} alt={this.props.item.name} onClick={() => this.handleSwitch('vectorPhoto')} />
                </div>
                <div className="image-toggler">
                  <img src={this.props.item.contextPhoto} alt={this.props.item.name} onClick={() => this.handleSwitch('contextPhoto')} />
                </div>
              </div>
            </div>
            <div className="modal-item-column">
              <p className="item-desc-text">{this.props.item.desc}</p>
              <div>
                <div className={this.state.clicked ? "clicked-offset" : "offset"} id="add-cart-button" onClick={this.handleAddToCart}>
                  <h1>{this.state.clicked ? " ✓ Item Added"  : "Add To Cart"}</h1>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

