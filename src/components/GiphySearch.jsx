import React, { Component } from "react";
import ListGifs from "./ListGifs";
import Jumbotron from "react-bootstrap/Jumbotron";

class GiphySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      selected: []
    };
  }
  componentDidMount() {
    fetch(
      "https://api.giphy.com/v1/stickers/search?q=christmas&api_key=ebHbRZ2jHH184B4tIONeTiZwY6Zwpm1k",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      }
    )
      .then(res => res.json())
      .then(json => {
        this.setState({ results: json.data });
      })
      .catch(err => console.log(err));
  }

  getSelectedGifs = async data => {
    await this.state.selected.push(data);
    this.props.getGifs(data);
  };

  render() {
    return (
      <div>
        <Jumbotron className="gifbox">
          <h1 style={{ color: "#FFFFFF" }}>
            Click on ONE sticker to add to the card!
          </h1>
          <ListGifs
            selectedGifs={this.getSelectedGifs}
            gifs={this.state.results}
          ></ListGifs>
        </Jumbotron>
      </div>
    );
  }
}

export default GiphySearch;
