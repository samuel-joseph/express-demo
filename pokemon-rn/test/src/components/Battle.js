import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";

import { trainerPokemon } from "../services/api_helper";

class Battle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      randomPokemon: [],
      userPokemon: null
    };
  }

  componentDidMount = async () => {
    const arrayPokemons = this.props.pokemonID;
    const chosenPokemon = [Math.floor(Math.random() * arrayPokemons.length)];
    const randomPokemon = [];
    randomPokemon.push(arrayPokemons[chosenPokemon]);
    const userPokemon = await trainerPokemon();

    this.setState({ randomPokemon, userPokemon });
  };

  render() {
    return (
      <div>
        {this.state.userPokemon && (
          <div>
            <div>
              {this.state.randomPokemon.map(stray => (
                <div>
                  <div>
                    <img src={stray.frontImage} />
                  </div>
                  <div>
                    <p>{stray.name}</p>
                    <p>{stray.health}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              {this.state.userPokemon.map(user => (
                <div>
                  <div>
                    <img src={user.backImage} />
                  </div>
                  <div>
                    <p>{user.name}</p>
                    <p>{user.health}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Battle);
