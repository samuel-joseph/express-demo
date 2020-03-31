import React, { Component } from "react";
import {
  getPokemon,
  trainerPokemon,
  getMoves,
  update,
  addMoves,
  removeMove,
  getChampion,
  ownedPokemon,
  newChampion
} from "../services/api_helper";

import MaxHealthBar from "./maxHealthBar";
import Outcome from "./Outcome";

class League extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentNpc: {
        name: null,
        image: null,
        message: null
      },
      heal: null,
      userWin: false,
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
      isChamp: false,
      rip:
        "https://b7.pngbarn.com/png/250/103/headstone-grave-cemetery-rest-in-peace-grave-s-png-clip-art-thumbnail.png",
      formData: {
        current_health: null
      },
      gymLeader: [
        {
          name: "Brock",
          message: "Good job trainer",
          image:
            "https://em.wattpad.com/65355e3409b8e29cdf2256fe160ea59cd3787abc/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f6b4945516f5a373041744f5034413d3d2d3335323236323731302e313439346530303531623832313934383639373839303938313438352e706e67?s=fit&w=720&h=720",
          array: [74, 95],
          pokemon: []
        },
        {
          name: "Misty",
          message: "Good job trainer",
          image:
            "https://cdn.bulbagarden.net/upload/thumb/f/f6/Lets_Go_Pikachu_Eevee_Misty.png/183px-Lets_Go_Pikachu_Eevee_Misty.png",
          // array: [120, 121],
          array: [74, 95],
          pokemon: []
        },
        {
          name: "Lt. Surge",
          message: "Good job trainer",
          image:
            "https://cdn.bulbagarden.net/upload/thumb/b/bc/Lets_Go_Pikachu_Eevee_Lt_Surge.png/216px-Lets_Go_Pikachu_Eevee_Lt_Surge.png",
          // array: [100, 25, 26],
          array: [74, 95],
          pokemon: []
        },
        {
          name: "Erika",
          message: "Good job trainer",
          image:
            "https://projectpokemon.org/home/uploads/monthly_2019_06/large.celadon-city-char-erika.png.723ad4918835af3cb562f78c11a971db.png",
          // array: [114, 70, 71],
          array: [74, 95],
          pokemon: []
        },
        {
          name: "Koga",
          message: "Good job trainer",
          image:
            "https://cdn.bulbagarden.net/upload/thumb/f/f4/Lets_Go_Pikachu_Eevee_Koga.png/225px-Lets_Go_Pikachu_Eevee_Koga.png",
          // array: [109, 89, 109, 110],
          array: [74, 95],
          pokemon: []
        },
        {
          name: "Sabrina",
          message: "Good job trainer",
          image:
            "https://cdn.bulbagarden.net/upload/thumb/7/78/Lets_Go_Pikachu_Eevee_Sabrina.png/211px-Lets_Go_Pikachu_Eevee_Sabrina.png",
          // array: [64, 122, 49, 65],
          array: [74, 95],
          pokemon: []
        },
        {
          name: "Blaine",
          message: "Good job trainer",
          image:
            "https://cdn.bulbagarden.net/upload/thumb/c/c8/Lets_Go_Pikachu_Eevee_Blaine.png/216px-Lets_Go_Pikachu_Eevee_Blaine.png",
          // array: [38, 78, 59, 126],
          array: [74, 95],
          pokemon: []
        },
        {
          name: "Giovanni",
          message: "Good job trainer",
          image:
            "https://gamepedia.cursecdn.com/wiki_marriland/f/f2/Giovanni.png",
          // array: [53, 111, 112, 115, 31],
          array: [74, 95],
          pokemon: []
        }
      ],
      eliteFour: [
        {
          name: "Lorelei",
          message: "Good job trainer",
          image:
            "https://cdn.bulbagarden.net/upload/thumb/f/f7/Lets_Go_Pikachu_Eevee_Lorelei.png/162px-Lets_Go_Pikachu_Eevee_Lorelei.png",
          // array: [87, 124, 91, 80, 131],
          array: [74, 95],
          pokemon: []
        },
        {
          name: "Bruno",
          message: "Good job trainer",
          image:
            "https://cdn.bulbagarden.net/upload/thumb/4/4c/Lets_Go_Pikachu_Eevee_Bruno.png/200px-Lets_Go_Pikachu_Eevee_Bruno.png",
          // array: [95, 106, 95, 107, 68],
          array: [74, 95],
          pokemon: []
        },
        {
          name: "Agatha",
          message: "Good job trainer",
          image:
            "https://vignette.wikia.nocookie.net/pokemon/images/c/c9/Agatha_Lets_Go_Pikachu_Eevee.png/revision/latest?cb=20181120184616",
          // array: [93, 42, 93, 24, 94],
          array: [74, 95],
          pokemon: []
        },
        {
          name: "Lance",
          message: "Good job trainer",
          image:
            "https://vignette.wikia.nocookie.net/vsbattles/images/f/f5/HeartGold_SoulSilver_Lance.png/revision/latest/scale-to-width-down/340?cb=20161217185553",
          // array: [130, 148, 142, 148, 149],
          array: [74, 95],
          pokemon: []
        }
      ],
      champion: {
        id: null,
        name: null,
        message: "Well done trainer",
        pokemon: null
      }
    };
  }

  componentDidMount = async () => {
    console.log(localStorage.getItem("id"));
    const gymLeader = this.state.gymLeader;
    const eliteFour = this.state.eliteFour;
    let gymLeaderCopy = JSON.parse(JSON.stringify(gymLeader));
    let eliteFourCopy = JSON.parse(JSON.stringify(eliteFour));
    this.props.saySomething(
      "Challenge the Pokemon Master by defeating all the Gym Leaders and Elite Four!"
    );

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
    this.setState({ user, userPokemon, userMoves, heal: 5 });

    const champion = await getChampion();
    console.log(champion);
    if (champion) {
      const idChamp = champion.id;
      const resp = await ownedPokemon(idChamp);
      const pokemon = resp.data.pokemon;
      const name = champion.username;
      this.setState({
        champion: { ...this.state.champion, id: idChamp, name, pokemon }
      });
    }
  };

  newNpc = async enemy => {
    console.log(enemy);
    const npcContainer = enemy.shift();
    const npc = npcContainer.pokemon;
    const name = npcContainer.name;
    const image = npcContainer.image;
    const message = npcContainer.message;

    const npcPokemon = npc.shift();
    const npcMoves = await getMoves(npcPokemon.id);
    this.setState({
      currentNpc: {
        name,
        image,
        message
      },
      npc,
      npcPokemon,
      npcMoves,
      isStart: true,
      userWin: false
    });
  };

  finalMatch = async enemy => {
    // console.log(enemy);
    // const npcContainer = enemy.shift();
    const npc = this.state.champion.pokemon;
    // const name = npcContainer.name;
    // const image = npcContainer.image;
    // const message = npcContainer.message;

    const npcPokemon = npc.shift();
    const npcMoves = await getMoves(npcPokemon.id);
    this.setState({
      // currentNpc: {
      //   name,
      //   image,
      //   message
      // },
      npc,
      npcPokemon,
      npcMoves,
      isStart: true,
      userWin: false
    });
  };

  battleStart = async () => {
    const gymLeader = this.state.gymLeader;
    const eliteFour = this.state.eliteFour;
    let enemy = null;
    let champ = null;

    if (gymLeader.length !== 0) {
      enemy = gymLeader;
      this.newNpc(enemy);
    } else if (gymLeader.length === 0 && eliteFour.length !== 0) {
      enemy = eliteFour;
      this.newNpc(enemy);
    } else if (gymLeader.length === 0 && eliteFour.length === 0) {
      champ = await getChampion();
      if (
        this.state.champion.pokemon &&
        this.state.champion.pokemon.length !== 0
      ) {
        // let pokemon = await ownedPokemon(champ.id);
        // enemy = pokemon.data.pokemon;
        this.props.saySomething(
          `Behold the Pokemon Champion ${champ.username}! Is here!`
        );
        this.finalMatch();
      } else {
        const postData = {
          rank: "champion"
        };

        const id = localStorage.getItem("id");
        const resp = await newChampion(id, postData);
        if (this.state.champion.id) {
          const formerChamp = {
            rank: "undefined"
          };
          const resp1 = await newChampion(this.state.champion.id, formerChamp);
        }
        this.setState({ isChamp: true });
        this.props.saySomething("YOU ARE THE NEW CHAMPION!");
      }
    }
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

    if (level < 100) {
      if (current_experience >= total_experience) {
        level++;
        health += 2;
        current_experience = current_experience - total_experience;
        if (current_experience < 0) current_experience = 0;
        if (level === 15 && fullyEvolved === false) {
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
    let levelUser = this.state.userPokemon.level;
    let levelNpc = this.state.npcPokemon.level;
    let formData = this.state.formData;
    let id = this.state.userPokemon.id;
    let npcHealth = this.state.npcPokemon.current_health;
    let halfHp = this.state.npcPokemon.health / 2;
    let randomNpcAttack = this.randomFunc(this.state.npcMoves);
    let npcAttack = Math.floor(
      randomNpcAttack.attack + randomNpcAttack.attack * levelNpc * 0.01
    );
    let npcAnimation = randomNpcAttack.animation;

    let userHealth = this.state.userPokemon.current_health;
    let randomUserAttack = this.randomFunc(this.state.userMoves);
    let userAttack = Math.floor(
      randomUserAttack.attack + randomUserAttack.attack * levelUser * 0.01
    );
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
      } else {
        this.setState({ userWin: true, npcPokemon: null });
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

  healAll = async () => {
    const trainer = this.state.user;
    let heal = this.state.heal;
    heal--;
    for (let i = 0; i < trainer.length; i++) {
      let id = trainer[i].id;
      let fullHp = trainer[i].health;
      let passData = {
        current_health: fullHp
      };
      const regainHp = await update(id, passData);
    }
    const user = await trainerPokemon();
    const userPokemon = user.shift();
    const userMoves = await getMoves(userPokemon);
    this.setState({ heal, user, userPokemon, userMoves });
  };

  change = async pokemon => {
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

  // nextBattle = () => {

  // }

  render() {
    return (
      <div>
        {!this.state.isStart && (
          <div>
            <h4>GYM LEADER</h4>
            <div className="gym">
              {this.state.gymLeader &&
                this.state.gymLeader.map(data => (
                  <img className="leader" src={data.image} />
                ))}
            </div>

            <h4>ELITE FOUR</h4>
            <div className="elite">
              {this.state.eliteFour &&
                this.state.eliteFour.map(data => (
                  <img className="four" src={data.image} />
                ))}
            </div>
            <button onClick={() => this.battleStart()}>START</button>
          </div>
        )}

        {this.state.isChamp ? (
          <>
            <Outcome
              result={this.state.userWin}
              pokemon={this.state.user}
              champ={this.state.champion}
            />
          </>
        ) : (
          <>
            {this.state.userWin && (
              <>
                <div className="currentLeader">
                  <h4>Gym Leader {this.state.currentNpc.name}</h4>
                  <img
                    className="currentLeaderImage"
                    src={this.state.currentNpc.image}
                  />
                  <p>{this.state.currentNpc.message}</p>
                </div>
                {this.state.heal !== 0 && (
                  <>
                    <img
                      onClick={() => this.healAll()}
                      src="https://i.ya-webdesign.com/images/pixel-potion-png-4.png"
                    />
                    x{this.state.heal}
                  </>
                )}
                <button onClick={() => this.battleStart()}>PROCEED</button>
                {this.state.user &&
                  this.state.user.map(data => (
                    <>
                      <img src={data.frontImage} />
                      <MaxHealthBar
                        percentage={this.state.userPokemon.current_health}
                      />
                    </>
                  ))}
              </>
            )}
          </>
        )}

        {this.state.npcPokemon && (
          <div className="npc">
            {this.state.npc.map((data, index) => (
              <div key={index}>
                <img
                  onClick={() => this.change(data)}
                  src="https://i.ya-webdesign.com/images/pokeball-pixel-png-2.png"
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
                    <div className="hpBar">
                      <MaxHealthBar
                        percentage={this.state.npcPokemon.current_health}
                      />
                    </div>
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
                        {console.log(this.state.gymLeader.length)}
                        <div className="hpBar">
                          <MaxHealthBar
                            percentage={this.state.userPokemon.current_health}
                          />
                        </div>
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
