import React from 'react'
import { getUserNameById } from "../util/helpers"

export default function UserList(props) {
    let otherUserId = props.currentUser.id === props.convo.sender_id ? props.convo.receiver_id : props.convo.sender_id 

    return (
        <div className="clearfix" >
            <img src="ChatAvi.png" alt="avatar" className="about" onClick={() => props.setConvo(props.convo)} />
            <div className="about" >
                <div className="name" style={{ marginTop: "inherit" }} onClick={() => props.setConvo(props.convo)}>{getUserNameById(otherUserId, props.allUsers)}</div>
            </div>
            <div style={{ marginLeft: "60%" }} onClick={() => props.deleteConvo(props.convo)}> X </div>
        </div>
    )
}
