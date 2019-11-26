import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Layer, Rect, Stage, Group } from "react-konva";
import Konva from "konva";
import Button from "react-bootstrap/Button";
import GiphySearch from "../components/GiphySearch.jsx";
import Jumbotron from "react-bootstrap/Jumbotron";
import "../index.css";
import Menu from "../components/Menu.jsx";
import Form from "react-bootstrap/Form";

class ChristmasCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      selectedGifs: [],
      selected: {},
      mouseX: 0,
      mouseY: 0,
      color: "white",
      card: "",
      new: false
    };
    this.changeColor = this.changeColor.bind(this);
    this.download = this.download.bind(this);
    this.send = this.send.bind(this);
    this.save = this.save.bind(this);
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    const { data } = this.props.location;
    if (data === undefined) {
      this.props.history.push("/search");
    }
    if (data !== "Create New") {
      await fetch(`/cards/${data}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(async json => {
          console.log(json.cards[0].img);
          await this.setState({ card: json.cards[0].img });
        })
        .catch(error => console.log("Caught Error", error));
    }
    if (this.state.card !== "") {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      const imageUrl = this.state.card;
      const background = new Image();
      background.src = imageUrl;
      background.onload = function() {
        ctx.drawImage(background, 0, 0);
      };
      await this.setState({ color: "" });
    }
  }

  getSelectedGifs = async data => {
    await this.state.selectedGifs.push(data);
    await this.setState({ selected: data });
    const ctx = document.querySelector("canvas").getContext("2d");
    const img = new Image();
    img.setAttribute("crossorigin", "anonymous");
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
    };
    img.src = data;
  };

  changeColor() {
    const color = Konva.Util.getRandomColor();
    this.setState({ color: color });
  }

  addText() {
    const ctx = document.querySelector("canvas").getContext("2d");
    ctx.font = "70px Mountains of Christmas";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    ctx.fillText("Merry Christmas!", 750, 300);
  }

  download() {
    function fillCanvas(canvas, color) {
      const ctx = canvas.getContext("2d");
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }
    const link = document.createElement("a");
    link.download = "card.png";
    const canvas = document.getElementById("canvas");
    fillCanvas(canvas, this.state.color);
    const dataUrl = canvas.toDataURL("png");
    link.href = dataUrl;
    link.click();
  }

  send() {
    if (sessionStorage.getItem("userID") !== "null") {
      function fillCanvas(canvas, color) {
        const ctx = canvas.getContext("2d");
        ctx.save();
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
      }
      const canvas = document.getElementById("canvas");
      fillCanvas(canvas, this.state.color);
      const dataUrl = canvas.toDataURL("png");
      this.props.history.push({
        pathname: "/send",
        data: dataUrl
      });
    } else {
      alert("To send cards, you must log in! 🎄");
    }
  }

  save() {
    if (sessionStorage.getItem("userID") === "null") {
      alert("You must be logged in to save cards! 🎄");
    } else {
      if (this.state.name === "") {
        alert("Please enter valid card name! 🎄");
      } else {
        function fillCanvas(canvas, color) {
          const ctx = canvas.getContext("2d");
          ctx.save();
          ctx.globalCompositeOperation = "destination-over";
          ctx.fillStyle = color;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.restore();
        }
        const canvas = document.getElementById("canvas");
        fillCanvas(canvas, this.state.color);
        console.log(this.state.name);
        const dataUrl = canvas.toDataURL("png");
        console.log(dataUrl);
        fetch("/cards", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cardName: this.state.name,
            img: `${dataUrl}`,
            username: sessionStorage.getItem("userID")
          })
        })
          .then(res => res.json())
          .then(json => {
            if (json.success) {
              alert("successfully saved!");
            }
          })
          .catch(err => console.log(err));
      }
    }
  }

  async handleChange(e) {
    await this.setState({ name: e.target.value });
  }

  render() {
    return (
      <div>
        <Menu />
        <audio controls src={require("../christmas3.mp3")}></audio>
        <canvas
          id="canvas"
          style={{ background: this.state.color }}
          onDrop="drop(event)"
          width={800}
          height={600}
          onDragOver="allowDrop(event)"
        ></canvas>
        <Jumbotron className="tools">
          <Button
            onClick={this.addText}
            className="toolButton"
            style={{ left: "675px" }}
          >
            Add Text
          </Button>
          <Button
            onClick={this.send}
            className="toolButton"
            style={{ left: "770px" }}
          >
            Send
          </Button>
          <Button
            onClick={this.changeColor}
            className="toolButton"
            style={{ left: "550px" }}
          >
            Change color
          </Button>
          <Button
            onClick={this.download}
            className="toolButton"
            style={{ left: "445px" }}
          >
            Download
          </Button>
          <Button
            onClick={this.save}
            className="toolButton"
            style={{ left: "380px" }}
          >
            Save
          </Button>
          <input
            type="text"
            value={this.state.name}
            style={{ marginTop: "1.5%" }}
            onChange={this.handleChange.bind(this)}
            placeholder="Enter card name:"
          />
        </Jumbotron>
        <GiphySearch getGifs={this.getSelectedGifs}></GiphySearch>
      </div>
    );
  }
}

export default ChristmasCanvas;
