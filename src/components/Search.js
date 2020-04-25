import React from 'react'

function Search(props) {


    
    const mySuggestions = () => {
        if (props.searchedUsers.length !== 0) {
            return props.searchedUsers.map(user => {
                return (
                    <div className="clearfix" onClick={() => {props.handleNewConvo(user); props.resetSearch(user)}}>
                        <img src="ChatAvi.png" alt="avatar" className="about" />
                        <div className="about" >
                            <div className="name">{user.user_name}</div>
                        </div>
                    </div>
                )
            })
        }
        else if (props.searchedTerm !== "") {
            return (
                <p> `{props.searchedTerm}  .. is a user that doesn't exists` </p>
            )
        }
    }


    return (
        <div className="search">
                <input type="text" placeholder="search"
                    value={props.searchedTerm} onChange={(event) => props.searchForUsers(event)} />
                {mySuggestions()}
            </div>
    )
}

export default Search

