import React, { Component } from 'react'

class NewMessage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentChatMessage: '',
        }
    }


    handleChange = (e) => {
        // console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleEnter = (event) => {
        if (event.key === "Enter") {
            this.props.handleSendEvent(this.state.currentChatMessage, event)
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
                    onChange={e => this.updateCurrentChatMessage(e)}></textarea>
                <button onClick={event => this.props.handleSendEvent(this.state.currentChatMessage, event)}> Send</button>
            </div>

        )
    }
}

export default NewMessage