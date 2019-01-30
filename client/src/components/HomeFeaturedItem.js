import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-responsive-modal';
import ItemModal from '../components/ItemModal'

export default class HomeFeaturedItem extends Component {
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
            <div className="featured-item">
                <div className="featured-item-image-container" onClick={this.handleOpen}>
                    <img src={this.props.item.vectorPhoto} alt={this.props.item._id} />
                </div>
                <Modal open={this.state.open} onClose={this.handleClose} >
                    <ItemModal 
                    loggedIn={this.props.loggedIn} 
                    displayError={this.props.displayError}
                    item={this.props.item} 
                    incrementCart={this.props.incrementCart} />
                </Modal>
                <div className="featured-item-caption">
                    <p>{this.props.item.name}</p>
                    <Link to={`/artists/${this.props.item.artist._id}`}><p className="link">{this.props.item.artist.name}</p></Link>
                    <p>${this.props.item.price}</p>
                </div>
            </div>
        )
    } 
}
