import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import {
  loginUser,
  getAllPokemon,
  userData,
  verifyUser,
  registerUser
} from "./services/api_helper";
import { Link, Route, withRouter } from "react-router-dom";

import Pokedex from "./components/Pokedex";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import StartGame from "./components/StartGame";
import Trainer from "./components/Trainer";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      currentUser: null,
      formData: {
        username: null,
        password: null
      },
      pokemons: null
    };
  }

  componentDidMount = async () => {
    verifyUser();
    console.log(this.state.currentUser);
    if (localStorage.getItem("authToken")) {
      const username = localStorage.getItem("username");
      const user = { username };
      console.log(localStorage.getItem("id"));
      user &&
        this.setState({
          currentUser: user
        });
    }
  };

  // checkMoves = async id => {
  //   id++;
  //   const resp = await axios.get(`http://localhost:3001/pokemons/${id}/moves`);
  //   const moves = resp.data.moves;
  //   this.setState({ moves });
  //   console.log(this.state.moves);
  // };

  handleRegister = async (e, registerData) => {
    e.preventDefault();
    console.log(registerData);
    const regData = await registerUser(registerData);
    // const trainername = regData.username;
    console.log(regData);
    // const password = regData.password;
    // const formData = this.state.regData;
    // const id = this.state.id;
    // this.reloadReg(trainername, password);
    const currentUser = regData;
    console.log(currentUser);
    this.setState({
      currentUser
    });

    this.props.history.push("/start");
  };

  handleLogin = async (e, loginData) => {
    e.preventDefault();
    const currentUser = await loginUser(loginData);
    const id = currentUser.id;
    this.setState({ currentUser, id });
    this.props.history.push("/start");
  };

  handleLogout = () => {
    this.setState({
      currentUser: null
    });
    localStorage.removeItem("authToken");
    localStorage.removeItem("name");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
  };

  render() {
    return (
      <div className="App">
        <div>
          <Link to="/pokemons/pokedex">Pokedex</Link>
          {!this.state.currentUser && (
            <Link to="/users/register">Register</Link>
          )}
          {!this.state.currentUser && <Link to="/users/login">Login</Link>}
          {this.state.currentUser && (
            <button onClick={() => this.handleLogout()}>Logout</button>
          )}
        </div>
        {this.state.currentUser && (
          <p>Hello {this.state.currentUser.username}</p>
        )}
        <div>
          <Route path="/start" render={() => <StartGame />} />
          <Route
            path="/users/register"
            render={() => <RegisterForm handleRegister={this.handleRegister} />}
          />
          <Route path="/pokemons/pokedex" render={() => <Pokedex />} />
          <Route
            path="/users/login"
            render={() => <LoginForm handleLogin={this.handleLogin} />}
          />
          <Route path="/trainer" render={() => <Trainer />} />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
