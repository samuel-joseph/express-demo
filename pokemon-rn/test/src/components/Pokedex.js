import React, { Component } from "react";
import axios from "axios";
import { getAllPokemon } from "../services/api_helper";

export default class Pokedex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: []
    };
  }

  componentDidMount = async () => {
    const pokemons = await getAllPokemon();
    this.setState({ pokemons });
  };

  render() {
    return (
      <div>
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
