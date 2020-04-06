import React, { Component } from "react";
import { Link } from "react-router-dom";

import { getChampion } from "../services/api_helper";

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      champion: null
    };
  }

  componentDidMount = async () => {
    const champion = await getChampion();
    if (champion) {
      this.props.saySomething(
        `Here is the menu... Be the greatest trainer by defeating the Reigning Champion!`
      );
    } else {
      this.props.saySomething(
        "Here is the menu... At this moment there is no Pokemon Champion in this league. You have to finish the League in order to be one."
      );
    }
    this.setState({
      champion
    });
  };

  render() {
    return (
      <div className="menu">
        <div className="champContainer">
          <img src="https://i.gifer.com/6x6G.gif" />
          {this.state.champion ? (
            <>
              <h4>{this.state.champion.username}</h4>
              <div className="pokemonMaster">POKEMON MASTER</div>
            </>
          ) : (
            <>NO CHAMPION</>
          )}
        </div>
        <Link className="menuButton" to="/trainer">
          PROFILE
        </Link>
        <Link className="menuButton" to="/forest">
          FOREST
        </Link>
        <Link className="menuButton" to="/pokecenter">
          POKECENTER
        </Link>
        <Link className="menuButton" to="/league">
          LEAGUE
        </Link>
      </div>
    );
  }
}
