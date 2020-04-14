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
    // console.log(event)
    event.preventDefault();
    fetch("https://nec-claustra-backend.herokuapp.com/signup", {
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
        localStorage.setItem("token", resp.jwt);

        const currentUser = {
          id: resp.user.data.attributes.id,
          user_name: resp.user.data.attributes.user_name,
          language: resp.user.data.attributes.language,
          nationality: resp.user.data.attributes.nationality
        };
        this.props.updateCurrentUser({ currentUser })
      })
      .catch((error) => (console.log(error)))
      .then(() => {
        this.props.history.push("/inbox");
      });
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
                      
                      <div><br/>
                          <label style={{color: "#52c8fa", fontSize: "18px"}}>Username</label><br/><br/>
                          <input
                              style={{fontSize: "13px", textAlign: "center"}}
                              name="user_name" onChange={e => this.handleChange(e)} value={this.state.user_name}
                              type="text" placeholder="Your Username" />
                      </div><br/><br/>
                      <div>
                          <label style={{color: "#52c8fa", fontSize: "18px"}}>Password</label><br/><br/>
                          <input
                              style={{fontSize: "13px", textAlign: "center"}}
                              name="password" onChange={e => this.handleChange(e)} value={this.state.password}
                              type="password" placeholder="●●●●●●●●●" />
                      </div><br/><br/>
                      <div>
                          <label style={{color: "#52c8fa", fontSize: "18px"}}>Nationality</label><br/><br/>
                          <input
                              style={{fontSize: "13px", textAlign: "center"}}
                              name="nationality" onChange={e => this.handleChange(e)} value={this.state.nationality}
                              type="nationality" placeholder=" For ex: American" />
                      </div><br/>
                      <div>
                          <label style={{color: "#52c8fa", fontSize: "18px"}}>Language</label><br/><br/>
                          <select
                              style={{fontSize: "13px", textAlign: "center"}}
                              name="language" onChange={e => this.handleChange(e)} 
                              type="text">
                                {languages.map(lang =>
                            <option style={{fontWeight: "500", fontSize: "16px"}} key={lang.id} value={lang.language}>{lang.name}</option>)};
                          </select>
                      </div><br/>
                  </div><br/>

                  <div>
                      <button type="submit" style={{fontWeight: "500",fontSize: "20px"}}>Create Account</button>

                      <div>
                          <p style={{fontSize: "16px"}} >Already Have An Account?</p>
                          <Link to="/login" style={{color: "#52c8fa", fontSize: "20px"}}>Login</Link>
                      </div>
                  </div>

              </form>

          </div>
      </div>
  </div>

    );
  }
}

      // <Form onSubmit={this.handleSignupSubmit}>
      //   <h1>Signup</h1>
      //   <Form.Group controlId="formBasicUsername">
      //     <Form.Control type='text' name="user_name" placeholder="Username" onChange={(e) => this.handleChange(e)} value={this.state.user_name} />
      //   </Form.Group>
      //   <br></br>
      //   <Form.Group controlId="formBasicPassword">
      //     <Form.Control type='password' name="password" placeholder="Password" onChange={(e) => this.handleChange(e)} value={this.state.password} />
      //   </Form.Group>
      //   <br></br>
      //   <select className="form-control" name="language" id="languageSelector"
      //     onChange={(e) => this.handleChange(e)}>
      //     {languages.map(lang =>
      //       <option key={lang.id} value={lang.language}>{lang.name}</option>)};
      //   </select>
      //   <br></br>


      //   <Form.Group controlId="formBasicNationality">
      //     <Form.Control type='text' name="nationality" placeholder="Nationality" onChange={(e) => this.handleChange(e)} value={this.state.nationality} />
      //   </Form.Group>
      //   <br></br>


      //   <Button variant="primary-submit" type="submit">
      //     Submit
      //   </Button>
      // </Form>