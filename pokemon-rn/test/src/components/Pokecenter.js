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
        <div>
          {this.state.user && (
            <>
              {this.state.user.map(data => (
                <div>
                  <img
                    onClick={() => this.show(data.id)}
                    src="https://pngimage.net/wp-content/uploads/2018/06/pokeball-pixel-png-8.png"
                  />
                </div>
              ))}
            </>
          )}
        </div>
        {!this.state.isClicked && (
          <button onClick={() => this.heal()}>HEAL</button>
        )}
        {this.state.pokemon && (
          <>
            {this.state.pokemon.map(data => (
              <div>
                <img src={data.frontImage} />
                <div>
                  {data.current_health}/{data.health}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    );
  }
}

export default withRouter(Pokecenter);
