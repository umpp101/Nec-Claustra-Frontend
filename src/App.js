import React, { Component } from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Header from "./containers/Header";
import Inbox from "./components/Inbox";
import ShowConvo from "./components/ShowConvo";
import NewConvo from "./components/NewConvo";
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Redirect,
  Switch
} from "react-router-dom";

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUserConvos: [],
      users: [],
      messages: [],
      conversations: [],
      currentUser: {}
    };
  }


  
  handleLoginSubmit = (event, loginInfo) => {
    event.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          user_name: loginInfo.user_name,
          password: loginInfo.password
        }
      })
    })
      .then(resp => resp.json())
      .then(data => {
        localStorage.setItem("token", data.jwt);
        this.setState(
          {
            currentUser: {
              id: data.user.data.attributes.id,
              user_name: data.user.data.attributes.user_name,
              language: data.user.data.attributes.language,
              nationality: data.user.data.attributes.nationality
            }
          },
          // () => console.log(this.state.currentUser)
        );
      })
      .then(() => {
        // fetch(
        //   `http://localhost:3000/conversations?user=${this.state.currentUser.id}`
        // )
        //   .then(resp => resp.json())
        //   .then(apiData => {
        //     this.setState(
        //       {
        //         conversations: apiData
        //       },
        //      // () => console.log(apiData)
        //     );
        //   });
        this.fetchCurrentUserConvos();
      })
      .then(() => {
        this.props.history.push("/inbox");
      });


  };

  handleSignupSubmit = (event, SignupInfo) => {
    event.preventDefault();
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: SignupInfo
      })
    })
      .then(resp => resp.json())
      .then(resp => {
        localStorage.setItem("token", resp.jwt);
        this.setState({
          currentUser: {
            id: resp.user.data.attributes.id,
            user_name: resp.user.data.attributes.user_name,
            language: resp.user.data.attributes.language,
            nationality: resp.user.data.attributes.nationality
          }
        });
      })
      .then(() => {
        this.props.history.push("/inbox");
      })
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/");
    this.setState({
      currentUser: {}
    });
  };
  

  fetchCurrentUserConvos = async() => {
    const response = await fetch(`http://localhost:3000/myconvos/${this.state.currentUser.id}`,{
      method: 'GET',
      headers: {
       'Authorization': localStorage.getItem('token'),
       'Content-Type': 'application/json',
       'Accept': 'application/json'
      }
    })
    const apiData = await response.json()
    console.log(response)
    // this.setState({
    //   currentUserConvos: apiData
    // })
  }


  render() {
 
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser} />
        <div className="main">
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route
              exact
              path="/login"
              render={props => (
                <Login {...props} handleLoginSubmit={this.handleLoginSubmit} />
              )}
            />
            <Route
              exact
              path="/signup"
              render={props => (
                <Signup
                  {...props}
                  handleSignupSubmit={this.handleSignupSubmit}
                />
              )}
            />
            {Object.keys(this.state.currentUser).length !== 0 ? (
              <Route
              exact
              path="/inbox"
              render={props => (
                <Inbox {...props} currentUserConvos={this.state.currentUserConvos} />
              )}
            />
            ) : (
              <Redirect to="/login" />
            )}
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
