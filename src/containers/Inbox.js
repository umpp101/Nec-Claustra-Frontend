import React, { Component } from "react";
// import UserContainer from "./UserContainer";
import ChatContainer from "./ChatContainer";
// import SearchBar from "../components/SearchBar";

export class MainContainer extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      messages: [],
      conversations: []
    };
  }



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
      <div>
        
       <ChatContainer messages={this.state.messages} conversations={this.state.conversations} users={this.state.users} />
          </div>
    );
  }
}

export default MainContainer;
