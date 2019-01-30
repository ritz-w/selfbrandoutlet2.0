import React, {Component} from 'react'
import './Page.css'
import Home from './Home'
import AllItems from './AllItems'
import ArtistPage from './ArtistPage'
import About from '../components/About'
import Footer from '../components/Footer'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
const jwt = require('jsonwebtoken')


export default class Page extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isError: false,
            loggedIn: false,
            user: null,
            numInCart: 0,
            message: "",
            messageShown: false
        }
    }


    componentDidMount() {
        const token = sessionStorage.getItem('accessToken')
        this.handleSignIn(token)
    }

    incrementCart = (newTotal) => {
        this.setState({numInCart: newTotal}, () => console.log(this.state.numInCart)) 
        this.displayError("Your cart has been updated.")
        if (newTotal === 0) {
            sessionStorage.removeItem('cart')
           if (!sessionStorage.getItem('cart') === true) {
                JSON.parse(sessionStorage.getItem('cart'))
           } else {
               sessionStorage.setItem('cart', JSON.stringify({items: {}, totalQty: 0, totalPrice: 0}))
           }
           console.log(JSON.parse(sessionStorage.getItem('cart')))

        }
    }

    displayError = (errorMessage, isError) => {
        isError ? this.setState({isError: true}) : this.setState({isError: false})
        this.setState({message: errorMessage, messageShown: true})
        setTimeout(() => {this.setState({messageShown: false})}, 3000)
    }

    handleSignOut = () => {
        sessionStorage.clear();
        this.setState({loggedIn: false, user: null, numInCart: 0}, () => console.log('Logged In: ' + this.state.loggedIn))
    }

    handleSignIn = (token) => {
        jwt.verify(token, 'RESTFULAPIs', (err, decode) => {
            if (err) {
                console.log(err)
            } else if (decode) {
                this.setState({loggedIn: true, user: decode}, () => console.log('Logged In: ' + this.state.loggedIn))
                const sessionCart = (!!sessionStorage.getItem('cart') === true)? JSON.parse(sessionStorage.getItem('cart')) : {items: {}, totalQty: 0, totalPrice: 0}
                console.log(sessionCart)
                this.setState({numInCart: !!sessionCart ? sessionCart.totalQty : 0})
            }
        })
    }

    render() {
        return (
            <div className="page-container">
                <div className={this.state.messageShown ? "alert shown" : 'alert hidden'} style={this.state.isError ? {backgroundColor: 'lightcoral', border: '1px solid red'} : {backgroundColor: 'lightgreen', border: '1px solid green'}}>
                    <span className="closebtn" onClick={(e) => this.setState({messageShown: false})}>&times;</span> 
                    {this.state.message}
                </div>
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/" component={(routerProps) => 
                        <Home items={this.props.items} 
                            artists={this.props.artists} 
                            user={this.state.user}
                            loggedIn={this.state.loggedIn} 
                            displayError={this.displayError}
                            logOut={this.handleSignOut} 
                            logIn={this.handleSignIn} 
                            {...routerProps} 
                            numInCart={this.state.numInCart}
                            incrementCart = {this.incrementCart}
                            />}/>

                        <Route exact path="/items" component={() => 
                        <AllItems items={this.props.items} 
                        loggedIn={this.state.loggedIn} 
                        displayError={this.displayError}
                        logOut={this.handleSignOut} 
                        artists={this.props.artists} 
                        logIn={this.handleSignIn} 
                        user={this.state.user}
                        numInCart={this.state.numInCart} 
                        incrementCart = {this.incrementCart}
                        />}/>

                        <Route exact path="/about" component={() => 
                        <About loggedIn={this.state.loggedIn}  
                        logOut={this.handleSignOut} 
                        artists={this.props.artists} 
                        numInCart={this.state.numInCart} 
                        displayError={this.displayError}
                        user={this.state.user}
                        incrementCart = {this.incrementCart}
                        logIn={this.handleSignIn} />} />
                        
                        <Route exact path="/artists/:artistId" component={(routerProps) => 
                        <ArtistPage {...routerProps} 
                        loggedIn={this.state.loggedIn} 
                        logOut={this.handleSignOut} 
                        displayError={this.displayError}
                        logIn={this.handleSignIn} 
                        artists={this.props.artists} 
                        changeName={this.changeName} 
                        user={this.state.user}
                        numInCart={this.state.numInCart}
                        incrementCart = {this.incrementCart}
                        />}/>
                    </Switch>
                    <Footer />
                </div>
            </BrowserRouter>
            </div>
        )
    }
}