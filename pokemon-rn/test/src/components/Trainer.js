import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";

import { trainerPokemon, getMoves } from "../services/api_helper";

class Trainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: [],
      moves: [],
      group1: {
        pokemon: [],
        moves: []
      }
    };
  }

  componentDidMount = async () => {
    const pokemon = await trainerPokemon();
    console.log(pokemon);
    let moves = [];
    for (let i = 0; i < pokemon.length; i++) {
      moves = await getMoves(pokemon[i].id);
    }
    this.setState({ pokemon, moves });
  };

  render() {
    return (
      <div>
        {this.state.moves && (
          <>
            {this.state.moves.map(data => (
              <div>test</div>
            ))}
          </>
        )}
        {this.state.pokemon && (
          <div>
            {this.state.pokemon.map(data => (
              <div>
                <h4>{data.name}</h4>
                <img src={data.frontImage} />
                <p>{data.health}</p>
              </div>
            ))}
            {this.state.moves && this.state.moves.map(data => <>{data.name}</>)}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Trainer);
