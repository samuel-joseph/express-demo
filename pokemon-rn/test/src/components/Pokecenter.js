import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import {
  update,
  trainerPokemon,
  ownedPokemon,
  getPokemon
} from "../services/api_helper";

class Pokecenter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      pokemon: [],
      formData: {
        current_health: null
      },
      isClicked: false
    };
  }

  componentDidMount = async () => {
    const user = await trainerPokemon();
    this.setState({ user });
    console.log(user);
  };

  heal = async () => {
    const user = this.state.user;
    for (let i = 0; i < user.length; i++) {
      let id = user[i].id;
      let fullHp = user[i].health;
      let passData = {
        current_health: fullHp
      };
      const regainHp = await update(id, passData);
    }
    this.setState({ isClicked: true });
  };

  show = async id => {
    const pokemon = [];
    const resp = await getPokemon(id);
    pokemon.push(resp);
    console.log(pokemon);
    this.setState({ pokemon });
  };

  render() {
    return (
      <div>
        {this.state.user && (
          <div className="pokecenter0">
            {this.state.isClicked ? (
              this.state.user.map(data => (
                <img className="pokeAtCenter" src={data.frontImage} />
              ))
            ) : (
              <div className="pokecenter">
                {this.state.user.map(data => (
                  <div className="pokecenter1">
                    <img
                      className="healPoke"
                      onClick={() => this.show(data.id)}
                      src="https://i.ya-webdesign.com/images/pokeball-pixel-png-2.png"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {!this.state.isClicked && (
          <button className="register" onClick={() => this.heal()}>
            HEAL
          </button>
        )}
      </div>
    );
  }
}

export default withRouter(Pokecenter);
