import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { getAllPokemon, userData } from "./services/api_helper";
import { Link, Route, withRouter } from "react-router-dom";

import Pokedex from "./components/Pokedex";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: [],
      moves: []
    };
  }

  componentDidMount = async () => {
    const pokemons = await getAllPokemon();
    const test = await userData();

    this.setState({
      pokemons
    });
    console.log(this.state.pokemons);
  };

  // checkMoves = async id => {
  //   id++;
  //   const resp = await axios.get(`http://localhost:3001/pokemons/${id}/moves`);
  //   const moves = resp.data.moves;
  //   this.setState({ moves });
  //   console.log(this.state.moves);
  // };

  handleRegister = async (e, registerData) => {
    e.preventDefault();
    const regData = await registerUser(registerData);
    const trainername = regData.trainername;
    const password = regData.password;
    const formData = this.state.regData;
    const id = this.state.id;
    this.reloadReg(trainername, password);
    const currentUser = await loginUser(this.state.formData);
    this.setState({
      currentUser,
      id
    });
  };

  render() {
    return (
      <div className="App">
        <div>
          <Link to="/pokemons/pokedex">Pokedex</Link>
        </div>
        <Route path="/pokemons/pokedex" render={() => <Pokedex />} />
      </div>
    );
  }
}
