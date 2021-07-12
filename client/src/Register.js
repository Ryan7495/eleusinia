import React, { Component } from 'react';
import './Register.css';
import {TextField} from '@material-ui/core';
import { register } from './Components/UserFunctions';
import farm from "./img/farm.jpeg";
import PasswordStrengthBar from 'react-password-strength-bar';
import validator from 'email-validator'

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      passcode: '',
      repasscode: '',
      error: '',
    };

    this.handleFirstChange = this.handleFirstChange.bind(this);
    this.handleLastChange = this.handleLastChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleRePassChange = this.handleRePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //TODO: fix
  async getData(){
    const url = 'http://localhost:1337/register';
    let data = await fetch(url, { method: 'POST', mode:'cors', headers: {
        'Content-Type': 'application/json'
      }
    });
    data = await data.json();
    console.log(data)
    this.setState({error: data});
  };

  handleSubmit(event) {
    event.preventDefault();

    if (!this.state.firstname) {
      return this.setState({ error: 'First name is required' });
    }

    if (!this.state.lastname) {
      return this.setState({ error: 'Last name is required' });
    }

    if (!this.state.email) {
      return this.setState({ error: 'Email is required' });
    }

    if (!this.state.passcode) {
      return this.setState({ error: 'Passcode is required' });
    }

    if (!this.state.passcode) {
      return this.setState({ error: 'Confirm Passcode is required' });
    }

    if (this.state.passcode.length < 8) {
      return this.setState({ error: 'Passcode is < 8 characters' });
    }

    if (this.state.passcode !== this.state.repasscode) {
      return this.setState({ error: 'Passcodes do not match' });
    }

    if (!validator.validate(this.state.email)) {
      return this.setState({ error: 'Email format is not valid' });
    }

    const user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      passcode: this.state.passcode
    }

    register(user).then(res => { this.props.history.push('/login') });
    //TODO: fix
    //this.getData(this.state.value).then(response => { console.log("") });
    //this.getData();
    return this.setState({ error: 'Registering account...' });
  }

  handleFirstChange(event) {
    this.setState({
      firstname: event.target.value,
    });
  };

  handleLastChange(event) {
    this.setState({
      lastname: event.target.value,
    });
  };

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

  handleRePassChange(event) {
    this.setState({
      repasscode: event.target.value,
    });
  }

  render() {
    return (
      <div className="Register" style={{height: "1024px",  backgroundImage: `url(${farm})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", paddingTop: "150px"}} >
        <form onSubmit={this.handleSubmit}>
          {
            this.state.error &&
            <h4>
              {this.state.error}
            </h4>
          }

          <h2 style={{fontWeight:"normal"}}>Register</h2>

          <TextField id="standard-basic" label="First Name" type="text" value={this.state.firstname} onChange={this.handleFirstChange} />

          <TextField id="standard-basic" label="Last name" type="text" value={this.state.lastname} onChange={this.handleLastChange} />

          <TextField id="standard-basic" label="Email" type="text" value={this.state.email} onChange={this.handleUserChange} />

          <TextField id="standard-basic" label="Passcode" type="password" value={this.state.passcode} onChange={this.handlePassChange} />

          <TextField id="standard-basic" label="Confirm Passcode" type="password" value={this.state.repasscode} onChange={this.handleRePassChange} />

          <PasswordStrengthBar password={this.state.passcode} />

          <input type="submit" value="Register" />
        </form>
      </div>
    );
  }
}

export default Register;