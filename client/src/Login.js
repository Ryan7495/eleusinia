import React, { Component } from 'react';
import './Login.css';
import {TextField} from '@material-ui/core';
import farm from "./img/farm.jpeg";
import { login } from './Components/UserFunctions';
import validator from 'email-validator'
//const validator = require("email-validator")
//import { router } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      passcode: '',
      error: '',
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!this.state.email) {
      return this.setState({ error: 'Email is required' });
    }

    if (!this.state.passcode) {
      return this.setState({ error: 'Passcode is required' });
    }

    if (!validator.validate(this.state.email)) {
      return this.setState({ error: 'Email format is not valid' });
    }

    const user = 
    {
      email: this.state.email,
      passcode: this.state.passcode
    }
    login(user).then(res => { if (res) { this.props.history.push('/boxes') } })
    return this.setState({ error: 'Logging you in...' });
  }

  handleUserChange(event) {
    this.setState({
      email: event.target.value,
    });
  };

  handlePassChange(event) {
    this.setState({
      passcode: event.target.value,
    });
  }

  handleRegister(event) { this.props.history.push("/register"); }

  // Farm photo from https://unsplash.com/photos/IQVFVH0ajag on March 27

  render() {
    return (
      <div className="Login" style={{height: "1024px",  backgroundImage: `url(${farm})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", paddingTop: "150px"}} >
        <form>
          {
            this.state.error &&
            <h4>
              {this.state.error}
            </h4>
          }
          <h2 style={{fontWeight:"normal"}}>Login</h2>
          
          <TextField id="standard-basic" label="Email" type="text" value={this.state.email} onChange={this.handleUserChange} />
          <TextField id="standard-basic" label="Passcode" type="password" value={this.state.passcode} onChange={this.handlePassChange} style={{marginBottom: "15px"}}/>

          <input type="submit" value="Log In" onClick={this.handleSubmit}/>
          <button type="register" onClick={this.handleRegister.bind(this)}>Register</button>
        </form>
      </div>
    );
  }
}

export default Login;