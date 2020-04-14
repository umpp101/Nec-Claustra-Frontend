import React, { Component } from 'react'

export class Messages extends Component {

    getOtherUserName = () => {
        if (this.props.allUsers.length !== 0) {
            let otherUserId;
            if (this.props.currentUser.id === this.props.convo.receiver_id) {
                otherUserId = this.props.convo.sender_id
            } else {
                otherUserId = this.props.convo.receiver_id
            }
            let otherUser = this.props.allUsers.find(user => user.id === otherUserId)
            return otherUser.user_name
        }
    }
    myMessages = () => {
        if (Object.keys(this.props.currentConvo).length !== 0) {
            return this.props.currentConvo.messages.map(msg => {
                if (msg.user_id === this.props.currentUser.id) {
                    return (
                    <>
                        <div className="message-data align-right">
                            <span className="message-data-time" style={{textAlign : "right", color: "#a8aab1", paddingLeft: "6px"}}>{msg.created_at}</span> &nbsp; &nbsp;
                            <span className="message-data-name" style={{textAlign : "left", paddingLeft: "6px"}} >You</span> 
                        </div>
                        <div className="message other-message float-right">
                            {msg.content}
                        </div>
                    </>)
                }
                else {
                    return (
                    <>
                        <div className="message-data align-left">
                            <span className="message-data-time" style={{textAlign : "left", color: "#a8aab1", paddingRight: "6px"}}>{msg.created_at}</span> &nbsp; &nbsp;
                            <span className="message-data-name" style={{textAlign : "right",  paddingRight: "6px"}}> Them </span>
                        </div>
                        <div className="message my-message">
                            {msg.content}
                        </div>
                        </>
                   )
                    }
            })
        }
    }
    
        

    render() {
        return (
            <div>
                {this.myMessages()}
            </div>
        )
    }
}

export default Messages
