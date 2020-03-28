import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import { getPokemon } from "../services/api_helper";

class League extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
  };


  render() {
    return (
      <div>
        {this.state.gymLeader && (
          <>
            <h1>GYM LEADER</h1>
            {this.state.gymLeader.map(data => (
              <div>
                <h5>{data.name}</h5>
                <div>
                  {data.pokemon.map(pokemon => (
                    <img src={pokemon.frontImage} />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
        {this.state.eliteFour && (
          <>
            <h1>Elite Four</h1>
            {this.state.eliteFour.map(data => (
              <div>
                <h5>{data.name}</h5>
                <div>
                  {data.pokemon.map(pokemon => (
                    <img src={pokemon.frontImage} />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    );
  }
}
export default withRouter(League);
