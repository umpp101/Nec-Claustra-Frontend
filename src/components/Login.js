import React, { Component } from "react";
import { Link } from 'react-router-dom';


export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      user_name: "",
      password: ""
    };
  }

  handleLoginSubmit = (event) => {
    event.preventDefault();
    fetch("https://nec-claustra-backend.herokuapp.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          user_name: this.state['user_name'],
          password: this.state.password
        }
      })
    })
      .then(resp => resp.json())
      .then(data => {
        localStorage.setItem("token", data.jwt);
        
        const currentUser = {
          id: data.user.data.attributes.id,
          user_name: data.user.data.attributes.user_name,
          language: data.user.data.attributes.language,
          nationality: data.user.data.attributes.nationality
        };
        this.props.updateCurrentUser({ currentUser })
      })
      .catch((error) => (console.log(error)))
      .then(() => {
        this.props.history.push("/Home");
      });
    }

 

  handleChange = (e) => {
    //   console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {
    return (
      <div >
      <div>
          <div >
              <h1>Login</h1>
              <form onSubmit={this.handleLoginSubmit}>
                  <div>
                      <div><br/>
                          <label style={{color: "#52c8fa", fontSize: "18px"}} >Username</label><br/><br/>
                          <input
                              style={{fontSize: "13px", textAlign: "center"}}
                              name="user_name" onChange={e => this.handleChange(e)} value={this.state.user_name}
                              type="text"  placeholder="Your Username" />
                      </div><br/><br/>
                      <div >
                          <label style={{color: "#52c8fa", fontSize: "18px"}}>Password</label><br/><br/>
                          <input
                              style={{fontSize: "13px", textAlign: "center"}}
                              name="password" onChange={e => this.handleChange(e)} value={this.state.password}
                              type="password"  placeholder="●●●●●●●●●" />
                      </div>
                  </div><br/>
                  <div>
                      <button type="submit" style={{fontWeight: "700",fontSize: "20px"}} >Login</button>
                      <div><br/>
                          <p style={{fontSize: "16px"}} >Don't Have An Account?</p>
                          <Link to="/signup" style={{color: "#52c8fa", fontSize: "20px"}}>Sign up</Link>
                      </div>
                  </div>
              </form>
          </div>
      </div>
  </div>

    );
  }
}
