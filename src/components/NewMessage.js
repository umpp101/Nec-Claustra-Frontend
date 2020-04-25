import React, { useState } from 'react'

function NewMessage(props) {

    const [ currentChatMessage, setCurrentChatMessage ] = useState('')

    const handleChange = (e) => {
        setCurrentChatMessage(e.target.value)
      }
      
    const handleEnter = (e) => {
        if (e.key === "Enter" && currentChatMessage !== "") {
            props.handleSendEvent(currentChatMessage, e)
            setCurrentChatMessage("")
        }
    }
    const handleSendButton = (e) => {
        if (currentChatMessage !== "") {
            props.handleSendEvent(currentChatMessage, e);
            setCurrentChatMessage("")
        }
    }

    return (
        <div className="chat-message clearfix">
                <textarea name="message-to-send" id="message-to-send"
                    placeholder="Type your message" rows="3" required 
                    value={currentChatMessage} onKeyDown={e => handleEnter(e)} onChange={e => handleChange(e)} > 
                </textarea>
                <button onClick={e => handleSendButton(e)}> Send</button>
            </div>
    )
}

export default NewMessage