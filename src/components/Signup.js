import React, { Component } from "react";
import languages from "../Languages";
import { Link } from 'react-router-dom';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      user_name: "",
      password: "",
      language: "",
      nationality: ""
    };
  }

  handleSignupSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          user_name: this.state['user_name'],
          password: this.state.password,
          language: this.state.language,
          nationality: this.state.nationality,
        }
      })
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        if (!!resp.error === true) {
          console.log(resp.error)
        } 
        else {
          localStorage.setItem("token", resp.jwt);
          console.log(resp)
          const currentUser = {
            id: resp.user.data.attributes.id,
            user_name: resp.user.data.attributes.user_name,
            language: resp.user.data.attributes.language,
            nationality: resp.user.data.attributes.nationality
          };
        console.log(currentUser)
        this.props.updateCurrentUser({ currentUser })
      }
    })
  }

  handleChange = (e) => {
    //   console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log(this.state))
  }

  render() {
    return (
      <div >
        <div >
          <div>
            <h1>Signup</h1>
            <form onSubmit={this.handleSignupSubmit}>
              <div>
                <div><br />
                  <label style={{ color: "#52c8fa", fontSize: "18px" }}>Username</label><br /><br />
                  <input
                    style={{ fontSize: "13px", textAlign: "center" }}
                    name="user_name" onChange={e => this.handleChange(e)} value={this.state.user_name}
                    type="text" placeholder="Your Username" required />
                </div><br /><br />
                <div>
                  <label style={{ color: "#52c8fa", fontSize: "18px" }}>Password</label><br /><br />
                  <input
                    style={{ fontSize: "13px", textAlign: "center" }}
                    name="password" onChange={e => this.handleChange(e)} value={this.state.password}
                    type="password" placeholder="●●●●●●●●●" required />
                </div><br /><br />
                <div>
                  <label style={{ color: "#52c8fa", fontSize: "18px" }}>Nationality</label><br /><br />
                  <input
                    style={{ fontSize: "13px", textAlign: "center" }}
                    name="nationality" onChange={e => this.handleChange(e)} value={this.state.nationality}
                    type="nationality" placeholder=" For ex: American" required />
                </div><br />
                <div>
                  <label style={{ color: "#52c8fa", fontSize: "18px" }}>Language</label><br /><br />
                  <select
                    style={{ fontSize: "13px", textAlign: "center" }}
                    name="language" onChange={e => this.handleChange(e)}
                    type="text" required>
                    {languages.map(lang =>
                      <option style={{ fontWeight: "500", fontSize: "16px" }} key={lang.id} value={lang.language}>{lang.name}</option>)};
                          </select>
                </div><br />
              </div><br />
              <div>
                <button type="submit" style={{ fontWeight: "500", fontSize: "20px" }}>Create Account</button>
                <div>
                  <p style={{ fontSize: "16px" }} >Already Have An Account?</p>
                  <Link to="/login" style={{ color: "#52c8fa", fontSize: "20px" }}>Login</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
