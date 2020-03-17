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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      currentUser: null,
      formData: {
        username: null,
        password: null
      }
    };
  }

  componentDidMount = async () => {
    verifyUser();
    console.log(this.state.currentUser);
    if (localStorage.getItem("authToken")) {
      const username = localStorage.getItem("username");
      const user = { username };
      console.log(user);
      user &&
        this.setState({
          currentUser: user
        });
    }
    console.log(this.state.currentUser);
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
  };

  handleLogin = async (e, loginData) => {
    e.preventDefault();
    const currentUser = await loginUser(loginData);
    const id = currentUser.id;
    this.setState({ currentUser, id });
  };

  handleLogout = () => {
    this.setState({
      currentUser: null
    });
    console.log("TEST");
    localStorage.removeItem("authToken");
    localStorage.removeItem("name");
    localStorage.removeItem("trainername");
    localStorage.removeItem("id");
    this.props.history.push("/welcome");
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
        <Route
          path="/users/register"
          render={() => <RegisterForm handleRegister={this.handleRegister} />}
        />
        <Route path="/pokemons/pokedex" render={() => <Pokedex />} />
        <Route
          path="/users/login"
          render={() => <LoginForm handleLogin={this.handleLogin} />}
        />
      </div>
    );
  }
}

export default withRouter(App);
