import React, { Component } from "react";
import "./App.css";
import "./Inbox.scss";
import { fetchUsers, reAuth } from "./api/userFetches";
import { fetchMyConvos, deleteConvo, newConvo } from "./api/convoFetches";
import { Home, Header, Login, Signup, Inbox } from "./components/index.js";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {},
      currentConvo: {},
      allUsers: [],
      myConvos: [],
    };
    this.socket = undefined;
  }

  updateCurrentUser = ({ currentUser }) => {
    this.setState({ currentUser });
    this.props.history.push("/inbox");
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.currentConvo !== prevState.currentConvo) {
      const fetchedMyConvos = await fetchMyConvos(this.state.currentUser);
      this.setState({ myConvos: fetchedMyConvos });
    }
    if (this.state.currentUser?.id !== prevState.currentUser?.id) {
      const fetchedUsers = await fetchUsers();
      this.setState({ allUsers: fetchedUsers });
      const fetchedMyConvos = await fetchMyConvos(this.state.currentUser);
      this.setState({ myConvos: fetchedMyConvos });
      this.props.history.push("/inbox");
    }
  }

  async componentDidMount() {
    if (localStorage.getItem("token") !== null) {
      const checkedUser = await reAuth();
      this.setState({ currentUser: checkedUser });
    }
  }

  handleNewMsg = async (message, event) => {
    event.preventDefault();
    // this sends message to the backend to my speak method, that runs and calls on the api
    const msg = {
      command: "message",
      identifier: JSON.stringify({
        channel: "ChatChannel",
      }),
      data: JSON.stringify({
        action: "speak",
        message: {
          content: message,
          user_id: this.state.currentUser.id,
          conversation_id: this.state.currentConvo.id,
        },
      }),
    };
    this.socket.send(JSON.stringify(msg));
  };
  handleNewConvoSubmit = async (receiver) => {
    // e.preventDefault();
    const newlyMadeConvo = await newConvo(receiver, this.state.currentUser);
    this.setState({ currentConvo: newlyMadeConvo });
    // created this an alert to notify other subscribers that a convo was created,
    // because the created convo was only known to the current user and not the other party of the convo
    const msg = {
      command: "message",
      identifier: JSON.stringify({
        channel: "ChatChannel",
      }),
      data: JSON.stringify({
        action: "alert",
        message: {
          alert_receiver: [receiver.id, this.state.currentUser.id],
          type: "createConvo",
        },
      }),
    };
    this.socket.send(JSON.stringify(msg));
  };

  deleteConvo = async (convo) => {
    await deleteConvo(convo);
    // created this an alert to notify other subscribers that a convo was deleted,
    // because the delete convo was only known to the current user and not the other party of the convo
    const msg = {
      command: "message",
      identifier: JSON.stringify({
        channel: "ChatChannel",
      }),
      data: JSON.stringify({
        action: "alert",
        message: {
          alert_receiver: [convo.receiver_id, convo.sender_id],
          type: "deleteConvo",
        },
      }),
    };
    this.socket.send(JSON.stringify(msg));

    if (convo.id === this.state.currentConvo.id) {
      this.setState({ currentConvo: {} });
    }
  };

  openWsConnection = async () => {
    this.socket = new WebSocket("ws://localhost:3000/cable"); // console.log("1 - Socket is open");
    this.socket.onopen = (e) => {
      // console.log("2 - Starting to send a subscription to server");
      let msg = {
        command: "subscribe",
        identifier: JSON.stringify({
          channel: "ChatChannel",
        }),
      };
      this.socket.send(JSON.stringify(msg));
    };
    this.socket.onmessage = (event) => {
      let data = JSON.parse(event.data);
      this.alertMessageChecker(data);
      if (data.type === "confirm_subscription") {
        const message = {
          command: "message",
          identifier: JSON.stringify({ channel: "ChatChannel" }),
          data: JSON.stringify({
            action: "convo_connector",
            message: JSON.stringify({ user_id: this.state.currentUser.id }),
          }),
        };
        this.socket.send(JSON.stringify(message));
      } else if (
        data.message !== undefined &&
        !!data.message.true_message === true
      ) {
        if (
          data.message.true_message.conversation_id ===
          this.state.currentConvo.id
        ) {
          console.log(this.state.currentConvo.id);
          let newConvo = { ...this.state.currentConvo };
          newConvo.messages = [...newConvo.messages, data.message.true_message];
          this.setState({ currentConvo: newConvo });
        } else {
          let convos = this.state.myConvos.map((convo) => {
            if (convo.id === data.message.true_message.conversation_id) {
              convo.messages = [...convo.messages, data.message.true_message];
              return convo;
            } else {
              return convo;
            }
          });
          this.setState({ myConvos: convos });
        }
      }
    };
  };

  async alertMessageChecker(data) {
    // this whole method involves the #handleNewConvo and #deletedConvo methods
    // it checks if the messages from the broadcast are alerts pertaining to the current user
    // and if so, i restart the websocket and updated currentUser convos
    if (
      data.message &&
      !!data.message.alert_receiver &&
      data.message.alert_receiver.includes(this.state.currentUser.id)
    ) {
      this.socket.close();
      this.openWsConnection();
      const fetchedMyConvos = await fetchMyConvos(this.state.currentUser);
      this.setState({ myConvos: fetchedMyConvos });
      let deletedConvo = this.state.myConvos.find(
        (convo) => convo.id === this.state.currentConvo.id
      );
      console.log(deletedConvo);
      if (!deletedConvo) {
        this.setState({ currentConvo: {} });
      }
      console.log(this.state.myConvos);
    } else {
      console.log("Still waiting on a message!");
    }
  }

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({ currentUser: {} });
    this.props.history.push("/");
  };

  setConvo = (obj) => {
    this.setState({ currentConvo: obj });
  };

  getUserNameById = (id) => {
    if (this.state.allUsers.length !== 0) {
      let user = this.state.allUsers.find((user) => user.id === id);
      return user.user_name.charAt(0).toUpperCase() + user.user_name.slice(1);
    }
  };

  render() {
    const { currentUser, currentConvo, allUsers, myConvos } = this.state;
    return (
      <div className="App">
        <Header currentUser={currentUser} handleLogout={this.handleLogout} />
        <div className="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/login"
              render={(props) => (
                <Login {...props} updateCurrentUser={this.updateCurrentUser} />
              )}
            />
            <Route
              exact
              path="/signup"
              render={(props) => (
                <Signup {...props} updateCurrentUser={this.updateCurrentUser} />
              )}
            />
            {Object.keys(this.state.currentUser).length ? (
              <Route
                exact
                path="/inbox"
                render={(props) => (
                  <Inbox
                    {...props}
                    currentConvo={currentConvo}
                    allUsers={allUsers}
                    currentUser={currentUser}
                    myConvos={myConvos}
                    getUserNameById={this.getUserNameById}
                    openWsConnection={this.openWsConnection}
                    handleNewMsg={this.handleNewMsg}
                    handleNewConvo={this.handleNewConvoSubmit}
                    setConvo={this.setConvo}
                    deleteConvo={this.deleteConvo}
                  />
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
