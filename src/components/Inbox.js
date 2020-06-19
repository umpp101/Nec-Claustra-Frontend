import React, { Component } from 'react'
import Search from "./Search"
import UserList from "./UserList"
import CurrentChatHeader from './CurrentChatHeader'
import Messages from './Messages'
import NewMessage from './NewMessage'

export default class Inbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchedUsers: [],
      searchedTerm: ''
    }
  }

  resetSearch = (e) => {
    console.log("Correct")
    this.setState({
      searchedTerm: ""
    });
    this.setState({
      searchedUsers: []
    })
  }

  searchForUsers = (event) => {
    // console.log(event)
    this.setState({
      searchedTerm: event.target.value
    })
    let searchResult = event.target.value !== '' ? this.props.allUsers.filter(user => user.user_name.toLowerCase().startsWith(event.target.value.toLowerCase()) && user.user_name !== this.props.currentUser.user_name) : [];
    this.setState({
      searchedUsers: searchResult
    });
  };

  componentDidMount() {
    if (Object.keys(this.props.currentUser).length !== 0) {
      console.log("WEBSOCKET STARTED ON INBOX")
      this.props.openWsConnection();
    }
  }

  render() {
    const { allUsers, myConvos, setConvo, getUserNameById, currentUser, deleteConvo, currentConvo, handleSendEvent, handleNewConvo } = this.props;
    const { searchedTerm, searchedUsers } = this.state;
    return (
      <div className="container clearfix">
        <div className="user-list" id="user-list">
          <Search
            allUsers={allUsers}
            resetSearch={this.resetSearch}
            searchForUsers={this.searchForUsers}
            searchedTerm={searchedTerm}
            searchedUsers={searchedUsers}
            handleNewConvo={handleNewConvo}
            myConvos={myConvos} />

          {myConvos.length !== 0 ?
            myConvos.map(convo =>
              <UserList
                getUserNameById={getUserNameById}
                setConvo={setConvo}
                allUsers={allUsers}
                convo={convo} key={convo.id}
                currentUser={currentUser}
                deleteConvo={deleteConvo} />)
            :
            null
          }
        </div>
        <div className="chat">
          {Object.keys(currentConvo).length === 0 ?
            <div className="chat-history">
              <h1> Please select a user to chat with.. </h1>
            </div> :
            <>
              <CurrentChatHeader
                currentConvo={currentConvo}
                currentUser={currentUser}
                allUsers={allUsers} />
              <div className="chat-history">
                <Messages
                  allUsers={allUsers}
                  currentConvo={currentConvo}
                  currentUser={currentUser} />
              </div>
              <NewMessage
                handleSendEvent={handleSendEvent} />
            </>
          }
        </div>
      </div>
    );
  }
}
