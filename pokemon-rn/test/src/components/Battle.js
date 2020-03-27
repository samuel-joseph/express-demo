import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";

import {
  trainerPokemon,
  getMoves,
  update,
  storePokemon,
  addMoves,
  ownedPokemon,
  getPokemon,
  removeMove
} from "../services/api_helper";

import Level from "./Level";
import Pokecenter from "./Pokecenter";

class Battle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      npc: [],
      npcAnimation: null,
      userAnimation: null,
      postData: {
        name: null,
        frontImage: null,
        backImage: null,
        health: null
      },
      postMove: [],
      arrayPostMoves: [],
      npcAttack: null,
      userPokemon: null,
      userPokemonAttacks: null,
      fighterPokemon: [],
      catch: false,
      formData: {
        current_health: null
      },
      win: false
    };
  }

  componentDidMount = async () => {
    const npc = this.props.pokemonID;
    const userPokemon = await trainerPokemon();
    const fighterPokemon = userPokemon[0];
    const npcAttack = await getMoves(npc.id);
    const userPokemonAttacks = await getMoves(fighterPokemon.id);
    console.log(userPokemonAttacks);
    const name = npc.name;
    const current_experience = npc.current_experience;
    const total_experience = npc.total_experience;
    const level = npc.level;
    const frontImage = npc.frontImage;
    const backImage = npc.backImage;
    const health = npc.health;
    const fullyEvolved = npc.fullyEvolved;
    const moveName = npcAttack.name;
    const moveAttack = npcAttack.attack;
    const current_health = fighterPokemon.current_health;

    this.setState({
      npc,
      userPokemon,
      fighterPokemon,
      npcAttack,
      userPokemonAttacks,
      postData: {
        name,
        frontImage,
        backImage,
        health,
        level,
        total_experience,
        current_experience,
        fullyEvolved
      },
      formData: {
        current_health
      }
    });

    for (let i = 0; i < npcAttack.length; i++) {
      const postMoveCopy = {
        name: npcAttack[i].name,
        attack: npcAttack[i].attack,
        isLearned: npcAttack[i].isLearned
      };
      this.setState(prevState => ({
        postMove: [postMoveCopy, ...prevState.postMove]
      }));
    }
  };

  randomFunc(random) {
    let response = random[Math.floor(Math.random() * random.length)];
    return response;
  }

  newMoves = async (moves, id) => {
    console.log(moves);
    let postMoveCopy = {
      name: moves.name,
      attack: moves.attack,
      isLearned: moves.isLearned
    };

    let resp = await addMoves(id, postMoveCopy);

    console.log(postMoveCopy);
  };

  evolution = async () => {
    let userHealth = this.state.fighterPokemon.current_health;
    let fullyEvolved = this.state.fighterPokemon.fullyEvolved;
    let id = this.state.fighterPokemon.id;
    let total_experience = this.state.fighterPokemon.total_experience;
    let current_experience = this.state.fighterPokemon.current_experience;
    let level = this.state.fighterPokemon.level;
    let health = this.state.fighterPokemon.health;
    let frontImage = this.state.fighterPokemon.frontImage;
    let backImage = this.state.fighterPokemon.backImage;
    let num = frontImage.match(/\d+/g).map(Number);

    current_experience = current_experience + (total_experience * 1.5) / level;
    current_experience = current_experience + 300;

    if (level < 100) {
      if (current_experience >= total_experience) {
        level++;
        health += 2;
        current_experience = 0;
        if (level === 2 && fullyEvolved === false) {
          num++;
          frontImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png`;
          backImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon//back/${num}.png`;
          let resp = await getMoves(num);
          let del = await getMoves(id);
          for (let i = 0; i < del.length; i++) {
            await removeMove(id, del[i].id);
          }
          for (let i = 0; i < resp.length; i++) {
            this.newMoves(resp[i], id);
          }
        } else if (level === 30 && fullyEvolved === false) {
          num++;
          frontImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png`;
          backImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon//back/${num}.png`;
          fullyEvolved = true;
          let resp = await getMoves(num);
          let del = await getMoves(id);
          for (let i = 0; i < del.length; i++) {
            await removeMove(id, del[i].id);
          }
          for (let i = 0; i < resp.length; i++) {
            this.newMoves(resp[i], id);
          }
        }
      }
    }
    const passData = {
      health,
      current_health: userHealth,
      level,
      current_experience,
      frontImage,
      backImage
    };
    const resp = await update(id, passData);
  };

  battleSequence = async () => {
    let index = null;
    for (let i = 0; i < this.state.userPokemon.length; i++) {
      if (this.state.userPokemon[i].id === this.state.fighterPokemon.id) {
        index = i;
      }
    }
    let formData = this.state.formData;
    let id = this.state.fighterPokemon.id;
    let npcHealth = this.state.npc.current_health;
    let halfHp = this.state.npc.health / 2;
    let randomNpcAttack = this.randomFunc(this.state.npcAttack);
    let npcAttack = randomNpcAttack.attack;
    let npcAnimation = randomNpcAttack.animation;

    let userHealth = this.state.fighterPokemon.current_health;
    let randomUserAttack = this.randomFunc(this.state.userPokemonAttacks);
    let userAttack = randomUserAttack.attack;
    let userAnimation = randomUserAttack.animation;

    this.setState({ npcAnimation });
    setTimeout(
      function() {
        this.setState({ npcAnimation: null });
      }.bind(this),
      1000
    );
    setTimeout(
      function() {
        this.setState({ userAnimation });
      }.bind(this),
      1000
    );
    setTimeout(
      function() {
        this.setState({ userAnimation: null });
      }.bind(this),
      2000
    );

    npcHealth = npcHealth - userAttack;
    userHealth = userHealth - npcAttack;

    if (formData.current_health !== userHealth) {
      this.setState({
        formData: {
          current_health: userHealth
        }
      });
    }

    if (npcHealth <= 0 && userHealth <= 0) {
      const passData = {
        current_health: 0
      };
      this.setState({
        npc: { ...this.state.npc, current_health: 0 },
        fighterPokemon: { ...this.state.user, current_health: 0 },
        formData: { ...this.state.formData, current_health: userHealth }
      });

      const resp = await update(id, passData);
      this.props.history.push("/pokecenter");
    } else if (npcHealth < 0 || npcHealth === 0) {
      const passData = {
        current_health: userHealth
      };
      this.setState({
        npc: { ...this.state.npc, current_health: 0 },
        formData: { ...this.state.formData, current_health: userHealth }
      });

      const resp = await update(id, passData);
      this.evolution();
      this.props.history.push("/pokecenter");
    } else if (userHealth < 0 || userHealth === 0) {
      const userPokemon = this.state.userPokemon;
      userPokemon.splice(index, 1);
      const fighterPokemon = userPokemon[0];
      this.setState({
        userPokemon,
        fighterPokemon,
        formData: { ...this.state.formData, current_health: 0 },
        win: true
      });
      this.props.history.push("/start");
    } else {
      this.setState({
        fighterPokemon: {
          ...this.state.fighterPokemon,
          current_health: userHealth
        },
        formData: { ...this.state.formData, current_health: userHealth },
        npc: { ...this.state.npc, current_health: npcHealth }
      });
    }
  };

  setToTrue = () => {
    this.setState({ catch: true });
  };

  storePokemon = async () => {
    const postData = this.state.postData;
    const postMove = this.state.postMove;
    const resp = await storePokemon(postData);
    for (let i = 0; i < postMove.length; i++) {
      const resp1 = await addMoves(resp.data.id, postMove[i]);
    }
  };

  readyCatch = async () => {
    this.setState({ catch: true });
    const hp = this.state.npc.current_health;
    const totalHp = this.state.fighterPokemon.health;
    const chance = totalHp * 0.12;
    const dice = Math.floor(Math.random() * Math.floor(hp));

    setTimeout(
      function() {
        if (dice <= chance) {
          this.storePokemon();
          this.props.history.push("/start");
        } else {
          this.setState({ catch: false });
        }
      }.bind(this),
      2000
    );
  };

  change = async pokemon => {
    console.log(this.state.formData);
    const fighterPokemonID = this.state.fighterPokemon.id;
    const formData = this.state.formData;
    const id = pokemon.id;
    const userPokemonAttacks = await getMoves(id);
    const fighterPokemon = await getPokemon(id);
    const resp = await update(fighterPokemonID, formData);
    console.log(fighterPokemon.current_health);

    this.setState({
      fighterPokemon,
      userPokemonAttacks,
      formData: {
        current_health: fighterPokemon.current_health
      }
    });
  };

  render() {
    return (
      <div>
        {this.state.fighterPokemon.current_health <= 0 ? (
          <Pokecenter win={this.state.win} />
        ) : (
          <div>
            <div>
              <div>
                {this.state.userAnimation && (
                  <img src={this.state.userAnimation} />
                )}

                {this.state.catch ? (
                  <img src="https://pngimage.net/wp-content/uploads/2018/06/pokeball-pixel-png-8.png" />
                ) : (
                  <img className="pokemon" src={this.state.npc.frontImage} />
                )}
              </div>
              <div>
                <p>{this.state.npc.name}</p>
                <p>
                  {this.state.npc.current_health}/{this.state.npc.health}
                </p>
              </div>
              <div>
                {this.state.npcAttack && (
                  <>
                    {this.state.npcAttack.map(data => (
                      <div>
                        {data.name}
                        {data.attack}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
            <button onClick={() => this.battleSequence()}>FIGHT</button>
            <div>
              {this.state.npcAnimation && <img src={this.state.npcAnimation} />}
              <img
                className="pokemon"
                src={this.state.fighterPokemon.backImage}
              />
              <div>
                <p>{this.state.fighterPokemon.name}</p>
                <p>
                  {this.state.fighterPokemon.current_health}/
                  {this.state.fighterPokemon.health}
                </p>
              </div>
            </div>
            <div>
              {this.state.userPokemonAttacks && (
                <>
                  {this.state.userPokemonAttacks.map(data => (
                    <div>
                      {data.name}:{data.attack}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
        {this.state.userPokemon && (
          <>
            {this.state.userPokemon.length <= 6 && (
              <img
                onClick={() => this.readyCatch()}
                src="https://pngimage.net/wp-content/uploads/2018/06/pokeball-pixel-png-8.png"
              />
            )}
          </>
        )}
        <div>
          {this.state.userPokemon && (
            <>
              {this.state.userPokemon.map((data, index) => (
                <div key={index}>
                  <img
                    onClick={() => this.change(data)}
                    src="https://pngimage.net/wp-content/uploads/2018/06/pokeball-pixel-png-8.png"
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Battle);
