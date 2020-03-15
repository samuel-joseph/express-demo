import React from 'react';
import axios from 'axios';
import './App.css';

const api = async() => {
  const resp = await axios.get("https://localhost3001/pokemons/pokedex")
}

function App() {
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
