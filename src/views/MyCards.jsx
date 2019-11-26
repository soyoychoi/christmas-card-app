import React, { Component } from "react";
import ChristmasCard from "../components/ChristmasCard.jsx";
import Menu from "../components/Menu";

class MyCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    console.log(sessionStorage.getItem("userID") === null);
    if (
      sessionStorage.getItem("userID") === "null" ||
      sessionStorage.getItem("userID") === null
    ) {
      alert("You must log in to access your cards! ☃️");
      this.props.history.push("/");
    } else {
      fetch(`/mycards?q=${sessionStorage.getItem("userID")}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.json())
        .then(async json => {
          await this.setState({ cards: json.cards });
          console.log(json.cards);
        })
        .catch(err => console.log(err));
    }
  }

  handleChange = async event => {
    await this.setState({ name: event.target.value });
  };

  render() {
    return (
      <div>
        <Menu></Menu>
        <ul id="cardList">
          {this.state.cards.map(christmasCard => {
            return (
              <li id="cardItem">
                <h1>Click to edit!</h1>
                <ChristmasCard
                  cardName={christmasCard.cardName}
                  img={christmasCard.img}
                  onClick={this.handleChange}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default MyCards;
