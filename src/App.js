import React, { Component } from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Header from "./containers/Header";
import Inbox from "./components/Inbox";
import ShowConvo from "./components/ShowConvo";
import NewConvo from "./components/NewConvo";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentConvos: [],
      users: [],
      messages: [],
      conversations: [],
      currentUser: {
        id: "",
        user_name: "",
        nationality: "",
        language: ""
      }
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
          () => console.log(this.state.currentUser)
        );
      })
      .then(() => {
        // console.log('Window history', window.history)
        // console.log('this.props.history', this.props.history)

        this.props.history.push("/inbox");
      });
  };

  handleSignupSubmit = (event, SignupInfo) => {
    event.preventDefault();
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          user_name: SignupInfo.user_name,
          password: SignupInfo.password,
          language: SignupInfo.language,
          nationality: SignupInfo.nationality
        }
      })
    })
      .then(resp => resp.json())
      .then(() => {
        console.log("Window history", window.history);
        console.log("this.props.history", this.props.history);
        this.props.history.push("/inbox");
      });
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/");
    this.setState({
      currentUser: {}
    });
  };

  componentDidMount() {
    fetch("http://localhost:3000/users")
      .then(res => res.json())
      .then(result => {
        this.setState({
          users: result["users"]
        });
      });

    fetch("http://localhost:3000/messages")
      .then(res => res.json())
      .then(result => {
        this.setState({
          messages: result["messages"]
        });
      });

    fetch("http://localhost:3000/conversations")
      .then(res => res.json())
      .then(result => {
        // let filteredConvos = result["data"].filter(convo => convo.attributes.receiver_id === 8)
        // let convoWithUsername = filteredConvos.map{(convo) => convo}
        this.setState({
          // conversations: filteredConvos
          // later we'll use current user's ID instead of 8 to filter
        });
      });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="main">
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
              <Signup {...props} handleSignupSubmit={this.handleSignupSubmit} />
            )}
          />

          <Route exact path="/inbox" component={Inbox} />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
