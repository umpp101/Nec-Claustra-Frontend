import React, { Component } from 'react'
// import ConvoCard from "./ConvoCard";
import Search from "./Search"
import PeopleList from "./PeopleList"
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

  searchForUsers = (event) => {

    console.log(event.target.value)
    this.setState({
      searchedTerm: event.target.value
    })
    // console.log(event.target.value)
    let searchResult = event.target.value !== ''? this.props.allUsers.filter(user =>user.user_name.includes(event.target.value)) : [];
    console.log(searchResult)
    this.setState({
      searchedUsers: searchResult
    }, () => console.log(this.state.searchedUsers));
  };

  componentDidMount() {
    if (Object.keys(this.props.currentUser).length !== 0) {
      this.props.openWsConnection();
    }
    console.log(Object.keys(this.props.currentConvo).length === 0)
  }

  render() {
    console.log(this.props)
    return (
      <div className="container clearfix">
        <div className="people-list" id="people-list">
          <Search 
          allUsers={this.props.allUsers}
          searchForUsers={this.searchForUsers}
          searchedTerm={this.state.searchedTerm}
          searchedUsers={this.state.searchedUsers}
          handleNewConvo={this.props.handleNewConvo}/>
          
          {this.props.myConvos.map(convo =>
            <PeopleList
                
                getUserNameById={this.props.getUserNameById}
                setConvo={this.props.setConvo}
                allUsers={this.props.allUsers}
                convo={convo} key={convo.id}
                currentUser={this.props.currentUser} />)}
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
