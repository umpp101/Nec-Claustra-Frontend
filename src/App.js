import "./App.css";
import './Inbox.scss';
import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { fetchUsers, reAuth } from "./api/userFetches"
import { fetchMyConvos, deleteConvo, newConvo } from "./api/convoFetches"
import { getAlertMsg, getNewMsgBody, getConvoConnecterReq } from "./util/sockets"
import { Home, Header, Login, Signup, Inbox } from "./components/index.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

  

   updateCurrentUser = async ({ currentUser }) => {
    this.setState({ currentUser });
    const fetchedMyConvos = await fetchMyConvos(this.state.currentUser);
    this.setState({ myConvos: fetchedMyConvos });
    this.props.history.push("/inbox");
  };


  async componentDidMount() {
      const fetchedUsers = await fetchUsers();
      this.setState({ allUsers: fetchedUsers });
    if (localStorage.getItem("token") !== null) {
      const checkedUser = await reAuth();
      this.setState({ currentUser: checkedUser });
    }
  }
  
  handleNewConvoSubmit = async (receiver) => {
    const newlyMadeConvo = await newConvo(receiver, this.state.currentUser);
    this.setState({ currentConvo: newlyMadeConvo });
    let msg = getAlertMsg('create_convo', [receiver.id])
    this.socket.send(msg);
  };

  deleteConvo = async (convo) => {
    await deleteConvo(convo);
    let msg = getAlertMsg('delete_convo', [convo.receiver_id, convo.sender_id])
    this.socket.send(msg);
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({ currentUser: {} });
    this.props.history.push("/");
  };

  setConvo = (obj) => {
    this.setState({ currentConvo: obj });
  };

  openWsConnection = async () => {
    this.socket = new WebSocket("ws://localhost:3000/cable"); // console.log("1 - Socket is open");
    this.socket.onopen = (e) => {  // console.log("2 - Starting to send a subscription to server");
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
      console.log(data)

      // check to see if our  typed message id exists in our "my convos" or currentConvo.messages before we set state
      if (data.type === "confirm_subscription") {
        console.log('we are confirmed')
        let msg = getConvoConnecterReq(this.state.currentUser);
        this.socket.send(msg)
      }
      // filter for non-pinging messages 
      else if (data.message && !!data.message.type) {
        // if the message is apart of a convo and a new message
        if (!!data.message.true_message && data.message.type === 'new_message') {
          this.addMsgToConvo(data.message.true_message,data.message.name);
        }
        // for any messages related to deleting or creating a convo
        else {
          this.handleDeleteOrCreateConvo(data.message);
        }
      }
    };
  };

  handleSendEvent = async (message) => {
    let msg = getNewMsgBody(message, this.state.currentUser.id, this.state.currentConvo);
    this.socket.send(msg);
  };

  addMsgToConvo(message,name) {
    console.log(message)
    if (message.conversation_id === this.state.currentConvo.id) {
      console.log(this.state.currentConvo.id);
      let newConvo = { ...this.state.currentConvo };
      newConvo.messages = [...newConvo.messages, message];
      this.setState({ currentConvo: newConvo });
    }
    else {
      notification(name);
      let convos = this.state.myConvos.map((convo) => {
        if (convo.id === message.conversation_id) {
          convo.messages = [...convo.messages, message];
          return convo;
        }
        else {
          return convo;
        }
      });
      this.setState({ myConvos: convos });
    }
  }

  async handleDeleteOrCreateConvo(message) {
    const fetchedMyConvos = await fetchMyConvos(this.state.currentUser);
    this.setState({ myConvos: fetchedMyConvos });
    if (message.type === 'delete_convo') {
      let validCurrentConvo = this.state.myConvos.find((convo) => convo.id === this.state.currentConvo.id);
      console.log(validCurrentConvo);
      if (!validCurrentConvo) {
        this.setState({currentConvo: {}})
      }
    }
  }

  render() {
    console.log(this.state)
    const { currentUser, currentConvo, allUsers, myConvos } = this.state;
    return (
      <div className="App">
        <ToastContainer/>
        <Header currentUser={currentUser} handleLogout={this.handleLogout} />
        <div className="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" render={(props) => (
              <Login {...props} updateCurrentUser={this.updateCurrentUser} />)} />
            <Route exact path="/signup" render={(props) => (
              <Signup {...props} updateCurrentUser={this.updateCurrentUser} />)} />
            {Object.keys(this.state.currentUser).length ? (
              <Route exact path="/inbox" render={(props) => (
                <Inbox {...props} currentConvo={currentConvo} allUsers={allUsers} currentUser={currentUser}
                  myConvos={myConvos} getUserNameById={this.getUserNameById}
                  openWsConnection={this.openWsConnection} handleSendEvent={this.handleSendEvent} handleNewConvo={this.handleNewConvoSubmit}
                  setConvo={this.setConvo} deleteConvo={this.deleteConvo} />)} />
            ) : (
                <Redirect to="/login" />)}
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
let notification = (name) => {
  toast(`📧 ${name} messaged you!`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
}

