import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

  render() {
    return (
        <header className="App-header">
          <Link to='/'><img className="logo" src="https://i.imgur.com/2CXy1QL.png" alt="logo" /></Link>
            <p><Link to='/'><img src="https://i.imgur.com/bW5PXpG.png" alt="home"/>Home</Link></p>
            <p><Link to='/login'><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1920px-User_font_awesome.svg.png" alt="login"/>Login</Link></p>
            <p><Link to='/signup'><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1920px-User_font_awesome.svg.png" alt="signup" />Signup</Link></p>
            <p><Link to='/inbox'><img src="https://i.imgur.com/jq9YZJU.png" alt="Inbox"/>Inbox</Link></p>
       </header>
    );
  }

}

export default Header;
