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

 

  handleChange = (e) => {
    //   console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    },() => console.log(this.state))
  }

//   handleSubmit = (e) => {
//       e.preventDefault()
//     // console.log('from handleSubmit: ', e.target)
//     console.log('user-name:',this.state.user_name)
//     console.log('password:',this.state.password)
     
//     fetch('http://localhost:3000/users', {
//        method: 'POST',
//        headers: {'Content-Type':'application/json'},
//        body: JSON.stringify({
//         user_name: this.state.user_name,
//         password: this.state.password
//        })
//       })
//       .then(resp => resp.json())
//       .then(data => {
//         console.log(data)
//         // localStorage.setItem("token", data.jwt)
//       })
//     //   .then(window.history.push("/"))
//   }

  render() {
    return (

        <Form onSubmit={(e) => {this.props.handleSubmit(e, this.state) }}>
                    <h1>Signup</h1>
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
