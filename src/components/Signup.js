import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";


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

 

  handleChange = (e) => {
    //   console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    },() => console.log(this.state))
  }

  render() {
    return (

        <Form onSubmit={(e) => {this.props.handleSignupSubmit(e, this.state) }}>
                    <h1>Signup</h1>
        <Form.Group controlId="formBasicUsername">
          <Form.Control type='text' name="user_name" placeholder="Username" onChange={(e) => this.handleChange (e)} value={this.state.user_name}/>
        
        </Form.Group>

        <br></br>
      
        <Form.Group controlId="formBasicPassword">
          <Form.Control type='password' name="password" placeholder="Password" onChange={(e) => this.handleChange(e)} value={this.state.password}/>
        </Form.Group>
        <br></br>


        <Form.Group controlId="formBasicLanguage">
          <Form.Control type='text' name="language" placeholder="Language" onChange={(e) => this.handleChange(e)} value={this.state.language}/>
        </Form.Group>
        <br></br>


        <Form.Group controlId="formBasicNationality">
          <Form.Control type='text' name="nationality" placeholder="Nationality" onChange={(e) => this.handleChange(e)} value={this.state.nationality}/>
        </Form.Group>
        <br></br>


        <Button variant="primary-submit" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}
