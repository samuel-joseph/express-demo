import React from "react";
import { Link } from "react-router-dom";

function Menu() {
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

export default Menu;
