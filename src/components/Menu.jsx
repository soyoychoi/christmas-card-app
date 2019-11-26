import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);
    this.barList = this.barList.bind(this);
    this.list = [{ name: "Search Cards", url: "/search" }];
    this.userList = [
      { name: "My Friends", url: "/friends" },
      { name: "My Cards", url: "/mycards" }
    ];
    console.log(sessionStorage.getItem("userID") === "null");
  }

  barList = () => {
    return (
      <div>
        <form class="form-inline">
          {this.list.map(link => (
            <a class="nav-item nav-link" href={link.url}>
              {link.name}
            </a>
          ))}
          {sessionStorage.getItem("userID") !== "null"
            ? this.userList.map(link => (
                <a class="nav-item nav-link" href={link.url}>
                  {link.name}
                </a>
              ))
            : null}
        </form>
      </div>
    );
  };

  signout = () => {
    fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        sessionStorage.setItem("userID", null);
        window.location.href = "/login";
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          {sessionStorage.getItem("userID") !== "null" ? (
            <Button
              style={{ fontSize: "1.5rem" }}
              variant="warning"
              onClick={this.signout}
            >
              Log Out
            </Button>
          ) : null}
          {this.barList()}
        </nav>
      </div>
    );
  }
}

export default Menu;
