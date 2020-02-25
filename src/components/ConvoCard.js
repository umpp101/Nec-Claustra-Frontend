import React, { Component } from 'react'

export default class ConvoCard extends Component {
    getOtherUserName = () => {
        if (this.props.allUsers.length !== 0) {
            let otherUserId;
            if (this.props.currentUser.id === this.props.convo.receiver_id) {
                otherUserId = this.props.convo.sender_id
            } else {
                otherUserId = this.props.convo.receiver_id
            }
            let otherUser = this.props.allUsers.find(user => user.id === otherUserId)
            return otherUser.user_name.charAt(0).toUpperCase() + otherUser.user_name.slice(1)
        }
    }
    render() {
        // console.log(this.props)
        return (
            <div onClick={() => this.props.setConvo(this.props.convo)}>
                <p class="inbox">{this.getOtherUserName()}</p>
            </div>
        )
    }
}
