import React, { Component } from "react";
import {
  getPokemon,
  trainerPokemon,
  getMoves,
  update,
  addMoves,
  removeMove
} from "../services/api_helper";

import MaxHealthBar from "./maxHealthBar";

class League extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      userPokemon: null,
      userMoves: null,
      npc: null,
      npcPokemon: null,
      npcMoves: null,
      userAnimation: null,
      npcAnimation: null,
      userTurn: false,
      npcTurn: false,
      isStart: false,
      rip:
        "https://b7.pngbarn.com/png/250/103/headstone-grave-cemetery-rest-in-peace-grave-s-png-clip-art-thumbnail.png",
      formData: {
        current_health: null
      },
      gymLeader: [
        {
          name: "Brock",
          array: [74, 95],
          pokemon: []
        },
        {
          name: "Misty",
          array: [120, 121],
          pokemon: []
        },
        {
          name: "Lt. Surge",
          array: [100, 25, 26],
          pokemon: []
        },
        {
          name: "Erika",
          array: [114, 70, 71],
          pokemon: []
        },
        {
          name: "Koga",
          array: [109, 89, 109, 110],
          pokemon: []
        },
        {
          name: "Sabrina",
          array: [64, 122, 49, 65],
          pokemon: []
        },
        {
          name: "Blaine",
          array: [38, 78, 59, 126],
          pokemon: []
        },
        {
          name: "Giovanni",
          array: [53, 111, 112, 115, 31],
          pokemon: []
        }
      ],
      eliteFour: [
        { name: "Lorelei", array: [87, 124, 91, 80, 131], pokemon: [] },
        { name: "Bruno", array: [95, 106, 95, 107, 68], pokemon: [] },
        { name: "Agatha", array: [93, 42, 93, 24, 94], pokemon: [] },
        { name: "Lance", array: [130, 148, 142, 148, 149], pokemon: [] }
      ]
    };
  }

  componentDidMount = async () => {
    const gymLeader = this.state.gymLeader;
    const eliteFour = this.state.eliteFour;
    let gymLeaderCopy = JSON.parse(JSON.stringify(gymLeader));
    let eliteFourCopy = JSON.parse(JSON.stringify(eliteFour));

    for (let i = 0; i < gymLeader.length; i++) {
      for (let j = 0; j < gymLeader[i].array.length; j++) {
        const id = gymLeader[i].array[j];
        gymLeaderCopy[i].pokemon.push(await getPokemon(id));
      }
      this.setState({
        gymLeader: gymLeaderCopy
      });
    }

    for (let i = 0; i < eliteFour.length; i++) {
      for (let j = 0; j < eliteFour[i].array.length; j++) {
        const id = eliteFour[i].array[j];
        eliteFourCopy[i].pokemon.push(await getPokemon(id));
      }
      this.setState({
        eliteFour: eliteFourCopy
      });
    }
    const user = await trainerPokemon();
    const userPokemon = user[0];
    const userMoves = await getMoves(userPokemon.id);
    this.setState({ user, userPokemon, userMoves });
  };

  battleStart = async () => {
    const npcContainer = this.state.gymLeader.shift();
    const npc = npcContainer.pokemon;
    const npcPokemon = npc.shift();
    const npcMoves = await getMoves(npcPokemon.id);
    this.setState({
      npc,
      npcPokemon,
      npcMoves,
      isStart: true
    });
  };

  evolution = async () => {
    let userHealth = this.state.userPokemon.current_health;
    let fullyEvolved = this.state.userPokemon.fullyEvolved;
    let id = this.state.userPokemon.id;
    let total_experience = this.state.userPokemon.total_experience;
    let current_experience = this.state.userPokemon.current_experience;
    let level = this.state.userPokemon.level;
    let health = this.state.userPokemon.health;
    let frontImage = this.state.userPokemon.frontImage;
    let backImage = this.state.userPokemon.backImage;
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

  //*************************************************** */

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
  };

  battleSequence = async () => {
    let formData = this.state.formData;
    let id = this.state.userPokemon.id;
    let npcHealth = this.state.npcPokemon.current_health;
    let halfHp = this.state.npcPokemon.health / 2;
    let randomNpcAttack = this.randomFunc(this.state.npcMoves);
    let npcAttack = randomNpcAttack.attack;
    let npcAnimation = randomNpcAttack.animation;

    let userHealth = this.state.userPokemon.current_health;
    let randomUserAttack = this.randomFunc(this.state.userMoves);
    let userAttack = randomUserAttack.attack;
    let userAnimation = randomUserAttack.animation;

    this.setState({ userAnimation, userTurn: true });
    setTimeout(
      function() {
        this.setState({ userAnimation: null, userTurn: false });
      }.bind(this),
      1000
    );
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
      setTimeout(
        function() {
          this.setState({
            npcPokemon: { ...this.state.npcPokemon, current_health: 0 },
            userPokemon: { ...this.state.userPokemon, current_health: 0 },
            formData: { ...this.state.formData, current_health: userHealth }
          });
        }.bind(this),
        2000
      );
    } else if (npcHealth < 0 || npcHealth === 0) {
      if (this.state.npc.length !== 0) {
        let index = null;
        const npc = this.state.npc;
        const npcPokemon = npc.pop(0);
        const passData = {
          current_health: 0
        };
        this.setState({
          npcPokemon,
          npc,
          formData: { ...this.state.formData, current_health: userHealth }
        });

        const resp = await update(id, passData);
        console.log(this.state.npc.length);
      } else if (this.state.npc.length === 0) {
        this.setState({ isStart: false, npcPokemon: null });
      }
      this.evolution();
    } else if (userHealth < 0 || userHealth === 0) {
      let index = null;
      const user = this.state.user;
      user.splice(index, 1);
      const userPokemon = user[0];
      console.log(userPokemon);
      const passData = {
        current_health: 0
      };
      if (!this.state.user) {
        this.props.saySomething(
          "YOU LOST... Go head to Pokecenter and heal those poor pokemons then try again"
        );
        const resp = await update(this.state.userPokemon.id, passData);
      } else {
        for (let i = 0; i < this.state.user.length; i++) {
          if (this.state.user[i].id === this.state.userPokemon.id) {
            index = i;
          }
        }
      }
      this.setState({
        user,
        userPokemon,
        formData: { ...this.state.formData, current_health: 0 },
        win: true
      });
    } else {
      const passData = {
        current_health: userHealth
      };
      setTimeout(
        function() {
          this.setState({
            userPokemon: {
              ...this.state.userPokemon,
              current_health: userHealth
            },
            formData: { ...this.state.formData, current_health: userHealth },
            npcPokemon: { ...this.state.npcPokemon, current_health: npcHealth }
          });
        }.bind(this),
        2500
      );
      const resp = await update(id, passData);
    }
  };

  change = async pokemon => {
    console.log(pokemon);
    const fighterPokemonID = this.state.userPokemon.id;
    const formData = this.state.formData;
    const id = pokemon.id;
    let randomNpcAttack = this.randomFunc(this.state.npcMoves);
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
    const userPokemon = await getPokemon(id);

    const resp1 = await update(fighterPokemonID, formData);

    const userMoves = await getMoves(id);
    setTimeout(
      function() {
        this.setState({
          userPokemon,
          userMoves,
          formData: {
            current_health: userHealth
          }
        });
      }.bind(this),
      2500
    );
  };

  render() {
    return (
      <div>
        {this.state.npcPokemon && <>{console.log(this.state.userPokemon)}</>}
        {!this.state.isStart && (
          <button onClick={() => this.battleStart()}>START</button>
        )}
        {this.state.npcPokemon && (
          <div className="npc">
            {this.state.npc.map((data, index) => (
              <div key={index}>
                <img
                  onClick={() => this.change(data)}
                  src="https://purepng.com/public/uploads/medium/purepng.com-pokeballpokeballdevicepokemon-ballpokemon-capture-ball-1701527825795vtfp2.png"
                />
              </div>
            ))}
            <div>
              {this.state.userAnimation && (
                <img className="userFX" src={this.state.userAnimation} />
              )}

              <div>
                <div className="npcA">
                  <div className="npcB">
                    <span>{this.state.npcPokemon.name}</span>
                    <MaxHealthBar
                      percentage={this.state.npcPokemon.current_health}
                    />
                  </div>
                  <div>
                    {this.state.npcPokemon.current_health ? (
                      <img
                        className={
                          this.state.npcTurn ? "npcMove" : "npcPokemon"
                        }
                        src={this.state.npcPokemon.frontImage}
                      />
                    ) : (
                      <img className="npcPokemon" src={this.state.rip} />
                    )}
                  </div>
                </div>
                <button onClick={() => this.battleSequence()}>FIGHT</button>

                <div>
                  <div className="userA">
                    <div>
                      {this.state.npcAnimation && (
                        <img className="npcFX" src={this.state.npcAnimation} />
                      )}

                      {!this.state.user <= 0 ? (
                        <img
                          className={
                            this.state.userTurn ? "userMove" : "userPokemon"
                          }
                          src={
                            this.state.user.length !== 0
                              ? this.state.userPokemon.backImage
                              : this.state.rip
                          }
                        />
                      ) : (
                        <img className="userPokemon" src={this.state.rip} />
                      )}
                    </div>
                    {this.state.userPokemon && (
                      <div className="userB">
                        <span>{this.state.userPokemon.name}</span>
                        <MaxHealthBar
                          percentage={this.state.userPokemon.current_health}
                        />
                      </div>
                    )}
                  </div>
                </div>
                {this.state.user.map((data, index) => (
                  <div key={index}>
                    <img
                      onClick={() => this.change(data)}
                      src={this.state.user[index].frontImage}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default League;
