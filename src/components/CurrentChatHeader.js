
import React, { Component } from 'react'

export class CurrentChatHeader extends Component {
  getOtherUserName = () => {
    if (this.props.allUsers.length !== 0) {
        let otherUserId;
        if (this.props.currentUser.id === this.props.currentConvo.receiver_id) {
            otherUserId = this.props.currentConvo.sender_id
        } else {
            otherUserId = this.props.currentConvo.receiver_id
        }
        let otherUser = this.props.allUsers.find(user => user.id === otherUserId)
        return otherUser.user_name
    }
}
  render() {
    console.log(this.props)
    return (
      <div className="chat-header clearfix">
      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
      <div className="chat-about">
        <div className="chat-with">{this.getOtherUserName()}</div>
        <div className="chat-num-messages">put the length of the messages here</div>
      </div>
    </div>
    )
  }
}

export default CurrentChatHeader
