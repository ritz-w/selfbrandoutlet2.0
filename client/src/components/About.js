import React from 'react'
import Header from '../containers/Header'
import './About.css'

const About = (props) => {
    return (
        <div>
            <Header headerName="Self" 
            artists={props.artists} 
            incrementCart={props.incrementCart} 
            numInCart={props.numInCart} 
            loggedIn={props.loggedIn} 
            user={props.user}
            displayError={props.displayError}
            logIn={props.logIn} 
            logOut={props.logOut} />
            <div className="essay-box">
                <p>
                Art and commerce, have a fraught, slightly awkward relationship. In its traditional function of preserving certain ideas deemed worth transmitting by its patrons, art has not always been willing to treat our more banal market transactions as a formal subject. And yet, as objects, works of art have always been inseparable from the market itself. Since the advent of modernity, marked by the Renaissance, artists have increasingly turned their eye toward that Promethean, profane muse of today - Capitalism. However, the explicit recognition, even embrace of artists of their objects as items at the mercy of supply, demand, and its fickle tides is a distinctly contemporary phenomenon. 
                </p>
                <p>
                Particularly in the 1960s to 1980s, mass media and advertising culture gave a lively visual identity to the spirit of mass production. Cheap, easy, and ubiquitous - promising problem-free, democratised access to goods - the psychology of consumption was to change forever, across the world. Artists too, would come to borrow critically from this language, at a crucial point when the excesses of wealth of the time brought about a golden age in art. The exercise of self-marketing, branding, and promotion became a necessary form of artistic expression and communication. Not only a few artists would come to appreciate this with a strongly ironic, or critical lens.
                </p>
                <p>
                Now, in 2019, as we continue to grapple with the consequences of the excess of the last century, this exhibition of works (e-shop) brings together projects both historical and contemporary. It surveys these different lenses through which artists have approached the idea of commerce - whether using its visual culture or means in order to make a statement about it, or co-opting it for other, frequently less cynical purposes. Particularly as the internet has again fundamentally changed mass communication and its culture, how are artists re-engaging with ideas of self-promotion, self-branding, and what it means to sell or be sold?
                </p>
                <p>
                We invite you to consider how this question has been approached across cultures and generations with different degrees of darkness and levity.
                </p>
            </div>
        </div>
    )
}

export default About;