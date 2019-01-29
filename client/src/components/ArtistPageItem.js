import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import ItemModal from '../components/ItemModal'

export default class ArtistPageItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false
        }
    }

    handleModalOpen = () => {
        this.setState({modalOpen: true})
    }

    handleModalClose = () => {
        this.setState({modalOpen: false})
    }

    render() {
        return(
            <div>
                <img onClick={this.handleModalOpen} src={this.props.item.vectorPhoto} alt={this.props.item.name} style={{width: '100%'}}/>
                <div className="featured-item-caption">
                    <p>{`${this.props.item.name} (${this.props.item.year})`}</p>
                    <p>${this.props.item.price}</p>
                </div>
                <Modal open={this.state.modalOpen} onClose={this.handleModalClose} >
                    <ItemModal 
                    loggedIn={this.props.loggedIn} 
                    displayError={this.props.displayError}
                    incrementCart={this.props.incrementCart} 
                    item={this.props.item} />
                </Modal>
            </div>
        )
    }
} 