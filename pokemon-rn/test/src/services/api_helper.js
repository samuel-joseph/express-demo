import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001"
});

export const loginUser = async loginData => {
  const resp = await api.post("/users/login", loginData);
  localStorage.setItem("authToken", resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`;
  localStorage.setItem("name", resp.data.user.username);
  localStorage.setItem("trainername", resp.data.trainername);
  localStorage.setItem("id", resp.data.user.id);
  console.log(resp.data.user);
  return resp.data.user;
};

export const registerUser = async registerData => {
  const resp = await api.post("/users/register", registerData);
  console.log(resp.data.token);
  localStorage.setItem("authToken", resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`;
  localStorage.setItem("authToken", resp.data.token);
  localStorage.setItem("username", resp.data.user.username);
  // localStorage.setItem("trainername", resp.data.user.trainername);
  localStorage.setItem("id", resp.data.user.id);
  console.log(resp);
  return resp.data.user;
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

export const storePokemon = async postData => {
  let pokemon = await api.post("/pokemons", postData);
};

export const trainerPokemon = async () => {
  let resp = await api.get("pokemons/trainer");
  console.log(resp);
};

export const getPokemon = async id => {
  const resp = await api.get(`/pokemons/${id}`);
  console.log(resp);
  return resp.data;
};

export const update = async (id, postData) => {
  const resp = await api.put(`/pokemons/${id}`, postData);
  return;
};

export const remove = async id => {
  const resp = await api.delete(`/pokemons/${id}`);
  return;
};
