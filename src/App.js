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
          () => console.log(this.state.currentUser)
        );
      })
      .then(() => {
        this.props.history.push("/inbox");
      })


      .then(() => {
        fetch(
          `http://localhost:3000/conversations?user=${this.state.currentUser.id}`
        )
          .then(resp => resp.json())
          .then(apiData => {
            this.setState(
              {
                conversations: apiData
              },
              () => console.log(apiData)
            );
          });
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
    const response = await fetch(`http://localhost:3000/conversations?user=${this.state.currentUser.id}`)
    const apiData = await response.json()
    this.setState({
      currentUserConvos: apiData
    },() => console.log(apiData))
  }

  componentDidMount(){
    this.fetchCurrentUserConvos()
  }
  // fetchUsers = async() => {
  //   const response = await fetch("http://localhost:3000/users")
  //   const apiData = await response.json()
  //   this.setState({
  //     users: apiData
  //   })
  // }

  // fetchConversations = async() => {
  //   const response = await fetch("http://localhost:3000/conversations")
  //   const apiData = await response.json()
  //   this.setState({
  //     conversations: apiData
  //   },() => console.log(apiData))
  // }


  // componentDidMount() {
  //   fetch("http://localhost:3000/users")
  //     .then(res => res.json())
  //     .then(result => {
  //       this.setState({
  //         users: result["users"]
  //       });
  //     });

  //   fetch("http://localhost:3000/messages")
  //     .then(res => res.json())
  //     .then(result => {
  //       this.setState({
  //         messages: result["messages"]
  //       });
  //     });

  //   fetch("http://localhost:3000/conversations")
  //     .then(res => res.json())
  //     .then(result => {
  //       // let filteredConvos = result["data"].filter(convo => convo.attributes.receiver_id === 8)
  //       // let convoWithUsername = filteredConvos.map{(convo) => convo}
  //       this.setState({
  //         // conversations: filteredConvos
  //         // later we'll use current user's ID instead of 8 to filter
  //       });
  //     });
  // }

  render() {
 
    return (
      <div className="App">
        <Header />
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
                <Inbox {...props} myConvos={this.state.currentUserConvos} />
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
