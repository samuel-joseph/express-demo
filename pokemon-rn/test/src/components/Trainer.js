import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";

import { trainerPokemon } from "../services/api_helper";

class Trainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: null,
      moves: []
    };
  }

  componentDidMount = async () => {
    const pokemon = await trainerPokemon();
    console.log(pokemon);
    this.setState({ pokemon });
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
