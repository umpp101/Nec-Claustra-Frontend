import React, { Component } from 'react'
import Chat from "./Chat";

export default class ChatContainer extends Component {


    render() {
        return (
            <div> 
                <h1>Chats</h1>
                {this.props.messages.map(message =>
                 <Chat messageId={message.id} messageContent={message.content} message_conversation_id={message.conversation_id}  />)}


                {this.props.conversations.map(conversation =>
                 <Chat conversationId={conversation.id} sender={conversation.sender_id} conversation={conversation} />)}


                {this.props.users.map(user =>
                 <Chat user={user} user_id={user.id} />)} 


            </div>
        )
    }
}
