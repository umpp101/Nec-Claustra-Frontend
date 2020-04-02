import React, { Component } from 'react'

export class Messages extends Component {

    myMessages = () => {
        if (Object.keys(this.props.currentConvo).length !== 0) {
            return this.props.currentConvo.messages.map(msg => {
                if (msg.user_id === this.props.currentUser.id) {
                    return (
                    <li className="clearfix">
                        <div className="message-data align-right">
                            <span className="message-data-time" >{msg.created_at}</span> &nbsp; &nbsp;
                            <span className="message-data-name" >Olia</span> <i className="fa fa-circle me"></i>
                        </div>
                        <div className="message other-message float-right">
                            {msg.content}
                        </div>
                    </li>)
                }
                else {
                    return (<li>
                        <div className="message-data">
                            <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                            <span className="message-data-time">{msg.created_at}</span>
                        </div>
                        <div className="message my-message">
                            {msg.content}
                        </div>
                    </li>)
                    }
            })
        }
    }
    
        

    render() {
        return (
            <div>
                {this.myMessages()}
            </div>
        )
    }
}

export default Messages
