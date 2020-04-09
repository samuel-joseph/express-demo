import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const loginUser = async (loginData) => {
  const resp = await api.post("/users/login", loginData);
  localStorage.setItem("authToken", resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`;
  console.log(resp.data.token);
  localStorage.setItem("name", resp.data.user.username);
  localStorage.setItem("trainername", resp.data.trainername);
  localStorage.setItem("id", resp.data.user.id);
  console.log(resp.data.user);
  return resp.data.user;
};

export const registerUser = async (registerData) => {
  const resp = await api.post("/users/register", registerData);
  console.log(resp.data.token);
  localStorage.setItem("authToken", resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`;
  localStorage.setItem("authToken", resp.data.token);
  localStorage.setItem("name", resp.data.user.username);
  // localStorage.setItem("trainername", resp.data.user.trainername);
  localStorage.setItem("id", resp.data.user.id);
  console.log(resp);
  return resp.data.user;
};

export const getChampion = async () => {
  const resp = await api.get("/users/champion");
  return resp.data[0];
};

export const newChampion = async (id, postData) => {
  const resp = await api.put(`/users/${id}`, postData);
  return;
};

export const getAllTrainer = async () => {
  const resp = await api.post("/users/all");
  return resp;
};

export const verifyUser = () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
  }
};

export const userData = async () => {
  const resp = await api.get("users/verify");
  console.log(resp);
  return resp;
};

export const getAllPokemon = async () => {
  const resp = await api.get("pokemons/pokedex");
  return resp.data.pokemons;
};

export const storePokemon = async (postData) => {
  let pokemon = await api.post("/pokemons", postData);
  console.log(pokemon);
  console.log("pokemon stored");
  return pokemon;
};

export const trainerPokemon = async () => {
  let resp = await api.get("pokemons/trainer");
  console.log(resp.data.pokemons);
  return resp.data.pokemons;
};

export const getMoves = async (id) => {
  let resp = await api.get(`/pokemons/${id}/moves`);
  console.log(resp);
  return resp.data.moves;
};

export const ownedPokemon = async (id) => {
  let resp = await api.get(`/pokemons/trainer/${id}`);
  return resp;
};

export const addMoves = async (id, moveData) => {
  let resp = await api.post(`/pokemons/${id}/moves`, moveData);
  console.log(resp);
  return resp;
};

export const getPokemon = async (id) => {
  const resp = await api.get(`/pokemons/${id}`);
  return resp.data.pokemon;
};

export const update = async (id, postData) => {
  const resp = await api.put(`/pokemons/${id}`, postData);
  return;
};

export const remove = async (id) => {
  const resp = await api.delete(`/pokemons/${id}`);
  return;
};

export const removeMove = async (pokemonId, moveId) => {
  console.log(pokemonId);
  console.log(moveId);
  const resp = await api.delete(`/pokemons/${pokemonId}/moves/${moveId}`);
  console.log("MOVE REMOVED");
  return;
};

export const useAdvantage = (moves, pokemon) => {
  console.log(moves);
  let answer = null;
  let use = [];
  for (let i = 0; i < moves.length; i++) {
    let j = moves[i].type;
    let k = typeAdvantage(j, pokemon);

    if (k === 2) answer = j;
  }
  if (!answer) {
    for (let i = 0; i < moves.length; i++) {
      let j = moves[i].type;
      let k = typeAdvantage(j, pokemon);

      if (k === 1) answer = j;
    }
  }
  if (answer) {
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].type === answer) {
        use.push(moves[i]);
      }
    }
    return use;
  } else return moves;
};

