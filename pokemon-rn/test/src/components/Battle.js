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
  removeMove,
  typeAdvantage,
  useAdvantage
} from "../services/api_helper";

import Level from "./Level";
import Pokecenter from "./Pokecenter";
import MaxHealthBar from "./maxHealthBar";

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
        health: null,
        current_health: null,
        type: null
      },
      postMove: [],
      arrayPostMoves: [],
      npcAttack: null,
      userPokemon: null,
      userPokemonAttacks: null,
      fighterPokemon: [],
      catch: false,
      change: false,
      formData: {
        current_health: null
      },
      win: false,
      npcTurn: false,
      userTurn: false,
      count: null,
      rip:
        "https://b7.pngbarn.com/png/250/103/headstone-grave-cemetery-rest-in-peace-grave-s-png-clip-art-thumbnail.png"
    };
  }

  componentDidMount = async () => {
    const npc = this.props.pokemonID;
    const userPokemon = await trainerPokemon();
    const fighterPokemon = userPokemon[0];
    const npcAttack = await getMoves(npc.id);
    const userPokemonAttacks = await getMoves(fighterPokemon.id);
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
    const current_health = npc.current_health;
    const type = npc.type;
    console.log(npc);

    this.setState({
      count: 3,
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
        current_health,
        level,
        total_experience,
        current_experience,
        fullyEvolved,
        type
      },
      formData: {
        current_health
      }
    });

    for (let i = 0; i < npcAttack.length; i++) {
      const postMoveCopy = {
        name: npcAttack[i].name,
        attack: npcAttack[i].attack,
        animation: npcAttack[i].animation,
        type: npcAttack[i].type
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
      animation: moves.animation,
      type: moves.type
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
    let name = this.state.fighterPokemon.name;
    let type = this.state.fighterPokemon.type;

    switch (this.props.rank) {
      case "low":
        current_experience = Math.floor(
          current_experience + (total_experience * 2) / level
        );
        break;
      case "medium":
        current_experience = Math.floor(
          current_experience + (total_experience * 3) / level
        );
        break;
      case "high":
        current_experience = Math.floor(
          current_experience + (total_experience * 3) / level
        );
        break;
    }

    if (level < 100) {
      while (current_experience >= total_experience) {
        level++;
        health += 2;
        current_experience = current_experience - total_experience;

        if ((level === 2 || level === 4) && fullyEvolved !== true) {
          num++;
          let getName = await getPokemon(num);
          name = getName.name;
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
        }
        // if (level === 4 && !fullyEvolved) {
        //   num++;
        //   let getName = await getPokemon(num);
        //   name = getName.name;
        //   frontImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png`;
        //   backImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon//back/${num}.png`;
        //   let resp = await getMoves(num);
        //   let del = await getMoves(id);
        //   for (let i = 0; i < del.length; i++) {
        //     await removeMove(id, del[i].id);
        //   }
        //   for (let i = 0; i < resp.length; i++) {
        //     this.newMoves(resp[i], id);
        //   }
        // }
      }
    }

    console.log(current_experience);
    const passData = {
      name,
      health,
      current_health: userHealth,
      level,
      current_experience,
      frontImage,
      backImage,
      type,
      fullyEvolved
    };
    const resp = await update(id, passData);
  };

  damageStep = (current, enemyType, level) => {
    let randomAttack = this.randomFunc(useAdvantage(current, enemyType));
    let damage =
      typeAdvantage(randomAttack.type, enemyType) *
      Math.floor(randomAttack.attack + randomAttack.attack * level * 0.01);

    const attack = {
      animation: randomAttack.animation,
      damage
    };
    return attack;
  };

  userAttack = (attacker, ms, receiver) => {
    console.log(this.state.fighterPokemon);
    let npc = this.state.npc;
    console.log(npc);
    let user = this.state.fighterPokemon;
    let userHealth = user.current_health;
    let userAnimation = null;
    let npcHealth = npc.current_health;
    let npcAnimation = null;
    let randomAttack = this.damageStep(ms, receiver.type, attacker.level);
    if (attacker === this.state.fighterPokemon) {
      userAnimation = randomAttack.animation;
      this.setState({ userAnimation, userTurn: true });
      setTimeout(
        function() {
          this.setState({ userAnimation: null, userTurn: false });
        }.bind(this),
        1000
      );
      npcHealth = npcHealth - randomAttack.damage;
      // console.log(npcHealth);
      // console.log(randomAttack.damage);
      if (npcHealth < 0 || npcHealth === 0) {
        this.setState({
          npc: { ...npc, current_health: 0 }
        });
        setTimeout(
          function() {
            this.setState({
              npc: { ...npc, current_health: npcHealth }
            });
            this.evolution();
          }.bind(this),
          650
        );
      }
      setTimeout(
        function() {
          this.setState({
            npc: { ...npc, current_health: npcHealth }
          });
        }.bind(this),
        650
      );
      return npcHealth;
    } else {
      npcAnimation = randomAttack.animation;
      this.setState({ npcAnimation, npcTurn: true });
      setTimeout(
        function() {
          this.setState({ npcAnimation: null, npcTurn: false });
        }.bind(this),
        1000
      );
      userHealth = userHealth - randomAttack.damage;

      if (userHealth < 0 || userHealth === 0) {
        // this.setState({
        //   user: { ...user, current_health: 0 }
        // });
        let index = null;
        const userPokemon = this.state.userPokemon;
        // userPokemon.splice(index, 1);
        const fighterPokemon = userPokemon.pop(0);
        const passData = {
          current_health: 0
        };
        if (this.state.userPokemon.length === 0) {
          this.props.saySomething(
            "YOU LOST... Go head to Pokecenter and heal those poor pokemons then try again"
          );
          // const resp = await update(user.id, passData);
        } else {
          for (let i = 0; i < this.state.userPokemon.length; i++) {
            if (this.state.userPokemon[i].id === user.id) {
              index = i;
            }
          }
        }
        this.setState({
          userPokemon,
          fighterPokemon,
          formData: { ...this.state.formData, current_health: userHealth },
          win: true
        });
        // return;
      }
      setTimeout(
        function() {
          this.setState({
            fighterPokemon: { ...user, current_health: userHealth }
          });
        }.bind(this),
        650
      );
    }
  };

  battleSequence = async () => {
    let formData = this.state.formData;
    let user = this.state.fighterPokemon;
    let npc = this.state.npc;
    let userMS = this.state.userPokemonAttacks;
    let npcMS = this.state.npcAttack;
    let levelUser = user.level;
    let levelNpc = npc.level;
    let typeUser = user.type;
    let typeNpc = npc.type;
    let id = user.id;
    let npcHealth = npc.current_health;
    let userHealth = user.current_health;

    console.log(npc);

    // this.userAttack(npc, npcMS, user);
    if (levelUser >= levelNpc) {
      npcHealth = this.userAttack(user, userMS, npc);
      if (npcHealth <= 0) {
        console.log("DEAD");
        return;
      } else console.log("TEST");
      setTimeout(
        function() {
          userHealth = this.userAttack(npc, npcMS, user);
        }.bind(this),
        1000
      );
    } else {
      this.userAttack(npc, npcMS, user);
      setTimeout(
        function() {
          this.userAttack(user, userMS, npc);
        }.bind(this),
        1000
      );
    }

    // let randomNpcAttack = this.randomFunc(
    //   useAdvantage(this.state.npcAttack, typeUser)
    // );

    // let npcAttack =
    //   typeAdvantage(randomNpcAttack.type, this.state.userPokemon.type) *
    //   Math.floor(
    //     randomNpcAttack.attack + randomNpcAttack.attack * levelNpc * 0.01
    //   );
    // console.log(npcAttack);
    // let npcAnimation = randomNpcAttack.animation;

    // let userHealth = user.current_health;

    // setTimeout(
    //   function() {
    //     this.setState({ npcAnimation, npcTurn: true });
    //   }.bind(this),
    //   1000
    // );
    // setTimeout(
    //   function() {
    //     this.setState({ npcAnimation: null, npcTurn: false });
    //   }.bind(this),
    //   2000
    // );

    // userHealth = userHealth - npcAttack;

    // if (formData.current_health !== userHealth) {
    //   this.setState({
    //     formData: {
    //       current_health: userHealth
    //     }
    //   });
    // }

    // if (npcHealth <= 0 && userHealth <= 0) {
    //   setTimeout(
    //     function() {
    //       this.setState({
    //         npc: { ...npc, current_health: 0 },
    //         fighterPokemon: { ...this.state.user, current_health: 0 },
    //         formData: { ...this.state.formData, current_health: userHealth }
    //       });
    //     }.bind(this),
    //     2000
    //   );
    // } else if (userHealth < 0 || userHealth === 0) {
    //   let index = null;
    //   const userPokemon = this.state.userPokemon;
    //   // userPokemon.splice(index, 1);
    //   const fighterPokemon = userPokemon.pop(0);
    //   const passData = {
    //     current_health: 0
    //   };
    //   if (this.state.userPokemon.length === 0) {
    //     this.props.saySomething(
    //       "YOU LOST... Go head to Pokecenter and heal those poor pokemons then try again"
    //     );
    //     const resp = await update(user.id, passData);
    //   } else {
    //     for (let i = 0; i < this.state.userPokemon.length; i++) {
    //       if (this.state.userPokemon[i].id === user.id) {
    //         index = i;
    //       }
    //     }
    //   }
    //   this.setState({
    //     userPokemon,
    //     fighterPokemon,
    //     formData: { ...this.state.formData, current_health: userHealth },
    //     win: true
    //   });
    // } else {
    const passData = {
      current_health: userHealth
    };
    //   setTimeout(
    //     function() {
    //       this.setState({
    //         fighterPokemon: {
    //           ...user,
    //           current_health: userHealth
    //         },
    //         formData: { ...this.state.formData, current_health: userHealth },
    //         npc: { ...npc, current_health: npcHealth }
    //       });
    //     }.bind(this),
    //     2500
    //   );
    const resp = await update(id, passData);
    // }
  };

  // battleSequence = async () => {
  //   let formData = this.state.formData;
  //   let levelUser = this.state.fighterPokemon.level;
  //   let levelNpc = this.state.npc.level;
  //   let typeUser = this.state.fighterPokemon.type;
  //   let typeNpc = this.state.npc.type;
  //   let id = this.state.fighterPokemon.id;
  //   let npcHealth = this.state.npc.current_health;
  //   let halfHp = this.state.npc.health / 2;

  //   let randomNpcAttack = this.randomFunc(
  //     useAdvantage(this.state.npcAttack, typeUser)
  //   );

  //   let x = typeAdvantage(typeUser, typeNpc);
  //   let npcAttack =
  //     typeAdvantage(randomNpcAttack.type, this.state.userPokemon.type) *
  //     Math.floor(
  //       randomNpcAttack.attack + randomNpcAttack.attack * levelNpc * 0.01
  //     );
  //   console.log(npcAttack);
  //   let npcAnimation = randomNpcAttack.animation;

  //   let userHealth = this.state.fighterPokemon.current_health;
  //   let randomUserAttack = this.randomFunc(
  //     useAdvantage(this.state.userPokemonAttacks, typeNpc)
  //   );
  //   let userAttack =
  //     typeAdvantage(randomUserAttack.type, this.state.npc.type) *
  //     Math.floor(
  //       randomUserAttack.attack + randomUserAttack.attack * levelUser * 0.01
  //     );
  //   console.log(userAttack);
  //   let userAnimation = randomUserAttack.animation;

  //   this.setState({ userAnimation, userTurn: true });
  //   setTimeout(
  //     function() {
  //       this.setState({ userAnimation: null, userTurn: false });
  //     }.bind(this),
  //     1000
  //   );
  //   setTimeout(
  //     function() {
  //       this.setState({ npcAnimation, npcTurn: true });
  //     }.bind(this),
  //     1000
  //   );
  //   setTimeout(
  //     function() {
  //       this.setState({ npcAnimation: null, npcTurn: false });
  //     }.bind(this),
  //     2000
  //   );

  //   npcHealth = npcHealth - userAttack;
  //   userHealth = userHealth - npcAttack;

  //   if (formData.current_health !== userHealth) {
  //     this.setState({
  //       formData: {
  //         current_health: userHealth
  //       }
  //     });
  //   }

  //   if (npcHealth <= 0 && userHealth <= 0) {
  //     setTimeout(
  //       function() {
  //         this.setState({
  //           npc: { ...this.state.npc, current_health: 0 },
  //           fighterPokemon: { ...this.state.user, current_health: 0 },
  //           formData: { ...this.state.formData, current_health: userHealth }
  //         });
  //       }.bind(this),
  //       2000
  //     );
  //   } else if (npcHealth < 0 || npcHealth === 0) {
  //     const passData = {
  //       current_health: userHealth
  //     };
  //     this.setState({
  //       npc: { ...this.state.npc, current_health: 0 },
  //       formData: { ...this.state.formData, current_health: userHealth }
  //     });

  //     const resp = await update(id, passData);
  //     this.evolution();
  //   } else if (userHealth < 0 || userHealth === 0) {
  //     let index = null;
  //     const userPokemon = this.state.userPokemon;
  //     // userPokemon.splice(index, 1);
  //     const fighterPokemon = userPokemon.pop(0);
  //     const passData = {
  //       current_health: 0
  //     };
  //     if (this.state.userPokemon.length === 0) {
  //       this.props.saySomething(
  //         "YOU LOST... Go head to Pokecenter and heal those poor pokemons then try again"
  //       );
  //       const resp = await update(this.state.fighterPokemon.id, passData);
  //     } else {
  //       for (let i = 0; i < this.state.userPokemon.length; i++) {
  //         if (this.state.userPokemon[i].id === this.state.fighterPokemon.id) {
  //           index = i;
  //         }
  //       }
  //     }
  //     this.setState({
  //       userPokemon,
  //       fighterPokemon,
  //       formData: { ...this.state.formData, current_health: userHealth },
  //       win: true
  //     });
  //   } else {
  //     const passData = {
  //       current_health: userHealth
  //     };
  //     setTimeout(
  //       function() {
  //         this.setState({
  //           fighterPokemon: {
  //             ...this.state.fighterPokemon,
  //             current_health: userHealth
  //           },
  //           formData: { ...this.state.formData, current_health: userHealth },
  //           npc: { ...this.state.npc, current_health: npcHealth }
  //         });
  //       }.bind(this),
  //       2500
  //     );
  //     const resp = await update(id, passData);
  //   }
  // };

  setToTrue = () => {
    this.setState({ catch: true });
  };

  storePokemon = async () => {
    const postData = this.state.postData;
    const postMove = this.state.postMove;
    console.log(postData);
    const resp = await storePokemon(postData);
    for (let i = 0; i < postMove.length; i++) {
      const resp1 = await addMoves(resp.data.id, postMove[i]);
    }
  };

  readyCatch = async () => {
    let count = this.state.count;
    count--;
    this.setState({ catch: true, count });
    const hp = this.state.npc.current_health;
    const totalHp = this.state.fighterPokemon.health;
    const chance = totalHp * 0.12;
    const dice = 10;
    // Math.floor(Math.random() * Math.floor(hp));

    setTimeout(
      function() {
        if (dice <= chance) {
          this.storePokemon();
        } else {
          this.setState({ catch: false });
        }
      }.bind(this),
      2000
    );
  };

  change = async pokemon => {
    const fighterPokemonID = this.state.fighterPokemon.id;
    const formData = this.state.formData;
    const id = pokemon.id;
    let randomNpcAttack = this.randomFunc(this.state.npcAttack);
    let npcAttack = randomNpcAttack.attack;
    let npcAnimation = randomNpcAttack.animation;
    setTimeout(
      function() {
        this.setState({ npcAnimation, npcTurn: true });
      }.bind(this),
      1000
    );
    setTimeout(
      function() {
        this.setState({ npcAnimation: null, npcTurn: false });
      }.bind(this),
      2000
    );

    const changedPokemon = await getPokemon(id);
    let userHealth = changedPokemon.current_health;
    userHealth = userHealth - npcAttack;
    const passData = {
      current_health: userHealth
    };
    const resp = await update(id, passData);
    const fighterPokemon = await getPokemon(id);

    const resp1 = await update(fighterPokemonID, formData);

    const userPokemonAttacks = await getMoves(id);
    console.log(userPokemonAttacks);
    setTimeout(
      function() {
        this.setState({
          fighterPokemon,
          userPokemonAttacks,
          formData: {
            current_health: userHealth
          }
        });
      }.bind(this),
      400
    );
  };

  render() {
    return (
      <div>
        {this.state.userPokemon && (
          <div>
            <div className="forestBat">
              <div className="npc">
                <div>
                  {this.state.userAnimation && (
                    <img className="userFX" src={this.state.userAnimation} />
                  )}

                  <div>
                    <div className="npcA">
                      <div className="npcB">
                        <span>{this.state.npc.name}</span>
                        <div className="hpBar">
                          <MaxHealthBar
                            percentage={this.state.npc.current_health}
                          />
                        </div>
                      </div>
                      <div>
                        {this.state.npc.current_health > 0 ? (
                          <img
                            className={
                              this.state.npcTurn ? "npcMove" : "npcPokemon"
                            }
                            src={
                              this.state.catch
                                ? "https://i.ya-webdesign.com/images/pokeball-pixel-png-2.png"
                                : this.state.npc.frontImage
                            }
                          />
                        ) : (
                          <img
                            className="npcPokemonFade"
                            src={this.state.npc.frontImage}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {this.state.npc.current_health > 0 &&
                this.state.fighterPokemon.current_health > 0 && (
                  <button onClick={() => this.battleSequence()}>FIGHT</button>
                )}
              <div>
                <div className="userA">
                  <div>
                    {this.state.npcAnimation && (
                      <img className="npcFX" src={this.state.npcAnimation} />
                    )}

                    {!this.state.fighterPokemon.current_health <= 0 ? (
                      <img
                        className={
                          this.state.userTurn ? "userMove" : "userPokemon"
                        }
                        src={
                          this.state.fighterPokemon.backImage
                            ? this.state.fighterPokemon.backImage
                            : this.state.rip
                        }
                      />
                    ) : (
                      <img
                        className="userPokemonFade"
                        src={this.state.fighterPokemon.backImage}
                      />
                    )}
                  </div>
                  <div className="userB">
                    <span>
                      LV{this.state.fighterPokemon.level}
                      {this.state.fighterPokemon.name}
                    </span>
                    <div className="hpBar">
                      <MaxHealthBar
                        percentage={this.state.fighterPokemon.current_health}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <>
              {this.state.userPokemon && (
                <div className="sparePokemons">
                  {this.state.count !== 0 && (
                    <span>
                      {this.state.userPokemon.length <= 6 && (
                        <>
                          <img
                            className="imagePoke1"
                            onClick={() => this.readyCatch()}
                            src="https://i.ya-webdesign.com/images/pokeball-pixel-png-2.png"
                          />
                          x{this.state.count}
                        </>
                      )}
                    </span>
                  )}
                  {this.state.userPokemon.map((data, index) => (
                    <div key={index}>
                      <img
                        onClick={() => this.change(data)}
                        src={this.state.userPokemon[index].frontImage}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Battle);
