import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";

import {
  trainerPokemon,
  getMoves,
  update,
  storePokemon,
  addMoves,
  ownedPokemon,
  getPokemon
} from "../services/api_helper";

import Level from "./Level";
import Pokecenter from "./Pokecenter";

class Battle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      npc: [],
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
    const name = npc.name;
    const frontImage = npc.frontImage;
    const backImage = npc.backImage;
    const health = npc.health;
    const moveName = npcAttack.name;
    const moveAttack = npcAttack.attack;
    const current_health = fighterPokemon.current_health;

    console.log(userPokemon);

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
        health
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

  battleSequence = async () => {
    let index = null;
    for (let i = 0; i < this.state.userPokemon.length; i++) {
      if (this.state.userPokemon[i].id === this.state.fighterPokemon.id) {
        index = i;
      }
    }
    console.log(index);
    let formData = this.state.formData;
    let id = this.state.fighterPokemon.id;
    let npcHealth = this.state.npc.current_health;
    let halfHp = this.state.npc.health / 2;
    let randomNpcAttack = this.randomFunc(this.state.npcAttack);
    let npcAttack = randomNpcAttack.attack;

    let userHealth = this.state.fighterPokemon.current_health;
    let randomUserAttack = this.randomFunc(this.state.userPokemonAttacks);
    let userAttack = randomUserAttack.attack;

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
      let total_experience = this.state.fighterPokemon.total_experience;
      let current_experience = this.state.fighterPokemon.current_experience;
      let level = this.state.fighterPokemon.level;
      current_experience = current_experience + total_experience / level;

      if (current_experience >= total_experience) {
        level++;
        current_experience = 0;
      }
      const passData = {
        current_health: userHealth,
        level,
        current_experience
      };

      this.setState({
        npc: { ...this.state.npc, current_health: 0 },
        formData: { ...this.state.formData, current_health: userHealth }
      });

      const resp = await update(id, passData);
      this.props.history.push("/pokecenter");
    } else if (userHealth < 0 || userHealth === 0) {
      const passData = {
        current_health: 0
      };
      const userPokemon = this.state.userPokemon;
      userPokemon.splice(index, 1);
      const fighterPokemon = userPokemon[0];
      this.setState({
        userPokemon,
        fighterPokemon,
        formData: { ...this.state.formData, current_health: 0 },
        win: true
      });
      const resp = await update(id, passData);
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
                {this.state.catch ? (
                  <img src="https://pngimage.net/wp-content/uploads/2018/06/pokeball-pixel-png-8.png" />
                ) : (
                  <img src={this.state.npc.frontImage} />
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
              <img src={this.state.fighterPokemon.backImage} />
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