export const typeAdvantage = (move, pokemon) => {
  switch (move) {
    case "Dragon":
      switch (pokemon) {
        case "Dragon":
          return 2;
        default:
          return 1;
      }
    case "Ghost":
      switch (pokemon) {
        case "Normal":
          return 0;
        case "Psychic":
          return 0;
        case "Ghost":
          return 2;
        default:
          return 1;
      }
    case "Rock":
      switch (pokemon) {
        case "Fire":
          return 2;
        case "Ice":
          return 0.5;
        case "Fighting":
          return 0.5;
        case "Flying":
          return 2;
        case "Ground":
          return 0.5;
        case "Ghost":
          return 0.5;
        default:
          return 1;
      }
    case "Bug":
      switch (pokemon) {
        case "Fire":
          return 0.5;
        case "Grass":
          return 2;
        case "Fighting":
          return 0.5;
        case "Poison":
          return 2;
        case "Flying":
          return 0.5;
        case "Psychic":
          return 2;
        case "Ghost":
          return 0.5;
        default:
          return 1;
      }
    case "Psychic":
      switch (pokemon) {
        case "Fighting":
          return 2;
        case "Poison":
          return 2;
        case "Psychic":
          return 0.5;
        default:
          return 1;
      }
    case "Flying":
      switch (pokemon) {
        case "Electric":
          return 0.5;
        case "Grass":
          return 2;
        case "Fighting":
          return 2;
        case "Bug":
          return 2;
        case "Ghost":
          return 0.5;
        default:
          return 1;
      }
    case "Ground":
      switch (pokemon) {
        case "Fire":
          return 2;
        case "Electric":
          return 2;
        case "Grass":
          return 0.5;
        case "Poison":
          return 2;
        case "Flying":
          return 0;
        case "Bug":
          return 0.5;
        case "Rock":
          return 2;
        default:
          return 1;
      }
    case "Poison":
      switch (pokemon) {
        case "Grass":
          return 2;
        case "Ice":
          return 2;
        case "Grass":
          return 0.5;
        case "Poison":
          return 0.5;
        case "Ground":
          return 0.5;
        case "Bug":
          return 2;
        case "Rock":
          return 0.5;
        case "Ghost":
          return 0.5;
        default:
          return 1;
      }
    case "Fighting":
      switch (pokemon) {
        case "Normal":
          return 2;
        case "Ice":
          return 2;
        case "Grass":
          return 0.5;
        case "Poison":
          return 0.5;
        case "Psychic":
          return 0.5;
        case "Flying":
          return 0.5;
        case "Bug":
          return 0.5;
        case "Rock":
          return 2;
        case "Ghost":
          return 0;
        default:
          return 1;
      }
    case "Ice":
      switch (pokemon) {
        case "Water":
          return 0.5;
        case "Grass":
          return 2;
        case "Ice":
          return 0.5;
        case "Ground":
          return 2;
        case "Flying":
          return 2;
        case "Dragon":
          return 2;
        default:
          return 1;
      }
    case "Grass":
      switch (pokemon) {
        case "Fire":
          return 0.5;
        case "Water":
          return 2;
        case "Grass":
          return 0.5;
        case "Poison":
          return 0.5;
        case "Ground":
          return 2;
        case "Flying":
          return 0.5;
        case "Dragon":
          return 0.5;
        default:
          return 1;
      }
    case "Electric":
      switch (pokemon) {
        case "Water":
          return 2;
        case "Electric":
          return 0.5;
        case "Grass":
          return 0.5;
        case "Ground":
          return 0;
        case "Flying":
          return 2;
        case "Dragon":
          return 0.5;
        default:
          return 1;
      }
    case "Water":
      switch (pokemon) {
        case "Fire":
          return 2;
        case "Water":
          return 0.5;
        case "Grass":
          return 0.5;
        case "Ground":
          return 2;
        case "Rock":
          return 2;
        case "Dragon":
          return 0.5;
        default:
          return 1;
      }
    case "Fire":
      switch (pokemon) {
        case "Fire":
          return 0.5;
        case "Water":
          return 0.5;
        case "Grass":
          return 2;
        case "Ice":
          return 2;
        case "Bug":
          return 2;
        case "Rock":
          return 0.5;
        case "Dragon":
          return 0.5;
        default:
          return 1;
      }
    case "Normal":
      switch (pokemon) {
        case "Rock":
          return 0.5;
        case "Ghost":
          return 0;
        default:
          return 1;
      }
  }
};
