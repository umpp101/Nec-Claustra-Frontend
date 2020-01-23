import React, { Component } from 'react'

export default class UserCard extends Component {
    render() {
        return (
            <div>
                {this.props.user.user_name}
            </div>
        )
    }
}
