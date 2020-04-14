import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

  loginLogic = () => {
   if (Object.keys(this.props.currentUser).length === 0) {
    return (
    <>
      <p><Link to='/login'><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1920px-User_font_awesome.svg.png" alt="login"/>Login</Link></p>
      <p><Link to='/signup'><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1920px-User_font_awesome.svg.png" alt="signup" />Signup</Link></p>
    </>
    )
   }
   else {
     return (
          <>
            <p><Link to='/inbox'><img src="https://i.imgur.com/jq9YZJU.png" alt="inbox"/>Inbox</Link></p>
            <p onClick={this.props.handleLogout}><Link to='/'><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1920px-User_font_awesome.svg.png" alt="logout" />Logout</Link></p>
          </>
     ) }
  }




  render() {
    return (
      
        <header className="App-header">
              <Link to='/'><img className="logo" src="actualLogo.png" alt="logo"/></Link>
         {this.loginLogic()}
       </header>
    );
  }

}

export default Header;
