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
                    onChange={e => this.updateCurrentChatMessage(e)}></textarea>
                <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                <i className="fa fa-file-image-o"></i>
                <button onClick={event => this.props.handleSendEvent(this.state.currentChatMessage, event)}> Send</button>
            </div>

        )
    }
}

export default NewMessage