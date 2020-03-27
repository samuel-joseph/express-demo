import React, { Component } from "react";
import axios from "axios";
import { Link, Route, withRoute } from "react-router-dom";
import { trainerPokemon, ownedPokemon } from "../services/api_helper";

import ChooseStarter from "./ChooseStarter";
import Trainer from "./Trainer";

class StartGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      name: null,
      pokemons: null
    };
  }

  componentDidMount = async () => {
    console.log("This is StartGame component");
    const pokemons = await ownedPokemon(localStorage.getItem("id"));
    if (pokemons.pokemon.length !== 0) {
      this.setState({ pokemons });
    }
  };

  render() {
    return (
      <div>
        {this.state.pokemons ? (
          <Trainer />
        ) : (
          <ChooseStarter saySomething={e => this.props.saySomething(e)} />
        )}
      </div>
    );
  }
}

export default StartGame;
