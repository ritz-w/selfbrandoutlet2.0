import React, {Component} from 'react'
import Header from './Header'
import ArtistPageItem from '../components/ArtistPageItem'
import './ArtistPage.css'

export default class ArtistPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            artist: null,
            firstThreeItems: null,
            otherItems: null
        }
    }

    componentDidMount() {
        const selectedArtist = this.props.artists.find(artist => artist._id === this.props.match.params.artistId)
        this.setState({artist: selectedArtist})
        selectedArtist ? selectedArtist.items.length > 3 ? this.setState({firstThreeItems: selectedArtist.items.slice(0,3), otherItems: selectedArtist.items.slice(3, selectedArtist.items.length)}) : this.setState({firstThreeItems: selectedArtist.items}) : console.log("no artist loaded yet")
    }

    renderArtistInfo = () => {
        return this.state.artist ? (
            <div className="artist-container">
                <div className="artist-top-row-box">
                    <div className="artist-bio-container">
                        <div className="artist-bio-box">
                            <div className="artist-bio-top">
                                <img id="artist-bio-pic" src={this.state.artist.photo} alt={this.state.artist.name} />
                                <div className="artist-bio-intro">
                                    {this.state.artist.bio}
                                </div>
                            </div>
                            <div className="artist-bio-bottom">
                                    {this.state.artist.context}
                            </div>
                        </div>
                    </div>
                    <div className="artist-featured-items-container">
                        {this.state.firstThreeItems.map(item => {
                            return (
                                <div className="first-three-item"  key={`artist-page-item-${item._id}`}>
                                    <ArtistPageItem item={item} displayError={this.props.displayError} loggedIn={this.props.loggedIn} incrementCart={this.props.incrementCart} />
                                </div>
                            )
                        })}
                    </div>
                </div>
                {this.state.otherItems ? (
                    <div className="artist-bottom-row-box">
                        {this.state.otherItems.map(item => {
                            return (
                                <div className="artist-item-bottom" key={`artist-page-item-${item._id}`}>
                                    <ArtistPageItem displayError={this.props.displayError} loggedIn={this.props.loggedIn} incrementCart={this.props.incrementCart} item={item} />
                                </div>
                            )
                        })}
                    </div>
                ) : null}

            </div>
        ) : null
    }

    render() {
        return (
            <div>
                {this.state.artist ? 
                <Header 
                incrementCart={this.props.incrementCart} 
                headerName={this.state.artist.name} 
                artists={this.props.artists} 
                numInCart={this.props.numInCart} 
                logIn={this.props.logIn} 
                logOut={this.props.logOut} 
                user={this.props.user}
                loggedIn={this.props.loggedIn} 
                displayError={this.props.displayError}
                /> : null}
                {this.renderArtistInfo()}
            </div>
        )
    }
}