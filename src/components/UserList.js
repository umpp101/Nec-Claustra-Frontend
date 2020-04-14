import React, { Component } from 'react'

export class UserList extends Component {

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

    render() {
        // console.log(this.props.convo);

        return (
            <div className="clearfix" >
                <img src="ChatAvi.png" alt="avatar" className="about" onClick={() => this.props.setConvo(this.props.convo)} />
                <div className="about" >
                    <div className="name" onClick={() => this.props.setConvo(this.props.convo)} style={{marginTop: "inherit"}}>{this.getOtherUserName()}</div>
                </div>
                    <span style={{marginLeft: "60%"}} onClick={() => this.props.deleteConvo(this.props.convo)}> X </span>
            </div>
        )
    }
}

export default UserList
