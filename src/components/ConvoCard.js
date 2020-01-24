import React, { Component } from 'react'

export default class ConvoCard extends Component {




    render() {
        return (
            <div> 
                <h1>Inbox</h1>
              {this.props.convo}


            </div>
        )
    }
}
