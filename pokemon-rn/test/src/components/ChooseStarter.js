import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import { getPokemon, storePokemon } from "../services/api_helper";

class ChooseStarter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ownPokemon: null,
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
      isClicked: true
    });
  };

  savePokemon = async () => {
    const resp = await storePokemon(this.state.formData);
    console.log(resp);
  };

  render() {
    return (
      <div>
        {this.state.starters && (
          <div>
            {this.state.starters.map(pokemon => (
              <div>
                <img
                  onClick={() => this.chosenPokemon(pokemon)}
                  src={pokemon.frontImage}
                />
              </div>
            ))}
            {this.state.isClicked && (
              <div>
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
