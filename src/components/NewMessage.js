import React, { Component } from 'react'

class NewMessage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentChatMessage: "",
        }
    }

    handleEnter = (event) => {
        if (event.key === "Enter" && this.state.currentChatMessage !== "") {
            this.props.handleSendEvent(this.state.currentChatMessage, event)
            this.setState({
                currentChatMessage: ""
            })
        }
    }
    handleSendButton = (event) => {
        if (this.state.currentChatMessage !== "") {
            this.props.handleSendEvent(this.state.currentChatMessage, event);
            this.setState({
                currentChatMessage: ""
            })
        }
    }
    updateCurrentChatMessage = (event) => {
        //   console.log(event.target.value)
        this.setState({
            currentChatMessage: event.target.value
        });
    }
    render() {
        return (
            <div className="chat-message clearfix">
                <textarea name="message-to-send" id="message-to-send"
                    placeholder="Type your message" rows="3"
                    value={this.state.currentChatMessage}
                    onKeyDown={event => this.handleEnter(event)}
                    onChange={e => this.updateCurrentChatMessage(e)} required></textarea>
                <button onClick={event => this.handleSendButton(event)}> Send</button>
            </div>
        )
    }
}

export default NewMessage