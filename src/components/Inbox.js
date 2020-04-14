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
    let searchResult = event.target.value !== ''? this.props.allUsers.filter(user =>user.user_name.toLowerCase().startsWith(event.target.value.toLowerCase()) && user.user_name !== this.props.currentUser.user_name) : [];
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
    // console.log(this.props)
    return (
      <div className="container clearfix">
        <div className="user-list" id="user-list">
          <Search 
          allUsers={this.props.allUsers}
          resetSearch={this.resetSearch}
          searchForUsers={this.searchForUsers}
          searchedTerm={this.state.searchedTerm}
          searchedUsers={this.state.searchedUsers}
          handleNewConvo={this.props.handleNewConvo}
          myConvos={this.props.myConvos}
          setConvo={this.props.setConvo}/>


          { (this.props.myConvos).length !== 0  ?  

          this.props.myConvos.map(convo =>
            <UserList
                
                getUserNameById={this.props.getUserNameById}
                setConvo={this.props.setConvo}
                allUsers={this.props.allUsers}
                convo={convo} key={convo.id}
                currentUser={this.props.currentUser}
                deleteConvo={this.props.deleteConvo} />)
                :
                null
              }
              </div>

        <div className="chat">
        {Object.keys(this.props.currentConvo).length === 0 ? 
        <div className="chat-history">
          <h1> Please choose a user to chat with.. </h1>
        </div>
          :
          <>
          <CurrentChatHeader
            getUserNameById={this.props.getUserNameById}
            currentConvo={this.props.currentConvo}
            currentUser={this.props.currentUser}
            allUsers={this.props.allUsers} />
         <div className="chat-history">
           <Messages
              getUserNameById={this.props.getUserNameById}
              currentConvo={this.props.currentConvo}
              currentUser={this.props.currentUser} />
          </div>
          <NewMessage
            handleSendEvent={this.props.handleSendEvent} />
          </>
          }
        </div> 
      </div>
    );
  }
}
