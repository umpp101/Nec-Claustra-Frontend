import React, { Component } from "react";
// import UserContainer from "./UserContainer";
import ConvoCard from "./ConvoCard";
// import SearchBar from "../components/SearchBar";

export default class Inbox extends Component {
 
  // findInboxUsers = () => {
  //   if (receiver.id !== currentUser.id){
  //     return 
  //   }
  // }


  render() {
    return (
      <div>
        <h1>Welcome</h1>
        {/* {console.log(this.props.currentUserConvos["conversations"])} */}
        
       {/* {this.props.currentUserConvos["conversations"].map(convo =>
        <ConvoCard convo={convo} key={convo.id} />)} */}



{/* 
         {this.props.currentUserConvos["conversations"].forEach(convo => console.log(convo))}
          */}
          </div>
    );
  }
}
