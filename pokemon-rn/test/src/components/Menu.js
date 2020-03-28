import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Menu extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {};

  render() {
    return (
      <div className="menu">
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
