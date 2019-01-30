import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {StripeProvider} from 'react-stripe-elements';
import Page from './containers/Page'
require('dotenv').config()
const API_URL = process.env.REACT_APP_API_LINK

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      artists: []
    }
  }
  componentDidMount(){
    console.log(process.env.REACT_APP_API_URL)
    console.log(process.env.REACT_APP_API_LINK)
    fetch(`${API_URL}/api/items`)
    .then(res => res.json())
    .then(data => {
      this.setState({items: data}, () => {console.log(this.state.items)})
    })
    fetch(`${API_URL}/api/artists`)
    .then(res => res.json())
    .then(data => {
      this.setState({artists: data}, () => console.log(this.state.artists))
    })
  }
  render() {
    return (
      <StripeProvider apiKey="pk_test_mTzKpdoS6xfATCrQPGKKEPlg">
        <Page items={this.state.items} artists={this.state.artists} />
      </StripeProvider>
    );
  }
}

export default App;
