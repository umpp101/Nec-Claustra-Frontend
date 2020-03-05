import React, { Component } from "react";
import ConvoCard from "./ConvoCard";


export default class Inbox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentChatMessage: '',
      selectedUser: ''
    }
  }

  updateCurrentChatMessage = (event) => {
    console.log(event.target.value)
    this.setState({
      currentChatMessage: event.target.value
    });
  }

  componentDidMount() {
    if (Object.keys(this.props.currentUser).length !== 0) {
      this.props.openWsConnection();
    }
  }


  renderMessages = () => {
    if (Object.keys(this.props.currentConvo).length !== 0) {
      return this.props.currentConvo.messages.map(msg => {
        // const actualTime = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit'}).format(msg.created_at)
        return (
          <li class="message">
            <div class="message-info">
              <h5 class="message-name">{this.props.currentUser.user_name}</h5>
              <p class="message-text">{msg.content}</p>
            </div>
            <span class="message-time">{msg.created_at}</span>
          </li>
        )
      })
    }
  };

  render() {
    return (
      <div class="chat-container">
        {/* <div>
          {this.props.currentUserConvos.map(convo => < ConvoCard
            setConvo={this.props.setConvo}
            convo={convo} key={convo.id}
            allUsers={this.props.allUsers}
            currentUser={this.props.currentUser} />)}
        </div> */}
        <div class="chat">
          <div class="user-select-container">
            <div class="form-group">
              <label for="userSelector">Please select Who you'd like to chat with </label>
              <select class="form-control" id="userSelector"
                onClick={(e) => { this.props.handleNewConvo(e, e) }}>
                {this.props.allUsers.map(user => {
              // this makes sure that i don't have an options of making a convo with myself(frontend Wise)
                 return user.id != this.props.currentUser.id && 
                <option key={user.key} value={user.id}>{user.user_name.charAt(0).toUpperCase() + user.user_name.slice(1)}</option>})}
                </select>
            </div>
          </div>

          <ul class="row message-container" id="channel-status" >{this.renderMessages()}</ul>
          <div class="input-container">

            <div class="row text-input-container">

              <input type="text" class="text-input" id="input-field" placeholder="Enter your message..."
                value={this.state.currentChatMessage}
                onChange={e => this.updateCurrentChatMessage(e)}
                required="required"
              />
              <input class="input-button" type="submit" value="Send" onClick={event => this.props.handleSendEvent(this.state.currentChatMessage, event)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
