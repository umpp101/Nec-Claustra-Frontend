
import React from 'react'

function Messages(props) {

    const grabTime = (e) => {
        let realTime = new Date(e).toLocaleTimeString('en-US', { hour12: true, 
            hour: "numeric", 
            minute: "numeric"});
            return realTime
    }

    const myMessages = () => {
        if (Object.keys(props.currentConvo).length !== 0) {
            return props.currentConvo.messages.map(msg => {
                if (msg.user_id === props.currentUser.id) {
                    return (
                            <div key={msg.id} >
                            <div className="message-data align-right" >
                                <span className="message-data-time" >{grabTime(msg.created_at)}</span> &nbsp; &nbsp;
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
                            <span className="message-data-name" > Them </span>
                                <span className="message-data-time" >{grabTime(msg.created_at)}</span> &nbsp; &nbsp;
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
