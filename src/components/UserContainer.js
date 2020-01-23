import React, { Component } from 'react'
import UserCard from "./UserCard";

export default class UserContainer extends Component {
    render() {
        return (
            <div>
                {this.props.users.map(user =>
                 <UserCard user={user} key={user.id} />)}
            </div>
        )
    }
}
