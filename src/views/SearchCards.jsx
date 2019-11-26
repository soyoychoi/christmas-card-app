import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { MDBInput, MDBCol, MDBBtn, MDBFormInline } from "mdbreact";
import ChristmasCard from "../components/ChristmasCard.jsx";
import Menu from "../components/Menu";

class SearchCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      name: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    console.log(sessionStorage.getItem("userID"));
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    fetch("/cards", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(async json => {
        await this.setState({ cards: json.cards });
        console.log(json.cards);
      })
      .catch(error => console.log("Caught Error", error));
  }

  handleClick(event) {
    event.preventDefault();
    fetch(`/cards?q=${this.state.name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({ cards: json.cards });
      })
      .catch(error => console.log("Caught Error", error));
  }

  handleChange = async event => {
    await this.setState({ name: event.target.value });
  };

  cards = () => {
    return (
      <div>
        <ul id="cardList">
          <li>
            <h1>Click to create!</h1>
            <ChristmasCard cardName="Create New" img=""></ChristmasCard>
          </li>
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
  };

  searchPage = () => {
    return (
      <MDBCol md="6" id="searchBar">
        <MDBFormInline className="input-group md-form form-sm form-1 pl-0">
          <input
            className="form-control form-control-md"
            type="text"
            placeholder="Search"
            aria-label="Search"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <MDBBtn
            color="warning"
            rounded
            size="md"
            type="submit"
            className="mr-auto"
            onClick={this.handleClick}
          >
            Search
          </MDBBtn>
        </MDBFormInline>
      </MDBCol>
    );
  };

  render() {
    return (
      <div>
        <Menu />
        {this.searchPage()}
        {this.cards()}
      </div>
    );
  }
}

export default SearchCards;
