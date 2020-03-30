import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";

import { trainerPokemon, getMoves, remove } from "../services/api_helper";

class Trainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: [],
      moves: [],
      showPokemon: {
        id: null,
        name: null,
        frontImage: null,
        level: null,
        current_health: null,
        health: null,
        current_experience: null,
        total_experience: null
      }
    };
  }

  componentDidMount = async () => {
    console.log(localStorage.getItem("name"));
    const pokemon = await trainerPokemon();
    const moves = await getMoves(pokemon[0].id);
    if (pokemon.length === 0) {
      this.props.history.push("/start");
    } else {
      this.props.saySomething("Here are your pokemons");
      const showPokemon = {
        id: pokemon[0].id,
        name: pokemon[0].name,
        frontImage: pokemon[0].frontImage,
        level: pokemon[0].level,
        current_health: pokemon[0].current_health,
        health: pokemon[0].health,
        current_experience: pokemon[0].current_experience,
        total_experience: pokemon[0].total_experience
      };
      this.setState({ pokemon, showPokemon, moves });
    }
  };
  isFree = async regards => {
    this.props.saySomething(`Say goodbye to ${regards.name}`);
    const resp = await remove(regards.id);
    const pokemon = await trainerPokemon();
    this.setState({ pokemon });
  };

  showMoves = async pokemon => {
    this.props.saySomething(`This is your ${pokemon.name}`);
    const moves = await getMoves(pokemon.id);
    const frontImage = pokemon.frontImage;
    const level = pokemon.level;
    const name = pokemon.name;
    const health = pokemon.health;
    const current_health = pokemon.current_health;
    const current_experience = pokemon.current_experience;
    const total_experience = pokemon.total_experience;
    const id = pokemon.id;

    this.setState({
      isClicked: true,
      moves,
      showPokemon: {
        ...this.state.showPokemon,
        id,
        frontImage,
        name,
        level,
        health,
        current_experience,
        total_experience,
        health,
        current_health
      }
    });
  };

  render() {
    return (
      <div className="typeA">
        <h1>TRAINER {localStorage.getItem("name")}</h1>
        {this.state.pokemon && (
          <div className="trainer">
            <div className="trainerA">
              {this.state.pokemon.map(data => (
                <div>
                  <img
                    className="trainerPokemon"
                    src="https://i.ya-webdesign.com/images/pokeball-pixel-png-2.png"
                    onClick={() => this.showMoves(data)}
                  />
                </div>
              ))}
            </div>
            <div className="moveContainer">
              {this.state.showPokemon && (
                <div className="specificPokemonA">
                  <div className="specificPokemonB">
                    <span>
                      <h4>{this.state.showPokemon.name}</h4>
                      Level {this.state.showPokemon.level}
                    </span>
                    <img
                      className="specificPokemon"
                      src={this.state.showPokemon.frontImage}
                    />
                    <div className="pokemonDetails">
                      <div>
                        HP {this.state.showPokemon.current_health} /
                        {this.state.showPokemon.health}
                      </div>
                      <div>
                        XP {this.state.showPokemon.current_experience} /{" "}
                        {this.state.showPokemon.total_experience}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div class="movesets">
                <h4>MOVES</h4>
                {this.state.moves && (
                  <div>
                    {this.state.moves.map(data => (
                      <div>
                        {data.name}:{data.attack}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {this.state.isClicked && (
                <button
                  className="register"
                  onClick={() => this.isFree(this.state.showPokemon)}
                >
                  free
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Trainer);
