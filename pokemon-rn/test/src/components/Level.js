import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import { trainerPokemon } from "../services/api_helper";

class Level extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: []
    };
  }

  componentDidMount = async () => {
    const pokemon = await trainerPokemon();
  };

  render() {
    return <div></div>;
  }
}
export default withRouter(Level);
