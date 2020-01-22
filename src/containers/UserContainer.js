import React, { Component } from 'react'
import User from "./User";

export default class UserContainer extends Component {
    render() {
        return (
            <div>
                <h1>Users</h1>
                {this.props.users.map(user =>
                 <User user={user} key={user.id} />)}
            </div>
        )
    }
}
