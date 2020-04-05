import React, { Component } from 'react'


export class Search extends Component {
 


    mySuggestions = () => {
        if (this.props.searchedUsers.length !== 0) {
            return this.props.searchedUsers.map(user => {

                return (
                    <div className="clearfix">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" className="about" />
                        <div className="about" >
                            <div className="name" onClick={(e) => this.props.handleNewConvo(e,user)}>{user.user_name}</div>
                        </div>
                    </div>
                )
            })
        }
        else if (this.props.searchedTerm !== "") {
            return (
                <p> `{this.props.searchedTerm}  .. is a user that does'nt exists` </p>
            )
        }
    }
    render() {
        return (

            <div className="search">
                <input type="text" placeholder="search"
                    onChange={(event) => this.props.searchForUsers(event)} />
                {this.mySuggestions()}
            </div>
        )
    }
}

export default Search


