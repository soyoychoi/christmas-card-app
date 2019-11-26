import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

class ChristmasCard extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.img);
  }

  render() {
    return (
      <Card title={this.props.cardName}>
        {this.props.img !== "" ? (
          <div>
            <img className="christmasCard" src={this.props.img}></img>
            <Link to={{ pathname: "/create", data: this.props.cardName }}>
              {this.props.cardName}
            </Link>
          </div>
        ) : (
          <div>
            <img className="christmasCard" src={require("../card.png")}></img>
            <Link to={{ pathname: "/create", data: "Create New" }}>
              Create New
            </Link>
          </div>
        )}
      </Card>
    );
  }
}

export default ChristmasCard;
