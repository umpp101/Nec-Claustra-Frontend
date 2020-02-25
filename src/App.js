import React, { Component } from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Header from "./containers/Header";
import Inbox from "./components/Inbox";
// import ShowConvo from "./components/ShowConvo";
// import NewConvo from "./components/NewConvo";
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
      currentUser: {},
      currentUserConvos: [],
      currentConvo: {},
      allUsers: [],
      // messages: [],
      // conversations: [],
    }
    this.socket = undefined;
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
        this.fetchUsers();
      })
      .then(() => {
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

  componentDidMount() {
    this.fetchUsers()

    if (localStorage.getItem("token") !== null) {

      fetch("http://localhost:3000/reAuth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          'Authorization': localStorage.getItem("token")
        }
      })
        .then(res => res.json())
        .then((data) => {
          console.log(data);
          this.setState({
            currentUser: {
              id: Number(data.user.data.id),
              ...data.user.data.attributes
            }
          })
        })
      // .then(() => this.fetchPosts())
      // .then(() => this.fetchcurrentUserConvos())

    }
  }

  handleLogout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/");
    this.setState({
      currentUser: {}
    });
  };


  fetchCurrentUserConvos = async () => {
    const response = await fetch(`http://localhost:3000/users/${this.state.currentUser.id}/conversations`)
    const apiData = await response.json()
    // console.log(apiData)
    this.setState({
      currentUserConvos: apiData.conversations
    })
  }

  fetchUsers = async () => {
    const response = await fetch("http://localhost:3000/users")
    const apiData = await response.json();
    let users = apiData.data.map(el => el.attributes)
    // console.log( users)
    this.setState({
      allUsers: users,
      loading: false
    })
  }

  openWsConnection = async () => {
    this.socket = new WebSocket("ws://localhost:3000/cable");

    this.socket.onopen = (e) => {
      // console.log(e);
      console.log("Starting to send to server");
      let msg = {
        command: 'subscribe',
        identifier: JSON.stringify({
          channel: "ChatChannel"
        })
      }
      this.socket.send(JSON.stringify(msg))

    }

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log(data)
      // check to see if our typed message id exists in our "my convos" or currentConvo.messages before we set state
      if (data.type == "confirm_subscription") {
        const message = {
          command: 'message',
          identifier: JSON.stringify({
            channel: "ChatChannel"
          }),
          data: JSON.stringify({
            action: 'convo_connector',
            message: JSON.stringify({
              user_id: this.state.currentUser.id
            })
          })
        }
        this.socket.send(JSON.stringify(message))
      } else if (this.state.currentConvo.messages) {


        let currentConvoIds = this.state.currentConvo.messages && this.state.currentConvo.messages.map(msg => (msg.id))
        // let myConvoIds = this.state.currentUserConvos.messages.map(msg => (msg.id))
        console.log("first condition:", data.message !== undefined)
        console.log("second condition:", !!data.message.true_message === true)
        console.log(data)
        // console.log("third condition:", !currentConvoIds.includes(data.message.true_message.id))

        if (data.message !== undefined && !!data.message.true_message === true && !currentConvoIds.includes(data.message.true_message.id)) {


          let convos = this.state.currentUserConvos.map(convo => {
            if (convo.id === this.state.currentConvo.id) {
              convo.messages = [...convo.messages, data.message.true_message]
              return convo
            } else {
              return convo
            }
          });
          if (Object.keys(this.state.currentConvo).length > 0) {
            let newConvo = { ...this.state.currentConvo }


            newConvo.messages = [...newConvo.messages, data.message.true_message]
            this.setState({
              currentUserConvos: convos,
              currentConvo: newConvo
            })
          } else {
            this.setState({
              currentUserConvos: convos
            })
          }
        }
      };

    }
    this.socket.onerror = (error) => {
      console.log(`[error] ${error.message}`);
    };
  }
  handleSendEvent = (message, event) => {
    event.preventDefault()
    console.log(this.socket)
    const msg = {
      command: 'message',
      identifier: JSON.stringify({
        channel: "ChatChannel"
      }),
      data: JSON.stringify({
        action: 'speak',
        message: {
          content: message,
          user_id: this.state.currentUser.id,
          conversation_id: this.state.currentConvo.id,
          // conversation_id: 3,
        }
      })
    }
    this.socket.send(JSON.stringify(msg))
  }
  handleNewConvoSubmit = async (e, selectedUser) => {
    console.log(selectedUser.target.value)
    e.preventDefault();
    const fetchUrl = (`http://localhost:3000/users/${this.state.currentUser.id}/conversations`);
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        conversation: {
          sender_id: this.state.currentUser.id,
          receiver_id: selectedUser.target.value
        }
      })
    };
    const response = await fetch(fetchUrl, settings);
    const postData = await response.json();
    console.log(postData)
    if (!!postData.error === true) return null
    // console.log(postData.error)
    await this.setState({
      currentUserConvos: [...this.state.currentUserConvos, { ...postData.conversation }]
    })
    //   this.props.history.push('/homepage')
  }

  setConvo = (obj) => {
    this.setState({
      currentConvo: obj
    }
      // , ()=> this.getOtherUserName()
    )
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
                  <Inbox {...props}
                    currentUser={this.state.currentUser}
                    currentUserConvos={this.state.currentUserConvos}
                    currentConvo={this.state.currentConvo}
                    allUsers={this.state.allUsers}
                    currentUserConvos={this.state.currentUserConvos}
                    openWsConnection={this.openWsConnection}
                    handleSendEvent={this.handleSendEvent}
                    handleNewConvo={this.handleNewConvoSubmit}
                    setConvo={this.setConvo} />
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
