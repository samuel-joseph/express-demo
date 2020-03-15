import React, { Component } from "react";
import axios from "axios";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  componentDidMount = async () => {
    const resp = await axios.get("http://localhost:3001/pokemons/pokedex");
    console.log(resp);
  };

  render() {
    return (
      <div className="App">
        <button>HELLO</button>
      </div>
    );
  }
}
