import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import { getPokemon, storePokemon, getMoves } from "../services/api_helper";

class ChooseStarter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ownPokemon: null,
      chosenPokemonId: null,
      starters: [],
      formData: {
        name: null,
        frontImage: null,
        backImage: null,
        health: null
      },
      isClicked: false
    };
  }

  componentDidMount = async () => {
    const starters = [];
    const id = [1, 4, 7];
    for (let i = 0; i < 3; i++) {
      const resp = await getPokemon(id[i]);
      starters.push(resp);
      console.log(resp);
    }
    this.setState({ starters });
  };

  chosenPokemon = pokemon => {
    const chosenPokemonId = pokemon.id;
    this.setState({
      formData: {
        ...this.state.formData,
        name: pokemon.name,
        frontImage: pokemon.frontImage,
        backImage: pokemon.backImage,
        health: pokemon.health
      }
    });
    this.setState({
      isClicked: true,
      chosenPokemonId
    });
  };

  savePokemon = async () => {
    const pokemon = await storePokemon(this.state.formData);
    console.log(this.state.chosenPokemonId);
    const moves = await getMoves(this.state.chosenPokemonId);
    console.log(moves);

    this.props.history.push("/start");
  };

  render() {
    return (
      <div>
        {this.state.starters && (
          <div>
            {this.state.starters.map(pokemon => (
              <div>
                <img
                  className="pokeball"
                  onClick={() => this.chosenPokemon(pokemon)}
                  src="https://pngimage.net/wp-content/uploads/2018/06/pokeball-pixel-png-8.png"
                />
              </div>
            ))}
            {this.state.isClicked && (
              <div>
                <h4>{this.state.formData.name}</h4>
                <img className="pokemon" src={this.state.formData.frontImage} />
                <button onClick={() => this.savePokemon()}>OK</button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ChooseStarter);
