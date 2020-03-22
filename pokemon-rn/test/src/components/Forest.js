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
    const chosenPokemon = this.state.pokemons.pop([
      Math.floor(Math.random() * arrayPokemons.length)
    ]);
    console.log(chosenPokemon);
    this.setState({ proceed: true, chosenPokemon });
  };

  render() {
    return (
      <div>
        {this.state.proceed ? (
          <Battle pokemonID={this.state.chosenPokemon} />
        ) : (
          <>
            <div>
              {this.state.pokemons && (
                <div>
                  {this.state.pokemons.map(data => (
                    <>
                      <img src={data.frontImage} />
                    </>
                  ))}
                </div>
              )}
              {this.state.routeMaps.map(data => (
                <div>
                  <img
                    onClick={() => this.forestPokemons(data.arrayPokemons)}
                    src={data.image}
                  />
                  <h5>{data.name}</h5>
                </div>
              ))}
            </div>
            {this.state.isClicked && (
              <div>
                <button onClick={() => this.battle()}>OK</button>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}

export default withRouter(Forest);
