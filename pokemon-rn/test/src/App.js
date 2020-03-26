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

import Forest from "./components/Forest";
import Pokedex from "./components/Pokedex";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import StartGame from "./components/StartGame";
import Trainer from "./components/Trainer";
import Pokecenter from "./components/Pokecenter";
import League from "./components/League";

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
      pokemons: null,
      isClicked: false
    };
  }

  componentDidMount = async () => {
    verifyUser();
    console.log(this.state.currentUser);
    if (localStorage.getItem("authToken")) {
      const username = localStorage.getItem("username");
      const user = { username };
      const id = localStorage.getItem("id");
      user &&
        this.setState({
          currentUser: user,
          id
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

  turnOn = () => {
    this.setState({ isClicked: true });
  };

  render() {
    return (
      <div className="App">
        <div>
          {localStorage.getItem("id") && (
            <>
              <Link to="/trainer">Profile</Link>
              <Link to="/forest">Forest</Link>
              <Link to="/pokecenter">Pokecenter</Link>
              <Link to="/league">League</Link>
            </>
          )}

          {/* <Link to="/pokemons/pokedex">Pokedex</Link> */}
          {!this.state.isClicked && (
            <>
              {!this.state.currentUser && (
                <div className="opening">
                  <h2>POKEMON LEAGUE</h2>
                  <div className="buttonsOpenning">
                    <Link className="register" to="/users/register">
                      REGISTER
                    </Link>
                    <Route
                      path="/users/register"
                      render={() => (
                        <RegisterForm
                          handleRegister={this.handleRegister}
                          isClicked={this.state.isClicked}
                        />
                      )}
                    />
                    <Link className="register" to="/users/login">
                      LOGIN
                    </Link>
                    <Route
                      path="/users/login"
                      render={() => (
                        <LoginForm
                          isClicked={this.state.isClicked}
                          handleLogin={this.handleLogin}
                        />
                      )}
                    />
                  </div>
                </div>
              )}
            </>
          )}
          {this.state.currentUser && (
            <button onClick={() => this.handleLogout()}>Logout</button>
          )}
        </div>
        {this.state.currentUser && <h1> {this.state.currentUser.username}</h1>}
        <div>
          <Route path="/league" render={() => <League />} />
          <Route path="/forest" render={() => <Forest />} />
          <Route path="/start" render={() => <StartGame />} />

          <Route path="/pokemons/pokedex" render={() => <Pokedex />} />
          <Route path="/trainer" render={() => <Trainer />} />
          <Route path="/pokecenter" render={() => <Pokecenter />} />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
