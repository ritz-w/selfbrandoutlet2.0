import React, {Component} from 'react'
import './AllItems.css'
import AllItemsItem from '../components/AllItemsItem'
import Header from './Header'

export default class AllItems extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayItems: props.items
        }
    }
    renderItems = () => {
        return this.state.displayItems.map(item => <AllItemsItem key={'item-modal-' + item._id} displayError={this.props.displayError} loggedIn={this.props.loggedIn} incrementCart={this.props.incrementCart} item={item} />)
    }

    filterBySearch = (searchTerm) => {
        let searchResults = this.props.items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.artist.name.toLowerCase().includes(searchTerm.toLowerCase()))
        this.setState({displayItems: searchResults}, () => console.log(searchResults))
    }
    render() {
        return (
            <div>
                <Header headerName="Self" 
                incrementCart={this.props.incrementCart} 
                artists={this.props.artists} 
                numInCart={this.props.numInCart} 
                loggedIn={this.props.loggedIn} 
                logIn={this.props.logIn} 
                user={this.props.user}
                displayError={this.props.displayError}
                logOut={this.props.logOut} />
                <div className="all-items-header">
                    <div>
                        <input type="text" placeholder="Search" id="search-input" onChange={(e) => this.filterBySearch(e.target.value)} />
                    </div>
                    <div id="all-works-text">All Works</div>
                </div>
                <div className="all-items-container">
                {this.renderItems()}
                </div>
            </div>
        )
    }
}