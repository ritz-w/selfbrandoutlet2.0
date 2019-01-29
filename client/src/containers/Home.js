import React, {Component} from 'react'
import './Home.css'
import HomeFeaturedSlider from '../components/HomeFeaturedSlider'
import HomeFeaturedItem from '../components/HomeFeaturedItem'
import HomeFeaturedArtist from '../components/HomeFeaturedArtist'
import Header from './Header'
import { Link } from 'react-router-dom'
import Modal from 'react-responsive-modal';
import ItemModal from '../components/ItemModal'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentIndex: 0,
            firstThreeItems: props.items.slice(0,3),
            firstSixItems: props.items.slice(0, 6),
            firstArtist: props.artists[3],
            secondArtist: props.artists[4],
            open: false
        }
    }

    handleOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({open: false})
    }

    nextSlide = (newIndex) => {
        this.setState({currentIndex: newIndex})
    }

    renderDesc = (index) => {
        const allArtists = this.props.items.map(item => item.artist.name)
        const allIds = this.props.items.map(item => item.artist._id)
        const allYears = this.props.items.map(item => item.year)
        const allNames = this.props.items.map(item => item.name)
        return (
            <div className="slider-desc">
                <Link to={`/artists/${allIds[index]}`}><h4>{allArtists[index]}</h4></Link>
                <h4>{allNames[index]}</h4>
                <h4>{allYears[index]}</h4>
                <Modal open={this.state.open} onClose={this.handleClose} key={`modal-item-${allIds[index]}`}>
                    <ItemModal 
                    item={this.props.items[index]} 
                    loggedIn={this.props.loggedIn} 
                    displayError={this.props.displayError}
                    incrementCart={this.props.incrementCart} 
                    key={`modal-text-${allIds[index]}`}/>
                </Modal>
            </div>
        )
    }

    renderFeaturedItems = () => {
        return this.state.firstSixItems.map(item => {
            return (
                <div key={`featured-item-${item._id}`}>
                <HomeFeaturedItem item={item} 
                    loggedIn={this.props.loggedIn} 
                    displayError={this.props.displayError}
                    incrementCart={this.props.incrementCart} />
                </div>
            )
        })
    }

    render() {
        return (
            <div className="home-container">
            <Header headerName="Self" 
            incrementCart={this.props.incrementCart} 
            loggedIn={this.props.loggedIn} 
            logIn={this.props.logIn} 
            user={this.props.user}
            logOut={this.props.logOut} 
            artists={this.props.artists} 
            displayError={this.props.displayError}
            numInCart={this.props.numInCart}
            />
                <div className="home-featured-container">
                    <div id="featured-text">Featured</div>
                    <div>
                        <HomeFeaturedSlider featuredImages={this.state.firstThreeItems} nextSlide={this.nextSlide} />
                    </div>
                    <div>{this.renderDesc(this.state.currentIndex)}</div>
                </div>
                <Link to="/items"><div id="see-all-objects-text">See All Objects</div></Link>
                <div className="home-featured-items">
                    {this.renderFeaturedItems()}
                </div>
                <div id="featured-artists-text">Featured Artists</div>
                    {this.state.firstArtist !== null ? (
                        <div className="home-featured-artists-container">
                            {this.state.firstArtist ? <HomeFeaturedArtist artist={this.state.firstArtist} /> : null}
                            <div className="featured-artist-captions">
                            {this.state.firstArtist ? (
                                <Link to={`/artists/${this.state.firstArtist._id}`}>
                                    <div id="featured-artist-caption-1">
                                        <h3>{this.state.firstArtist.name}</h3>
                                        <p>{this.state.firstArtist.bio}</p>
                                    </div>
                                </Link>
                            ) : null}
                            {this.state.secondArtist ? (
                                <Link to={`/artists/${this.state.secondArtist._id}`}>
                                    <div id="featured-artist-caption-2">
                                        <h3>{this.state.secondArtist ? this.state.secondArtist.name : null}</h3>
                                        <p>{this.state.secondArtist ? this.state.secondArtist.bio : null}</p>
                                    </div>
                                </Link>
                            ) : null}
                            </div>
                            {this.state.secondArtist ? <HomeFeaturedArtist artist={this.state.secondArtist} /> : null}
                        </div>
                    ) : "hello" }
            </div>
        )
    }
}