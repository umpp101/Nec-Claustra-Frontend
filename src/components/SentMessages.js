import React, { Component } from 'react'

export class SentMessages extends Component {

    mySentMessages = () => {
        if (Object.keys(this.props.currentConvo).length !== 0) {
            return this.props.currentConvo.messages.map(msg => {
                console.log(msg)
                return (
                    <li>
            <div className="message-data">
              <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
              <span className="message-data-time">10:12 AM, Today</span>
            </div>
            <div className="message my-message">
              {msg.content}
            </div>
          </li>
                )
            })
        }
    };



    render() {
        return (
            <div>
                {this.mySentMessages()}
            </div>
        )
    }
}

export default SentMessages
