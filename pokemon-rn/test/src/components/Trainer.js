import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";

import { trainerPokemon, getMoves } from "../services/api_helper";

class Trainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: [],
      moves: []
    };
  }

  componentDidMount = async () => {
    const pokemon = await trainerPokemon();
    const moves = [];
    console.log(pokemon);
    for (let i = 0; i < pokemon.length; i++) {
      moves.push(await getMoves(pokemon[i].id));
    }
    console.log(moves);
    this.setState({ pokemon, moves });
  };

  render() {
    return (
      <div>
        {console.log(this.state.pokemon)}
        {this.state.pokemon && (
          <div>
            {this.state.pokemon.map(data => (
              <div>
                <h4>{data.name}</h4>
                <img src={data.frontImage} />
                <p>{data.health}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Trainer);
