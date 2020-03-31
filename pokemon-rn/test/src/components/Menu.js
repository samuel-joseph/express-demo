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
    this.setState({
      champion
    });
  };

  render() {
    return (
      <div className="menu">
        <div className="champContainer">
          {this.state.champion && (
            <div>
              <div>Pokemon Master {this.state.champion.username}</div>
            </div>
          )}
        </div>
        <Link className="menuButton" to="/trainer">
          Profile
        </Link>
        <Link className="menuButton" to="/forest">
          Forest
        </Link>
        <Link className="menuButton" to="/pokecenter">
          Pokecenter
        </Link>
        <Link className="menuButton" to="/league">
          League
        </Link>
      </div>
    );
  }
}
