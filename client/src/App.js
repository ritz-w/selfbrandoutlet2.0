import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {StripeProvider} from 'react-stripe-elements';
import Page from './containers/Page'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      artists: []
    }
  }
  componentDidMount(){
    fetch('http://localhost:5000/api/items')
    .then(res => res.json())
    .then(data => {
      this.setState({items: data}, () => {console.log(this.state.items)})
    })
    fetch('http://localhost:5000/api/artists')
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
