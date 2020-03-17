import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { getAllPokemon, userData } from "./services/api_helper";
import { createPortal } from "react-dom";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: [],
      moves: []
    };
  }

  componentDidMount = async () => {
    const pokemons = await getAllPokemon();
    const test = await userData();

    console.log(test);
    this.setState({
      pokemons
    });
    console.log(this.state.pokemons);
  };

  checkMoves = async id => {
    id++;
    const resp = await axios.get(`http://localhost:3001/pokemons/${id}/moves`);
    const moves = resp.data.moves;
    this.setState({ moves });
    console.log(this.state.moves);
  };

  render() {
    return (
      <div className="App">
        {this.state.pokemons && (
          <>
            {this.state.pokemons.map((data, index) => (
              <div key={index} className="desc">
                <h4>{data.name}</h4>
                <img
                  onClick={() => this.checkMoves(index)}
                  src={data.frontImage}
                />
              </div>
            ))}
          </>
        )}
      </div>
    );
  }
}
