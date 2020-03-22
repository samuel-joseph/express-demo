import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";

import { trainerPokemon, getMoves, update } from "../services/api_helper";

class Battle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      npc: [],
      npcAttack: null,
      userPokemon: null,
      userPokemonAttacks: null,
      fighterPokemon: []
    };
  }

  componentDidMount = async () => {
    const arrayPokemons = this.props.pokemonID;
    const npc = [];
    npc.push(arrayPokemons);
    const userPokemon = await trainerPokemon();
    const fighterPokemon = userPokemon.pop();
    const npcAttack = await getMoves(arrayPokemons.id);
    const userPokemonAttacks = await getMoves(fighterPokemon.id);
    console.log(userPokemonAttacks);

    this.setState({
      npc,
      userPokemon,
      fighterPokemon,
      npcAttack,
      userPokemonAttacks
    });
  };

  randomFunc(random) {
    let response = random[Math.floor(Math.random() * random.length)];
    return response;
  }

  battleSequence = async () => {
    let user = localStorage.getItem("trainername");
    let id = this.state.fighterPokemon;
    let current_health = this.state.fighterPokemon.current_health;
    let npcHealth = this.state.npc[0].current_health;
    let randomNpcAttack = this.randomFunc(this.state.npcAttack);
    let npcAttack = randomNpcAttack.attack;

    let userHealth = this.state.fighterPokemon.current_health;
    let randomUserAttack = this.randomFunc(this.state.userPokemonAttacks);
    let userAttack = randomUserAttack.attack;

    console.log(randomUserAttack);

    // if (userAttack >= 100) {
    //   this.setState({ animate: true });
    // } else if (userAttack > 0 && userAttack < 100) {
    //   this.setState({ attack: true })
    // }

    // if (npcAttack >= 100) {
    //   this.setState({ animate1: true });
    // } else if (npcAttack > 0 && npcAttack < 100) {
    //   this.setState({ attack1: true });
    // }
    // console.log(this.state.attack);
    // console.log(this.state.attack1);
    // this.props.display(
    //   `${user} pokemon use ${randomUserAttack.name} with ${randomUserAttack.power} damage!
    //   Rival pokemon use ${randomNpcAttack.name} with ${randomNpcAttack.power} damage!`
    // );
    npcHealth = npcHealth - userAttack;
    current_health = userHealth - npcAttack;
    console.log(npcHealth);
    console.log(userHealth);
    console.log(this.state.npc);
    console.log(this.state.fighterPokemon);

    this.setState({
      fighterPokemon: { ...this.state.fighterPokemon, current_health }
    });

    // if (npcHealth <= 0 && userHealth <= 0) {
    //   this.props.display(
    //     `Both Pokemons have fainted! Send your pokemon to Pokemon Center`
    //   );
    //   this.setState({
    //     npc: { ...this.state.npc, current_health: 0 },
    //     user: { ...this.state.user, current_health: 0 },
    //     fainted: true,
    //     end: true
    //   });
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
    console.log(this.state.userPokemon[0]);

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

  render() {
    return (
      <div>
        {this.state.fighterPokemon && (
          <div>
            <div>
              {this.state.npc.map((stray, index) => (
                <div key={index}>
                  <div>
                    <img src={stray.frontImage} />
                  </div>
                  <div>
                    <p>{stray.name}</p>
                    <p>
                      {stray.current_health}/{stray.health}
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
              ))}
            </div>
            <button onClick={() => this.battleSequence()}>FIGHT</button>
            <div>
              {console.log(this.state.fighterPokemon)}
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
              {/* {this.state.userPokemonAttacks.map(data => (
                <div>
                  {data.name}
                  {data.attack}
                </div>
              ))}
              )} */}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Battle);
