import React, { Component } from "react";
import "./App.css";
import Welcome from "./containers/Welcome";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Header from "./components/Header";
import Inbox from "./containers/Inbox";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";

class App extends Component {
  constructor() {
    super();

    this.state = {
      allUsers: [],
      allConvos: [],
      currentConvos: [],
      currentUser: {}
    };
  }

  // setCurrentUser = async() => {
  //   const response = await fetch("http://localhost:3000/messages")
  //   const apiData = await response.json()
  //   this.setState({

  //   })
  // }


  handleSubmit = (event, loginInfo) => {
    event.preventDefault();
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        user: {
          user_name: loginInfo.user_name,
          password: loginInfo.password
        }
      })
    })
    .then(resp => resp.json())
    .then(data => {
      localStorage.setItem("token", data.jwt)
    })
    .then(() => {
      // console.log('History', history)
      console.log('Window history', window.history)
      console.log('this.props.history', this.props.history)
      this.props.history.push('/inbox');
    })
 
  };
    


  render() {
    return (
        <div className="App">
          <Header />
          <div className="main">
            <Route exact path="/" component={Welcome} />
            {/* <Route exact path="/login" component={Login} handleSubmit={this.handleSubmit} /> */}
            <Route exact path="/login" render={(props) => <Login {...props} handleSubmit={this.handleSubmit} />}  />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/inbox" component={Inbox} />
  
          </div>
        </div>
    );
  }
}

export default withRouter(App);