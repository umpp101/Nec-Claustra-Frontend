import React, { Component } from "react";
import "./App.css";
import './Inbox.scss'
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Header from "./containers/Header";
import Inbox from "./components/Inbox";

import { Switch, Route, Redirect, withRouter } from "react-router-dom";

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: {},
      currentConvo: {},
      allUsers: [],
      myConvos: {}
    }
    this.socket = undefined;
  }

  
  updateCurrentUser = ({ currentUser }) => this.setState({ currentUser })
  // when currentUser changes, fetch
  // this.fetchUsers();
  // this.fetchMyConvos();

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentUser?.id !== prevState.currentUser?.id) {
      this.fetchUsers();
      this.fetchMyConvos();
    }
  }

  componentDidMount() {
    console.log('comp mounted');
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
        .catch((error) => (console.log(error)))
      // .then(() => this.fetchMyConvos())

    }
  }

  handleLogout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/");
    this.setState({
      currentUser: {}
    });
  };

  fetchMyConvos = async () => {
    const response = await fetch(`http://localhost:3000/users/${this.state.currentUser.id}/conversations`)
    const apiData = await response.json()
    console.log(apiData)
    this.setState({
      myConvos: apiData.conversations
    })
  }


  setConvo = (obj) => {
    this.setState({
      currentConvo: obj
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
  getUserNameById = (id) => {
    if (this.state.allUsers.length !== 0) {
      let user = this.state.allUsers.find(user => user.id === id)
      return user.first_name.charAt(0).toUpperCase() + user.user_name.slice(1)
    }
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
        // identifier: 'ChatChannel'
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
          // identifier: 'ChatChannel',
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
        // let myConvoIds = this.state.myConvos.messages.map(msg => (msg.id))
        // console.log("first condition:", data.message !== undefined)
        // console.log("second condition:", !!data.message.true_message === true)
        // console.log(data)
        // console.log("third condition:", !currentConvoIds.includes(data.message.true_message.id))
        if (data.message !== undefined && !!data.message.true_message === true && !currentConvoIds.includes(data.message.true_message.id)) {
          let convos = this.state.myConvos.map(convo => {
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
              myConvos: convos,
              currentConvo: newConvo
            })
          } else {
            this.setState({
              myConvos: convos
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
    // console.log(this.state)
    console.log(this.socket)
    const msg = {
      command: 'message',
      identifier: JSON.stringify({
        channel: "ChatChannel"
      }),
      // identifier: 'ChatChannel',
      data: JSON.stringify({
        // #this goes to the SPEAK Method in ChatChannel
        action: 'speak',
        message: {
          content: message,
          user_id: this.state.currentUser.id,
          conversation_id: this.state.currentConvo.id
        }
      })
    }
    this.socket.send(JSON.stringify(msg))
  }


  handleNewConvoSubmit = async (e, selectedUser) => {
    console.log(selectedUser.target.value)
    // #write something that prevents
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
      currentConvo: postData.conversation
    })
    //   this.props.history.push('/homepage')
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
                <Login {...props} updateCurrentUser={this.updateCurrentUser} />
              )}
            />
            <Route
              exact
              path="/signup"
              render={props => (
                <Signup {...props} updateCurrentUser={this.updateCurrentUser} />
              )}
            />
            {Object.keys(this.state.currentUser).length !== 0 ? (
              <Route
                exact
                path="/inbox"
                render={props => (
                  <Inbox {...props}
                    myConvos={this.state.myConvos}
                    getUserNameById={this.getUserNameById}
                    currentUser={this.state.currentUser}
                    currentConvo={this.state.currentConvo}
                    allUsers={this.state.allUsers}
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
