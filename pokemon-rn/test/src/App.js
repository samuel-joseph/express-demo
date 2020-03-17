import React, { Component } from "react";
import axios from "axios";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: [],
      moves: []
    };
  }

  componentDidMount = async () => {
    const resp = await axios.get("http://localhost:3001/pokemons/pokedex");
    const pokemons = resp.data.pokemons;

    this.setState({
      pokemons
    });
    console.log(this.state.pokemons);
  };

  checkMoves = async id => {
    console.log(id);
    const resp
  };

  render() {
    return (
      <div className="App">
        {this.state.pokemons && (
          <>
            {console.log("HEYOOO")}
            {console.log(this.state)}
            {this.state.pokemons.map((data, index) => (
              <div key={index} className="desc">
                <h4>{data.name}</h4>
                <img
                  onClick={() => this.checkMoves(index)}
                  src={data.frontImage}
                />
              </div>
            ))}
          </>
        )}
      </div>
    );
  }
}
