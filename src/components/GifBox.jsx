import React, { Component } from "react";

class GifBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gif: this.props.gif.images.downsized.url,
      selected: this.props.selected
    };
    this.handleClick = this.handleClick.bind(this);
  }
  async handleClick(evt) {
    evt.preventDefault();
    await this.setState({ selected: true });
    if (this.state.selected) {
      this.props.selectedGifs(this.state.gif);
    }
  }
  render() {
    return (
      <li onClick={this.handleClick}>
        <img src={this.state.gif} />
      </li>
    );
  }
}

export default GifBox;
