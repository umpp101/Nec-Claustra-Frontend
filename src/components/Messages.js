
import React from 'react'
import { getUserNameById, messageTime} from "../util/helpers"

function Messages(props) {

    const myMessages = () => {
        if (Object.keys(props.currentConvo).length !== 0) {
            return props.currentConvo.messages.map(msg => {
                if (msg.user_id === props.currentUser.id) {
                    return (
                            <div key={msg.id} >
                            <div className="message-data align-right" >
                                <span className="message-data-time" >{messageTime(msg.created_at)}</span> &nbsp; &nbsp;
                            <span className="message-data-name" >You</span>
                            </div>
                            <div className="message other-message float-right">
                                {msg.content}
                            </div>
                        </div>)
                }
                else {
                    return (
                        <div key={msg.id}>
                            <div className="message-data align-left">
                            <span className="message-data-name" > {getUserNameById( msg.user_id, props.allUsers)} </span>
                                <span className="message-data-time" >{messageTime(msg.created_at)}</span> &nbsp; &nbsp;
                            </div>
                            <div className="message my-message">
                                {msg.translated_content}
                            </div>
                        </div>
                    )
                }
            })
        }
    }
    return (
        <div>
            {myMessages()}
        </div>
    )

}

export default Messages
