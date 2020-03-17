import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001"
});

export const loginUser = async loginData => {
  console.log(loginData);
  const resp = await api.post("/auth/login", loginData);
  localStorage.setItem("authToken", resp.data.auth_token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.auth_token}`;
  localStorage.setItem("name", resp.data.name);
  localStorage.setItem("trainername", resp.data.trainername);
  localStorage.setItem("id", resp.data.user.id);
  console.log(resp.data.user.id);
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

export const verifyUser = () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
  }
};

export const userData = async () => {
  const resp = await api.get("users/verify");
  return resp;
};

export const getAllPokemon = async () => {
  const resp = await api.get("pokemons/pokedex");
  return resp.data.pokemons;
};

export const trainerPokemon = async () => {
  const resp = await api.get("pokemons/trainer");
  return resp.data.pokemons;
};

export const storePokemon = async postData => {
  let pokemon = await api.post("/pokemons", postData);
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