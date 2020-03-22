import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";

import { trainerPokemon, getMoves } from "../services/api_helper";

class Battle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      randomPokemon: [],
      randomPokemonAttack: null,
      userPokemon: null,
      userPokemonAttacks: null
    };
  }

  componentDidMount = async () => {
    const arrayPokemons = this.props.pokemonID;
    const randomPokemon = [];
    randomPokemon.push(arrayPokemons);
    const userPokemon = await trainerPokemon();
    console.log(arrayPokemons);
    const randomPokemonAttack = await getMoves(arrayPokemons.id);
    const userPokemonAttacks = await getMoves(userPokemon[0].id);

    this.setState({
      randomPokemon,
      userPokemon,
      randomPokemonAttack,
      userPokemonAttacks
    });
  };

  render() {
    return (
      <div>
        {this.state.userPokemon && (
          <div>
            {console.log(this.state.randomPokemonAttack)}
            <div>
              {this.state.randomPokemon.map((stray, index) => (
                <div key={index}>
                  <div>
                    <img src={stray.frontImage} />
                  </div>
                  <div>
                    <p>{stray.name}</p>
                    <p>{stray.health}</p>
                  </div>
                  <div>
                    {this.state.randomPokemonAttack && (
                      <>
                        {this.state.randomPokemonAttack.map(data => (
                          <div>
                            {data.name}
                            {data.attack}
                          </div>
                        ))}
                      </>
                    )}
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
            <div>
              {this.state.userPokemonAttacks && (
                <>
                  {this.state.userPokemonAttacks.map(data => (
                    <div>
                      {data.name}
                      {data.attack}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Battle);
