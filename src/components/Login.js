import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";


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
    fetch("http://localhost:3000/login", {
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
        this.props.history.push("/welcome");
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
        <Form onSubmit={this.handleLoginSubmit}>
                    <h1>Login</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Control type='text' name="user_name" placeholder="Username" onChange={(e) => this.handleChange (e)} value={this.state.user_name}/>
        
        </Form.Group>

        <br></br>
      
        <Form.Group controlId="formBasicPassword">
          <Form.Control type='password' name="password" placeholder="Password" onChange={(e) => this.handleChange(e)} value={this.state.password}/>
        </Form.Group>
        <br></br>
        <Button variant="primary-submit" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}
