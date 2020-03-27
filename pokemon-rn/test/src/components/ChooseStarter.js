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
        health: null,
        current_health: null,
        level: 1,
        total_experience: 300,
        current_experience: 0,
        fullyEvolved: null
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
    this.props.saySomething("Choose a starter pokemon");
    this.setState({ starters, starterMoves });
  };

  chosenPokemon = (pokemon, moves) => {
    const chosenPokemonId = pokemon.id;
    const starterMoves = [];

    this.setState({
      moveData1: {
        ...this.state.moveData,
        name: moves[0].name,
        attack: moves[0].attack,
        animation: moves[0].animation
      }
    });
    this.setState({
      moveData2: {
        ...this.state.moveData,
        name: moves[1].name,
        attack: moves[1].attack,
        animation: moves[1].animation
      }
    });
    this.setState({
      formData: {
        ...this.state.formData,
        name: pokemon.name,
        frontImage: pokemon.frontImage,
        backImage: pokemon.backImage,
        health: pokemon.health,
        current_health: pokemon.current_health
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
        attack: moves[0].attack,
        animation: moves[0].animation
      },
      moveData2: {
        ...this.state.moveData2,
        name: moves[1].name,
        attack: moves[1].attack,
        animation: moves[1].animation
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
      <div className="choose">
        {this.state.starters && (
          <div>
            {this.state.isClicked && (
              <div>
                <img className="pokemon" src={this.state.formData.frontImage} />
                <p>{this.state.formData.name}</p>
              </div>
            )}
            <div className="setPokeball">
              {this.state.starters.map((pokemon, index) => (
                <div key={index}>
                  <img
                    className="pokeball"
                    onClick={() =>
                      this.chosenPokemon(
                        pokemon,
                        this.state.starterMoves[index]
                      )
                    }
                    src="https://purepng.com/public/uploads/medium/purepng.com-pokeballpokeballdevicepokemon-ballpokemon-capture-ball-1701527825795vtfp2.png"
                  />
                </div>
              ))}
            </div>
            {this.state.isClicked && (
              <button className="register" onClick={() => this.savePokemon()}>
                CONFIRM
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ChooseStarter);
