import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  trainerPokemon,
  getMoves,
  update,
  getPokemon,
  removeMove,
  addMoves
} from "../services/api_helper";

class Evolution extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: null,
      prevPokemon: null,
      isClick: false,
      moves: null,
      movesLoad: false,
      testMoves: null,
      testMovesF: null
    };
  }

  componentDidMount = async () => {
    let prevPokemon = this.props.pokemon;
    this.props.saySomething(`Your ${prevPokemon.name} is about to evolve!!!`);
    let num = prevPokemon.frontImage.match(/\d+/g).map(Number);
    let id = prevPokemon.id;

    num++;
    let evolvePokemon = await getPokemon(num);
    let type = evolvePokemon.type;
    let name = evolvePokemon.name;
    let health = evolvePokemon.health;
    let current_health = evolvePokemon.current_health;
    let frontImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png`;
    let backImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon//back/${num}.png`;
    let fullyEvolved = evolvePokemon.fullyEvolved;
    let resp = await getMoves(num);
    let del = await getMoves(id);
    let testMoves = [];
    for (let i = 0; i < del.length; i++) {
      await removeMove(id, del[i].id);
    }
    for (let i = 0; i < resp.length; i++) {
      testMoves.push(resp[i]);
      this.newMoves(resp[i], id);
    }
    console.log(testMoves);

    const passData = {
      name,
      health,
      current_health,
      current_experience: 0,
      fullyEvolved,
      frontImage,
      backImage,
      type
    };
    const resp1 = await update(id, passData);
    let pokemon = await getPokemon(id);
    this.setState({ pokemon, prevPokemon, testMoves });
  };

  newMoves = async (moves, id) => {
    let postMoveCopy = {
      name: moves.name,
      attack: moves.attack,
      animation: moves.animation,
      type: moves.type
    };

    let resp = await addMoves(id, postMoveCopy);
    let resp2 = await getMoves(id);
    this.setState({ moves: resp2 });
  };

  evolve = () => {
    let id = this.props.pokemon;
    this.setState({ isClick: true });
    // let moves = await getMoves(id);
    setTimeout(
      function() {
        if (this.state.moves.length > 4) {
          this.props.saySomething(
            `CONGRATULATIONS! Your ${
              this.state.prevPokemon.name
            } evolved into ${this.state.pokemon.name}! However, ${
              this.state.pokemon.name
            } have more than 4 moves, delete ${this.state.moves.length -
              4} to continue!`
          );
        } else {
          this.props.saySomething(
            `CONGRATULATIONS! Your ${this.state.prevPokemon.name} evolved into ${this.state.pokemon.name}!`
          );
        }
        this.setState({ movesLoad: true });
      }.bind(this),
      5000
    );
  };

  delete = async (index, move) => {
    console.log(move);
    let id = this.props.pokemon.id;
    let moves = this.state.moves;
    moves.splice(index, 1);
    if (this.state.moves.length > 4) {
      this.props.saySomething(
        `${move.name} is removed from ${
          this.state.pokemon.name
        }. ${moves.length - 4} more!`
      );
    } else {
      this.props.saySomething(
        `Thank you Trainer ${localStorage.getItem("name")}!`
      );
    }

    this.setState({ moves });
    const resp = await removeMove(id, move.id);
  };

  render() {
    return (
      <div>
        {this.state.pokemon && (
          <div className="evolveContainer">
            {/* {this.state.testMoves && <>{console.log(this.state.testMoves)}</>} */}
            {this.state.isClick && (
              <img className="evolved" src={this.state.pokemon.frontImage} />
            )}
            {console.log(this.state.moves)}
            <img
              className={this.state.isClick ? "faded" : "prevPokemon"}
              src={this.state.prevPokemon.frontImage}
            />
            {!this.state.isClick && (
              <button onClick={() => this.evolve()}>PROCEED</button>
            )}
            <div className={this.state.movesLoad ? "evolveMoves" : ""}>
              {this.state.movesLoad &&
                this.state.moves.map((move, index) => (
                  <div key={index} className="evolveMovesA">
                    <div>{move.name}</div>
                    <div>{move.attack}</div>
                    {this.state.moves.length > 4 && (
                      <button
                        className="deleteMove"
                        onClick={e => this.delete(index, move)}
                      >
                        DEL
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Evolution;
