import React, { Component } from "react";
import axios from "axios";
import { Link, Route, withRoute } from "react-router-dom";
import { trainerPokemon, ownedPokemon } from "../services/api_helper";

import ChooseStarter from "./ChooseStarter";
import Trainer from "./Trainer";
import Menu from "./Menu";

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
    const pokemons = await ownedPokemon(localStorage.getItem("id"));
    // pokemons.data.pokemon;
    if (pokemons.data.pokemon.length !== 0) {
      this.setState({ pokemons });
    }
  };

  render() {
    return (
      <div>
        {this.state.pokemons ? (
          <Menu saySomething={e => this.props.saySomething(e)} />
        ) : (
          <ChooseStarter saySomething={e => this.props.saySomething(e)} />
        )}
      </div>
    );
  }
}

export default StartGame;
