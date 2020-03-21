import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import { getPokemon } from "../services/api_helper";

class Forest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routeMaps: [
        {
          image:
            "https://i.pinimg.com/originals/2a/a2/0b/2aa20b2129a6b56fd02eb2d794a1a689.png",
          name: "Route 1-35",
          arrayPokemons: [19, 16, 29, 32, 147, 133]
        },
        {
          image:
            "https://i.pinimg.com/originals/2a/a2/0b/2aa20b2129a6b56fd02eb2d794a1a689.png",
          name: "Route 36-75",
          arrayPokemons: [25, 35, 106, 107, 123, 74]
        },
        {
          image:
            "https://i.pinimg.com/originals/2a/a2/0b/2aa20b2129a6b56fd02eb2d794a1a689.png",
          name: "Route 75-100",
          arrayPokemons: [42, 95, 108, 79, 126, 143]
        }
      ],
      pokemons: []
    };
  }

  componentDidMount = async () => {
    for (let i = 0; i < this.state.routeMaps.length; i++) {
      for (let j = 0; j < this.state.routeMaps[i].arrayPokemons.length; j++) {
        const id = this.state.routeMaps[i].arrayPokemons[j];
        const pokemons = await getPokemon(id);
        this.setState({ pokemons: [...this.state.pokemons, pokemons] });
      }
    }
  };

  forestPokemons = async a => {
  };

  render() {
    return (
      <div>
        <div>
          {console.log(this.state.pokemons)}
          {this.state.routeMaps.map(data => (
            <div>
              <img
                onClick={() => this.forestPokemons(data.arrayPokemons)}
                src={data.image}
              />
              <h5>{data.name}</h5>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(Forest);
