import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-responsive-modal';
import ItemModal from '../components/ItemModal'

class AllItemsItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    handleOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({open: false})
    }

    render() {
        return (
            <div className="index-item">
                <Modal open={this.state.open} onClose={this.handleClose} >
                    <ItemModal 
                    loggedIn={this.props.loggedIn} 
                    displayError={this.props.displayError}
                    incrementCart={this.props.incrementCart} 
                    item={this.props.item} />
                </Modal>
                <div className="index-item-image-container" onClick={this.handleOpen}>
                        <img src={this.props.item.vectorPhoto} alt={this.props.item._id} />
                    </div>
                <div className="index-item-caption">
                    <p>{this.props.item.name}</p>
                    <Link to={`/artists/${this.props.item.artist._id}`}><p>{this.props.item.artist.name}</p></Link>
                    <p>${this.props.item.price}</p>
                </div>
            </div>
        )
    }
}

export default AllItemsItem;