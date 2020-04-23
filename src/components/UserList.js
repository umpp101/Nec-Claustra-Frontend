import React from 'react'

export default function UserList(props) {
    
    const getOtherUserName = () => {
        if (props.allUsers.length !== 0) {
            let otherUserId;
            if (props.currentUser.id === props.convo.receiver_id) {
                otherUserId = props.convo.sender_id
            } else {
                otherUserId = props.convo.receiver_id
            }
            let otherUser = props.allUsers.find(user => user.id === otherUserId)
            return otherUser.user_name
        }
    }
    return (
        <div className="clearfix" >
            <img src="ChatAvi.png" alt="avatar" className="about" onClick={() => props.setConvo(props.convo)} />
            <div className="about" >
                <div className="name" onClick={() => props.setConvo(props.convo)} style={{ marginTop: "inherit" }}>{getOtherUserName()}</div>
            </div>
            <div style={{ marginLeft: "60%" }} onClick={() => props.deleteConvo(props.convo)}> X </div>
        </div>
    )
}
