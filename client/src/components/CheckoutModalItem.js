import React from 'react'

const CheckoutModalItem = (props) => {
    return (
        <div className="checkout-modal-outer">
            <div className="checkout-modal-item">

                <div className="checkout-modal-item-image">
                    <img src={props.item.item.vectorPhoto} alt={props.item.item.name} />
                </div>
                <div className="checkout-modal-item-text">
                    <p>{props.item.item.name}</p>
                    <p>{props.artist.name}</p>
                </div>
                <div className="checkout-modal-item-summary">
                    <p>Price: {props.item.price}</p>
                    <p>Quantity: {props.item.qty}</p>
                    <div id="item-count-adjuster">
                    <div id="item-count-minus" onClick={() => props.handleIncrementItem(props.item, "minus")}>
                        - 
                    </div>
                    <div id="item-count-plus" onClick={() => props.handleIncrementItem(props.item, "add")}>
                        + 
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutModalItem;