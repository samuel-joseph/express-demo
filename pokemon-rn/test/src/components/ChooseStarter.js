import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import {
  getPokemon,
  storePokemon,
  getMoves,
  addMoves
} from "../services/api_helper";

class ChooseStarter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ownPokemon: null,
      chosenPokemonId: null,
      starters: [],
      starterMoves: [],
      arrayMoveData: [],
      moveData1: {
        name: null,
        attack: null,
        isLearned: true
      },
      moveData2: {
        name: null,
        attack: null,
        isLearned: true
      },
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
    const starterMoves = [];
    const id = [1, 4, 7];
    for (let i = 0; i < 3; i++) {
      const resp = await getPokemon(id[i]);
      const resp1 = await getMoves(id[i]);
      starters.push(resp);
      starterMoves.push(resp1);
    }
    this.setState({ starters, starterMoves });
  };

  chosenPokemon = (pokemon, moves) => {
    const chosenPokemonId = pokemon.id;
    const starterMoves = [];

    this.setState({
      moveData1: {
        ...this.state.moveData,
        name: moves[0].name,
        attack: moves[0].attack
      }
    });
    this.setState({
      moveData2: {
        ...this.state.moveData,
        name: moves[1].name,
        attack: moves[1].attack
      }
    });
    this.setState({
      formData: {
        ...this.state.formData,
        name: pokemon.name,
        frontImage: pokemon.frontImage,
        backImage: pokemon.backImage,
        health: pokemon.health
      }
    });
    this.passMoves(moves);

    this.setState({
      isClicked: true,
      chosenPokemonId
    });
  };

  passMoves = moves => {
    this.setState({
      moveData1: {
        ...this.state.moveData1,
        name: moves[0].name,
        attack: moves[0].attack
      },
      moveData2: {
        ...this.state.moveData2,
        name: moves[1].name,
        attack: moves[1].attack
      }
    });
  };

  savePokemon = async () => {
    const pokemon = await storePokemon(this.state.formData);
    console.log(pokemon.data.id);
    const id = pokemon.data.id;
    const move1 = await addMoves(id, this.state.moveData1);
    const move2 = await addMoves(id, this.state.moveData2);
    this.props.history.push("/trainer");
  };

  render() {
    return (
      <div>
        {console.log(this.state.arrayMoveData)}
        {this.state.starters && (
          <div>
            {this.state.isClicked && (
              <div>
                <h4>{this.state.formData.name}</h4>
                <img className="pokemon" src={this.state.formData.frontImage} />
              </div>
            )}
            {this.state.starters.map((pokemon, index) => (
              <div key={index}>
                <img
                  className="pokeball"
                  onClick={() =>
                    this.chosenPokemon(pokemon, this.state.starterMoves[index])
                  }
                  src="https://pngimage.net/wp-content/uploads/2018/06/pokeball-pixel-png-8.png"
                />
              </div>
            ))}
            {this.state.isClicked && (
              <button onClick={() => this.savePokemon()}>OK</button>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ChooseStarter);
