import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Menu from "../components/Menu.jsx";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
class SendCard extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props.location;
    this.state = {
      card: data,
      friends: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    console.log(this.state.card);
    if (this.state.card === undefined) {
      this.props.history.push("/search");
    }
    fetch(`/friends?q=${sessionStorage.getItem("userID")}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(async json => {
        await this.setState({ friends: json.friends });
        console.log(this.state.friends);
      })
      .catch(error => console.log("Caught Error", error));
  }

  handleClick(evt) {
    evt.preventDefault();
    if (this.state.friends.length == 0) {
      alert(
        "You have no friends! 👭 Add some friends and have a jolly Christmas! 🎄"
      );
    } else {
      fetch("/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: sessionStorage.getItem("userID"),
          card: this.state.card
        })
      })
        .then(alert("Card sent! Have a Jolly Christmas :)"))
        .catch(err => console.log(err));
    }
  }

  render() {
    if (sessionStorage.getItem("userID") === "null") {
      this.props.history.push("/search");
    }
    return (
      <div>
        <Menu />
        <img id="canvas" src={this.state.card}></img>
        <Jumbotron
          className="login"
          style={{
            width: "30%",
            position: "absolute",
            left: "940px",
            top: "45%"
          }}
        >
          <h1>
            Sorry! 😞 Your sweet message may not show up on Gmail. ☃️ Works for
            many other services 🍪!
          </h1>
          <Button
            className="loginButton"
            style={{ position: "fixed", top: "760px", left: "850px" }}
            onClick={this.handleClick}
          >
            Send Card To All My Friends
          </Button>
        </Jumbotron>
      </div>
    );
  }
}

export default SendCard;
