import React, { Component } from 'react';
import './App.css';
import About from './About';
import { Route, Switch } from 'react-router-dom';
import Navbar from "./Navbar";
import Boxes from "./Boxes";
import Recipes from "./Recipes";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Footer from "./Footer";
import Cart from "./Cart";

class App extends Component
{

    constructor(props) 
    {    
        super(props);    
        this.state = {}    
        this.connecToServer = this.connecToServer.bind(this);  
    }

    connecToServer() 
    { 
        //fetch('/');
        fetch('http://localhost:1337/');
        //fetch('http://localhost:1337/users/login');  
    }

    componentDidMount() 
    { 
        this.connecToServer(); 
        console.log('Connecting to server.');
    }



    /*
    state =
    {
        data: null
    };

    callBackendAPI = async () => {
        const response = await fetch('/');
        const body = await response.json();

        if (response.status !== 200) { throw Error(body.message) }
        return body;
    }

    componentDidMount() 
    {// Call our fetch function below once the component mounts
        this.callBackendAPI()
        .then(res => this.setState({ data: res.express }))
        .catch(err => console.log(err));
    }
    */

    render ()
    {
        return (
        <main style={{minHeight: "100vh"}}>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/boxes" component={Boxes} />
                <Route path="/recipes" component={Recipes} />
                <Route path="/cart" component={Cart} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Switch>
            <Footer />
        </main>
        );
    }
}


export default App;