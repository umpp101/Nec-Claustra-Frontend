import React, { Component } from "react";

export default class Chat extends Component {


  // matchMessageWithConvoId = () => {
  //     console.log("message conversation id:", this.props.message_conversation_id )
  //     console.log("conversation id:", this.props.conversationId )

  //   if (this.props.message_conversation_id === this.props.conversationId) {
  //     return (
  //       <div>
  //         {this.props.messageId}
  //         {this.props.messageContent}
  //       </div>
  //     );
  //   }
  //   else 
  //   return "no"
  // };
  

  render() {
    return (
      <div>
            {/* <h5 className="card-title">Message ID: {this.props.messageId}</h5> */}
            {/* {console.log(this.props.otherUser.user_name)} */}
            <p>{ Object.keys(this.props.otherUser).length > 0 ? this.props.otherUser.user_name : ''}</p>
      </div>
    );
  }
}
