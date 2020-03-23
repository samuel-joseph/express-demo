import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";

import {
  trainerPokemon,
  getMoves,
  update,
  storePokemon,
  addMoves
} from "../services/api_helper";
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
      // postMove: [],
      postMove: [
        {
          name: null,
          attack: null,
          isLearned: true
        },
        {
          name: null,
          attack: null,
          isLearned: true
        },
        {
          name: null,
          attack: null,
          isLearned: true
        },
        {
          name: null,
          attack: null,
          isLearned: true
        }
      ],
      arrayPostMoves: [],
      npcAttack: null,
      userPokemon: null,
      userPokemonAttacks: null,
      fighterPokemon: [],
      catch: false,
      formData: {
        current_health: null
      }
    };
  }

  componentDidMount = async () => {
    const npc = this.props.pokemonID;
    const userPokemon = await trainerPokemon();
    const fighterPokemon = userPokemon.pop();
    const npcAttack = await getMoves(npc.id);
    const userPokemonAttacks = await getMoves(fighterPokemon.id);
    const name = npc.name;
    const frontImage = npc.frontImage;
    const backImage = npc.backImage;
    const health = npc.health;
    const moveName = npcAttack.name;
    const moveAttack = npcAttack.attack;
    console.log(npcAttack.length);

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
      }
    });

    for (let i = 0; i < 2; i++) {
      // let postMoveCopy = JSON.parse(JSON.stringify(this.state.postMove));
      // console.log(postMoveCopy);
      const postMoveCopy = {
        name: this.state.npcAttack[i].name,
        attack: this.state.npcAttack[i].attack,
        isLearned: this.state.npcAttack[i].isLearned
      };
      // postMoveCopy.name = this.state.npcAttack[i].name;
      // postMoveCopy.attack = this.state.npcAttack[i].attack;
      // postMoveCopy.isLearned = this.state.npcAttack[i].isLearned;
      console.log(postMoveCopy);
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
    console.log(this.state.postMove);
    // if (this.state.arrayPostMoves.length === 0) {
    //   // for (let i = 0; i<)
    //   // this.setState({});
    //   // console.log(this,)
    // }
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

    if (npcHealth <= halfHp) {
      this.setToTrue();
    }
    if (npcHealth <= 0 && userHealth <= 0) {
      this.setState({
        npc: { ...this.state.npc, current_health: 0 },
        fighterPokemon: { ...this.state.user, current_health: 0 },
        formData: { ...this.state.formData, current_health: userHealth }
      });

      const formData = this.state.formData;
      const updateHp = await update(id, formData);
      this.props.history.push("/pokecenter");
    } else if (npcHealth < 0 || npcHealth === 0) {
      this.setState({
        npc: { ...this.state.npc, current_health: 0 },
        formData: { ...this.state.formData, current_health: userHealth }
      });

      const formData = this.state.formData;
      const updateHp = await update(id, formData);
      this.props.history.push("/pokecenter");
    } else if (userHealth < 0 || userHealth === 0) {
      this.setState({
        fighterPokemon: {
          ...this.state.fighterPokemon,
          current_health: 0,
          formData: { ...this.state.formData, current_health: userHealth }
        }
      });

      const formData = this.state.formData;
      const updateHp = await update(id, formData);
    } else {
      this.setState({
        fighterPokemon: {
          ...this.state.fighterPokemon,
          current_health: userHealth
        },
        formData: { ...this.state.formData, current_health: userHealth },
        npc: { ...this.state.npc, current_health: npcHealth }
      });
      const formData = this.state.formData;
      const updateHp = await update(id, formData);
    }

    //   this.burry(id);
    //   this.props.history.push("/newuser");
    // } else if (npcHealth < 0 || npcHealth === 0) {
    //   this.props.display(
    //     `${user} pokemon use ${randomUserAttack.name} with ${randomUserAttack.power} damage! ${this.state.npc.name} fainted...\n${this.state.user.name} win!`
    //   );
    //   setTimeout(
    //     function() {
    //       this.setState({
    //         animate: false,
    //         animate1: false,
    //         attack: false,
    //         attack1: false
    //       });
    //     }.bind(this),
    //     1000
    //   );

    // let resp = await update(id, current_health);
    //   npcHealth = 0;
    // this.setState({
    //   fighterPokemon
    // });
    // } else if (userHealth < 0 || userHealth === 0) {
    //   this.props.display(
    //     `Rival pokemon use ${randomNpcAttack.name} with ${randomNpcAttack.power} damage! ${this.state.user.name} fainted...\n${this.state.npc.name} win!`
    //   );
    //   setTimeout(
    //     function() {
    //       this.setState({
    //         animate: false,
    //         animate1: false,
    //         attack: false,
    //         attack1: false
    //       });
    //     }.bind(this),
    //     1000
    //   );
    //   this.setState({
    //     npc: { ...this.state.npc, current_health: npcHealth },
    //     user: { ...this.state.user, current_health: 0 },
    //     fainted: true
    //   });
    //   this.burry(id);
    //   this.props.history.push("/newuser");
    // } else {
    //   this.setState(prevState => ({
    //     npc: { ...prevState.npc, current_health: npcHealth },
    //     user: { ...prevState.user, current_health: userHealth },
    //     formDataHp: {
    //       ...prevState.formDataHp,
    //       current_health: userHealth
    //     }
    //   }));
    //   let resp = await update(id, current_health);
    // }

    // setTimeout(
    //   function() {
    //     this.setState({
    //       animate: false,
    //       animate1: false,
    //       attack: false,
    //       attack1: false
    //     });
    //   }.bind(this),
    //   1500
    // );
  };

  setToTrue = () => {
    this.setState({ catch: true });
  };

  readyCatch = async () => {
    const postData = this.state.postData;
    const postMove = this.state.postMove;
    const id = this.state.npc.id;
    const hp = this.state.npc.current_health;
    const totalHp = this.state.fighterPokemon.health;
    const chance = totalHp * 0.15;
    const dice = Math.floor(Math.random() * Math.floor(hp));
    console.log(dice);

    if (dice <= chance) {
      console.log(postMove);
      const resp = await storePokemon(postData);
      for (let i = 0; i < postMove.length; i++) {
        const resp1 = await addMoves(id, postMove[i]);
      }
      this.props.history.push("/start");
    }
  };

  render() {
    return (
      <div>
        {this.state.fighterPokemon.current_health <= 0 ? (
          <Pokecenter />
        ) : (
          <div>
            <div>
              <div>
                <div>
                  <img src={this.state.npc.frontImage} />
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
            </div>
            <button onClick={() => this.battleSequence()}>FIGHT</button>
            <div>
              <div>
                <div>
                  <img src={this.state.fighterPokemon.backImage} />
                </div>
                <div>
                  <p>{this.state.fighterPokemon.name}</p>
                  <p>
                    {this.state.fighterPokemon.current_health}/
                    {this.state.fighterPokemon.health}
                  </p>
                </div>
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
        {this.state.catch && (
          <img
            onClick={() => this.readyCatch()}
            src="https://pngimage.net/wp-content/uploads/2018/06/pokeball-pixel-png-8.png"
          />
        )}
      </div>
    );
  }
}

export default withRouter(Battle);
