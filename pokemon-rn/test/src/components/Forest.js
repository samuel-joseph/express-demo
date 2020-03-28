import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import { getPokemon } from "../services/api_helper";

import Battle from "./Battle";

class Forest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routeMaps: [
        {
          image:
            "https://i.pinimg.com/originals/2a/a2/0b/2aa20b2129a6b56fd02eb2d794a1a689.png",
          name: "Route 1-35",
          arrayPokemons: [19, 16, 29, 32, 147, 133]
        },
        {
          image:
            "https://i.pinimg.com/originals/2a/a2/0b/2aa20b2129a6b56fd02eb2d794a1a689.png",
          name: "Route 36-75",
          arrayPokemons: [25, 35, 106, 107, 123, 74]
        },
        {
          image:
            "https://i.pinimg.com/originals/2a/a2/0b/2aa20b2129a6b56fd02eb2d794a1a689.png",
          name: "Route 75-100",
          arrayPokemons: [42, 95, 108, 79, 126, 143]
        }
      ],
      pokemons: [],
      chosenPokemon: null,
      isClicked: false,
      proceed: false
    };
  }

  componentDidMount = () => {
    this.props.saySomething(
      " Choose any of the forest then press HUNT button to either catch a pokemon or just battle! HAPPY HUNTING!"
    );
  };

  resetMap = () => {
    const pokemons = "";
    this.setState({ pokemons });
  };

  forestPokemons = async arrayPokemons => {
    const id = arrayPokemons;
    this.resetMap();
    for (let i = 0; i < id.length; i++) {
      const pokemons = await getPokemon(id[i]);
      this.setState({
        pokemons: [...this.state.pokemons, pokemons],
        isClicked: true
      });
    }
  };

  battle = () => {
    const arrayPokemons = this.state.pokemons;
    const chosenPokemon = this.state.pokemons[
      Math.floor(Math.random() * Math.floor(arrayPokemons.length - 1))
    ];

    this.setState({ proceed: true, chosenPokemon });
  };

  render() {
    return (
      <div>
        {this.state.proceed ? (
          <Battle
            saySomething={e => this.props.saySomething(e)}
            pokemonID={this.state.chosenPokemon}
          />
        ) : (
          <>
            <div>
              <div className="forest">
                {this.state.routeMaps.map(data => (
                  <div className=".grass">
                    <img
                      className="grassImg"
                      onClick={() => this.forestPokemons(data.arrayPokemons)}
                      src={data.image}
                    />
                    <h5>{data.name}</h5>
                  </div>
                ))}
              </div>
            </div>
            {this.state.pokemons && (
              <div className="pokemonContainer">
                {this.state.pokemons.map(data => (
                  <div>
                    <img className="pokemon" src={data.frontImage} />
                  </div>
                ))}
              </div>
            )}
            {this.state.isClicked && (
              <div>
                <button className="register" onClick={() => this.battle()}>
                  CONFIRM
                </button>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}

export default withRouter(Forest);
