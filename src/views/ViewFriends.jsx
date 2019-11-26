import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Menu from "../components/Menu.jsx";
import { Redirect } from "react-router";

class ViewFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      friends: [],
      addMode: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.cancel = this.cancel.bind(this);
    this.deleteFriend = this.deleteFriend.bind(this);
  }

  componentDidMount() {
    fetch(`/friends?q=${sessionStorage.getItem("userID")}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(async json => {
        if (json.friends === null) {
          await this.setState({ friends: [] });
        } else {
          await this.setState({ friends: json.friends });
        }
      })
      .catch(err => console.log(err));
  }

  handleClick = async () => {
    console.log("herllo");
    await this.setState({ addMode: true });
  };

  handleChange = name => async event => {
    await this.setState({ [name]: event.target.value });
  };

  addFriend() {
    if (!this.state.email.includes("@")) {
      alert("Please enter a valid email address! 🎅");
    } else {
      fetch(`/friends?q=${sessionStorage.getItem("userID")}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.state.name,
          username: this.state.email
        })
      })
        .then(async () => {
          await this.setState({ addMode: false });
          window.location.load();
        })
        .catch(err => console.log(err));
    }
  }
  async cancel() {
    await this.setState({ addMode: false });
  }
  add() {
    return (
      <Jumbotron className="login">
        <Form>
          <Form.Group>
            <Form.Label>Your Friend's Name</Form.Label>
            <Form.Control
              className="textField"
              value={this.state.name}
              type="text"
              required
              onChange={this.handleChange("name")}
              placeholder="Name"
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Your Friend's Email</Form.Label>
            <Form.Control
              className="textField"
              value={this.state.email}
              onChange={this.handleChange("email")}
              type="email"
              placeholder="Enter your friend's email"
            ></Form.Control>
          </Form.Group>
          <Button
            className="loginButton"
            type="submit"
            onClick={this.addFriend}
            style={{ fontSize: "1.5rem" }}
          >
            Add Friend!
          </Button>
          <Button
            className="loginButton"
            onClick={this.cancel}
            style={{ fontSize: "1.5rem" }}
          >
            Cancel
          </Button>
        </Form>
      </Jumbotron>
    );
  }
  deleteFriend = data => async evt => {
    evt.preventDefault();
    fetch(`/friends?q=${sessionStorage.getItem("userID")}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        username: data.username,
        delete: true
      })
    })
      .then((window.location.href = "/friends"))
      .catch(err => console.log(err));
  };
  friends() {
    return (
      <div>
        <Table
          striped
          bordered
          style={{
            width: "60%",
            position: "absolute",
            top: "50%",
            left: "5%",
            fontSize: "2rem",
            background: "#ffa9d84f"
          }}
        >
          <thead
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              background: "#FFFFFF"
            }}
          >
            <tr>
              <th>#</th>
              <th>Friend Name</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody style={{ fontFamily: "Helvetica" }}>
            {this.state.friends.map(friend => (
              <tr>
                <td>{this.state.friends.indexOf(friend) + 1}</td>
                <td>{friend.name}</td>
                <td>{friend.username}</td>
                <td>
                  <Button
                    variant="danger"
                    value={{ name: friend.name, username: friend.username }}
                    onClick={this.deleteFriend({
                      name: friend.name,
                      username: friend.username
                    })}
                    type="submit"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button
          onClick={this.handleClick}
          className="loginButton"
          style={{
            fontSize: "2rem",
            position: "absolute",
            top: "26%",
            left: "40%",
            width: "15%",
            height: "13%"
          }}
        >
          Add Friends!
        </Button>
      </div>
    );
  }

  render() {
    if (sessionStorage.getItem("userID") === "null") {
      return <Redirect to="/login"></Redirect>;
    } else {
      return (
        <div>
          <Menu />
          {this.state.friends.length == 0 ? (
            <div>
              <Jumbotron className="login">
                <h1>
                  You have no friends! <br /> Add some friends and have a merry
                  Christmas!
                </h1>
                <Button
                  onClick={this.handleClick}
                  className="loginButton"
                  style={{ fontSize: "2rem" }}
                >
                  Add Friends!
                </Button>
              </Jumbotron>
            </div>
          ) : this.state.addMode ? (
            this.add()
          ) : (
            this.friends()
          )}
          {this.state.friends.length == 0 && this.state.addMode
            ? this.add()
            : null}
        </div>
      );
    }
  }
}

export default ViewFriends;
