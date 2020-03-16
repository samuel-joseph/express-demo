import React, { Component } from "react";
import axios from "axios";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: [],
      cool: ["a", "b", "c"]
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

  render() {
    return (
      <div className="App">
        {this.state.pokemons && (
          <>
            {console.log("HEYOOO")}
            {console.log(this.state)}
            {this.state.pokemons.map(data => (
              <div className="inner">
                <div className="desc">
                  <h4>{data.name}</h4>
                  <img src={data.frontImage} />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    );
  }
}
