import React, { Component } from "react";
import GifBox from "./GifBox.jsx";

class ListGifs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGifs: []
    };
  }

  getSelectedGifs = data => {
    this.state.selectedGifs.push(data);
    this.props.selectedGifs(data);
  };

  render() {
    const list = this.props.gifs.map(gif => {
      return (
        <GifBox
          selectedGifs={this.getSelectedGifs}
          selected={false}
          className="gifbox"
          gif={gif}
        ></GifBox>
      );
    });
    return <ul>{list}</ul>;
  }
}

export default ListGifs;
