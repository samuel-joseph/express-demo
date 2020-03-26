import react from "react";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div>
      <Link to="/trainer">Profile</Link>
      <Link to="/forest">Forest</Link>
      <Link to="/pokecenter">Pokecenter</Link>
      <Link to="/league">League</Link>
    </div>
  );
}
