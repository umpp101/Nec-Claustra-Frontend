import React from 'react'

function Search(props) {
    return (
        <div className="search">
        <input type="text" placeholder="search" 
        onChange={(event) => props.searchForUsers(event)}/>
        <i className="fa fa-search"></i>
    </div>
    )
}

export default Search

