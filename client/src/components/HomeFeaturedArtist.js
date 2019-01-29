import React from 'react'
import { Link } from 'react-router-dom'

const HomeFeaturedArtist = (props) => {
    return (
        <Link to={`/artists/${props.artist._id}`}>
        <div className="featured-artist">
            <div className="featured-artist-image-container">
            <img className="featured-artist-image" src={props.artist.photo} alt={props.artist.name} />
            </div>
        </div>
        </Link>
    )
}

export default HomeFeaturedArtist;