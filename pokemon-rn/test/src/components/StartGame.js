import React, { Component } from "react";
import axios from "axios";
import { Link, Route, withRoute } from "react-router-dom";
import { trainerPokemon } from "../services/api_helper";

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
    const id = localStorage.getItem("id");
    const name = localStorage.getItem("name");
    const pokemons = await trainerPokemon();
    this.setState({ id, name, pokemons });
  };

  render() {
    return (
      <div>
        {console.log(this.state.pokemons)}
        {this.state.pokemons ? <p>checkY</p> : <ChooseStarter />}
      </div>
    );
  }
}

export default StartGame;
