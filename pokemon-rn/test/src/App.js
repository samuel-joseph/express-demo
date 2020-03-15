import React from "react";
import axios from "axios";
import "./App.css";

const api = async () => {
  console.log("WHAAAAT");
  const resp = await axios.get("http://localhost:3001/pokemons/pokedex");
  console.log(resp);
};

function App() {
  return (
    <div className="App">
      <button onClick={api}>HELLO</button>
    </div>
  );
}

export default App;
