import React, { Component } from 'react'
import './SignIn.css'

export default class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            errorMsg: ""
        }
    }

    handleEmailChange = (userInput) => {
        this.setState({email: userInput})
    }

    handlePasswordChange = (userInput) => {
        this.setState({password: userInput})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // let formData = new URLSearchParams()
        // formData.append('email', this.state.email);
        // formData.append('password', this.state.password);
        let formData = {
            email: this.state.email,
            password: this.state.password
        }
        fetch('http://localhost:5000/auth/sign_in', 
        {
            headers: {
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(formData),
            json: true
        }).then(res => res.json())
        .then(data => {
            if (data.token) {
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
            <div className="signin-modal-box">
                <form className="auth-form">
                    <h3>Welcome back! Please Sign In.</h3>
                    <p>Email</p>
                    <input type="text" onChange={(e) => this.handleEmailChange(e.target.value)} value={this.state.email}/>
                    <p>Password</p>
                    <input type="password" onChange={(e) => this.handlePasswordChange(e.target.value)} value={this.state.password} />
                    <br />
                    <br />
                    <br />
                    <button type="submit" onClick={(e) => this.handleSubmit(e)}>Submit</button>
                    <p>{this.state.errorMsg}</p>
                </form>
            </div>
        )
    }
}

