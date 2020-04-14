import React, { Component } from 'react'


export class Search extends Component {

    mySuggestions = () => {
        if (this.props.searchedUsers.length !== 0) {
            return this.props.searchedUsers.map(user => {

                return (
                    <div className="clearfix" onClick={(e) => {this.props.handleNewConvo(e,user); this.props.resetSearch(e,user)}}>
                        <img src="ChatAvi.png" alt="avatar" className="about" />
                        <div className="about" >
                            <div className="name">{user.user_name}</div>
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
                    value={this.props.searchedTerm} onChange={(event) => this.props.searchForUsers(event)} />
                {this.mySuggestions()}
            </div>
        )
    }
}

export default Search


