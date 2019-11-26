import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import { MDBFooter } from "mdbreact";
import "../assets/css/style.css";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    sessionStorage.setItem("userID", null);
  }

  handleChange = name => async event => {
    await this.setState({ [name]: event.target.value });
  };

  signIn() {
    const { email, password } = this.state;
    console.log("Logging you in...");
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: email, password: password })
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          alert("Invalid Username or Password 🎅! Try again! 🌟");
          this.props.history.push("/login");
        } else {
          sessionStorage.setItem("userID", json.username);
          this.props.history.push("/search");
        }
      })
      .catch(err => console.log(err));
  }

  handleClick() {
    const { email, password } = this.state;
    if (!email.includes("@")) {
      alert("That's not an email. 🧦 Try again!");
      this.props.history.push("/login");
    } else {
      fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: email, password: password })
      })
        .then(response => response.json())
        .then(json => {
          if (json.error) {
            alert("You've entered an existing username ⛄. Try again! 👼");
            this.props.history.push("/login");
          } else {
            sessionStorage.setItem("userID", json.username);
            this.props.history.push("/search");
          }
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <iframe
          src={require("../christmas2.mp3")}
          allow="autoplay"
          style={{ display: "none" }}
          id="audio"
        ></iframe>
        <Jumbotron className="login">
          <Form>
            <Form.Group controlId="email">
              <Form.Label>User Email</Form.Label>
              <Form.Control
                className="textField"
                value={this.state.email}
                onChange={this.handleChange("email")}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="textField"
                value={this.state.password}
                type="password"
                required
                onChange={this.handleChange("password")}
                placeholder="Password"
              />
            </Form.Group>
            <Button className="loginButton" onClick={this.signIn}>
              Sign In
            </Button>
            <Button className="loginButton" onClick={this.handleClick}>
              Register
            </Button>
          </Form>
        </Jumbotron>
        <Button className="guestButton" href="/search">
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)"
            }}
          >
            Or Continue as Guest
          </span>
        </Button>
        <h5>
          <a color="black" href="https://www.youtube.com/watch?v=D4cLYidfBsk">
            Music: Jade - Christmas at Home
          </a>
        </h5>
      </div>
    );
  }
}

export default LoginPage;
