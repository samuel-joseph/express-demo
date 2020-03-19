import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import { getPokemon, storePokemon } from "../services/api_helper";

class ChooseStarter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      starters: [],
      formData: {
        name: null,
        frontImage: null,
        backImage: null,
        health: null
      }
    };
  }

  componentDidMount = async () => {
    const starters = [];
    const id = [1, 4, 7];
    for (let i = 0; i < 3; i++) {
      const resp = await getPokemon(id[i]);
      starters.push(resp);
    }
    this.setState({ starters });
  };

  passPokemon = async (name, frontImage, backImage, health) => {
    console.log(name);
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        name,
        frontImage,
        backImage,
        health
      }
    }));
  };

  chosenPokemon = async pokemon => {
    this.passPokemon(
      pokemon.name,
      pokemon.frontImage,
      pokemon.backImage,
      pokemon.health
    );
    const formData = this.state.formData;
    console.log(formData);
    const resp = await storePokemon(formData);
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
                {console.log(this.state.formData)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ChooseStarter);
