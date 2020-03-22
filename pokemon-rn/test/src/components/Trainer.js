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
    if (pokemon.length === 0) {
      this.props.history.push("/start");
    }
    this.setState({ pokemon });
  };

  showMoves = async id => {
    const moves = await getMoves(id);
    this.setState({ moves });
  };

  render() {
    return (
      <div>
        {this.state.pokemon && (
          <div>
            {this.state.pokemon.map(data => (
              <div>
                <h4>{data.name}</h4>
                <img
                  src={data.frontImage}
                  onClick={() => this.showMoves(data.id)}
                />
                <p>
                  {data.current_health}/{data.health}
                </p>
              </div>
            ))}
            {this.state.moves &&
              this.state.moves.map(data => (
                <div>
                  {data.name}:{data.attack}
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Trainer);
