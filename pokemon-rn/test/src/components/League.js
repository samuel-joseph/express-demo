import React, { Component } from "react";
import { getPokemon, trainerPokemon, getMoves } from "../services/api_helper";

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
    // const npcPokemon = gymLeaderCopy[0];
    // const npcMoves = await getMoves(npcPokemon.id);
    this.setState({ user, userPokemon, userMoves });
  };

  battleStart = async () => {
    const npcContainer = this.state.gymLeader.shift();
    const npc = npcContainer.pokemon;
    const npcPokemon = npc.shift();
    const npcMoves = await getMoves(npcPokemon.id);
    console.log(npcPokemon);
    console.log(npcPokemon);
    this.setState({
      npc,
      npcPokemon,
      npcMoves
    });
  };

  render() {
    return (
      <div>
        {this.state.npc && <>{console.log(this.state.npcPokemon.name)}</>}
        <button onClick={() => this.battleStart()}>START</button>
        {/* {this.state.npc && (
          <div>
            <img src={this.state.npcPokemon.frontImage} />
          </div>
        )} */}
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
              {/* {this.state.userAnimation && (
                <img className="userFX" src={this.state.userAnimation} />
              )} */}

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
                        className="npcPokemon"
                        // className={
                        //   this.state.npcTurn ? "npcMove" : "npcPokemon"
                        // }
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
                      {/* {this.state.npcAnimation && (
                        <img className="npcFX" src={this.state.npcAnimation} />
                      )} */}

                      {!this.state.userPokemon.current_health <= 0 ? (
                        <img
                          className={
                            this.state.userTurn ? "userMove" : "userPokemon"
                          }
                          src={
                            this.state.userPokemon.backImage
                              ? this.state.userPokemon.backImage
                              : this.state.rip
                          }
                        />
                      ) : (
                        <img className="userPokemon" src={this.state.rip} />
                      )}
                    </div>
                    <div className="userB">
                      <span>{this.state.userPokemon.name}</span>
                      <MaxHealthBar
                        percentage={this.state.userPokemon.current_health}
                      />
                    </div>
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

// {
//   this.state.gymLeader && (
//     <>
//       <h1>GYM LEADER</h1>
//       {console.log(this.state)}
//       {this.state.gymLeader.map(data => (
//         <div>
//           <h5>{data.name}</h5>
//           <div>
//             {data.pokemon.map(pokemon => (
//               <img src={pokemon.frontImage} />
//             ))}
//           </div>
//         </div>
//       ))}
//     </>
//   );
// }
// {
//   this.state.eliteFour && (
//     <>
//       <h1>Elite Four</h1>
//       {this.state.eliteFour.map(data => (
//         <div>
//           <h5>{data.name}</h5>
//           <div>
//             {data.pokemon.map(pokemon => (
//               <img src={pokemon.frontImage} />
//             ))}
//           </div>
//         </div>
//       ))}
//     </>
//   );
// }
