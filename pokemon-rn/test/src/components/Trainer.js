import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";

import { trainerPokemon, getMoves } from "../services/api_helper";

class Trainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: [],
      moves: [],
      group1: [{}]
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
    console.log(moves);
    this.setState({ moves });
  };

  render() {
    return (
      <div className="typeA">
        {this.state.pokemon && (
          <div className="trainer">
            {this.state.pokemon.map(data => (
              <div className="specificPokemon">
                <img
                  className="pokemon"
                  src={data.frontImage}
                  onClick={() => this.showMoves(data.id)}
                />
                <p>
                  {data.name} Level {data.level}
                </p>
                <p>
                  <div>
                    HP: {data.current_health}/{data.health}
                  </div>
                  <div>
                    EXP: {data.current_experience}/{data.total_experience}
                  </div>
                </p>
              </div>
            ))}
            <div className="moveContainer">
              {this.state.moves &&
                this.state.moves.map(data => (
                  <div>
                    {data.name}:{data.attack}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Trainer);
