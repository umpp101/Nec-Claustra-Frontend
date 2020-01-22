import React, { Component } from "react";

export default class Chat extends Component {


    console.log(conversationId)
  matchMessageWithConvoId = () => {
      console.log("message conversation id:", this.props.message_conversation_id )
      console.log("conversation id:", this.props.conversationId )

    if (this.props.message_conversation_id === this.props.conversationId) {
      return (
        <div>
          {this.props.messageId}
          {this.props.messageContent}
        </div>
      );
    }
    else 
    return "no"
  };
  

  render() {
    return (
      <div>
        <div
          className="card"
        //   onClick={event => this.props.handleClick(event, this.props.messageID)}
        >
          <div className="card-body">
            {/* <h5 className="card-title">Message ID: {this.props.messageId}</h5> */}
            {this.matchMessageWithConvoId()}
          </div>
        </div>
      </div>
    );
  }
}
