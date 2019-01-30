import React, { Component } from 'react'
import './SignIn.css'
const API_URL = (process.env.NODE_ENV === 'development') ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL;

export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            fullName: "",
            errorMsg: "",
            clicked: false
        }
    }

    handleClick = () => {
        this.state.clicked ? this.setState({clicked: false}) : this.setState({clicked: true})
    }

    handleFieldChange = (userInput, field) => {
        this.setState({[field]: userInput}, () => console.log(this.state))
    }

    handleSubmit = (e) => {
        this.handleClick()
        e.preventDefault()
        fetch(`${API_URL}/auth/items`, 
        {
            headers: {
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({fullName: this.state.fullName, email: this.state.email, password: this.state.password}),
            json: true
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.email) {
                console.log("successfully signed up, now logging in")
                fetch(`${API_URL}/auth/signin`, 
                {
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({email: data.email, password: this.state.password}),
                    json: true
                }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.token) {
                        console.log("now logging in")
                        sessionStorage.accessToken = data.token;
                        this.props.logIn(data.token)
                        this.props.closeModal()
                    } else {
                        this.setState({errorMsg: data.message})
                    }
                })
                sessionStorage.accessToken = data.token;
                this.props.logIn(data.token)
                this.props.closeModal()
            } else {
                this.setState({errorMsg: data.message, email: "", password: ""})
            }
        })
    }

    render() {
        return (
            <div className="signup-modal-box">
                <form className="auth-form">
                    <h3>Welcome to Self Brand Outlet!</h3>
                    <h3>Please fill in the following details to sign up for an account.</h3>
                    <p>Full Name</p>
                    <input type="text" onChange={(e) => this.handleFieldChange(e.target.value, "fullName") } />
                    <p>Email</p>
                    <input type="text" onChange={(e) => this.handleFieldChange(e.target.value, "email") } />
                    <p>Password</p>
                    <input type="password" onChange={(e) => this.handleFieldChange(e.target.value, "password") }/>
                    <br />
                    <br />
                    <br />
                    <button type="submit" onClick={(e) => this.handleSubmit(e)}>{this.state.clicked ? "Loading" : "Submit"}</button>
                    <p>{this.state.errorMsg}</p>
                </form>
            </div>
        )
    }
}