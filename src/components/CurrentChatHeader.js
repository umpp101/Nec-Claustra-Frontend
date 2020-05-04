import React from 'react'
import {getUserNameById} from "../util/helpers"

function CurrentChatHeader(props) {
  let otherUserId = props.currentUser.id === props.currentConvo.sender_id ? props.currentConvo.receiver_id : props.currentConvo.sender_id 
  return (
    <div className="chat-header clearfix">
      <img src="ChatAvi.png" alt="avatar" />
      <div className="chat-about">
        <div className="chat-with">{getUserNameById(otherUserId, props.allUsers)}</div>
        <div className="chat-num-messages"></div>
      </div>
    </div>
  )
}

export default CurrentChatHeader
