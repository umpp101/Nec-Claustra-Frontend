import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import languages from "../Languages"

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

      <Form onSubmit={this.handleSignupSubmit}>
        <h1>Signup</h1>
        <Form.Group controlId="formBasicUsername">
          <Form.Control type='text' name="user_name" placeholder="Username" onChange={(e) => this.handleChange(e)} value={this.state.user_name} />
        </Form.Group>
        <br></br>
        <Form.Group controlId="formBasicPassword">
          <Form.Control type='password' name="password" placeholder="Password" onChange={(e) => this.handleChange(e)} value={this.state.password} />
        </Form.Group>
        <br></br>
        <select class="form-control" name="language" id="languageSelector"
          onChange={(e) => this.handleChange(e)}>
          {languages.map(lang =>
            <option value={lang.language}>{lang.name}</option>)};
        </select>
        <br></br>


        <Form.Group controlId="formBasicNationality">
          <Form.Control type='text' name="nationality" placeholder="Nationality" onChange={(e) => this.handleChange(e)} value={this.state.nationality} />
        </Form.Group>
        <br></br>


        <Button variant="primary-submit" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}
