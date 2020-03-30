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

import { IoMdLogOut } from "react-icons/fa";

import Forest from "./components/Forest";
import Pokedex from "./components/Pokedex";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import StartGame from "./components/StartGame";
import Trainer from "./components/Trainer";
import Pokecenter from "./components/Pokecenter";
import League from "./components/League";
import Menu from "./components/Menu";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trainername: null,
      id: null,
      currentUser: null,
      formData: {
        username: null,
        password: null
      },
      pokemons: null,
      isClicked: false,
      instruction: null
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
      currentUser,
      trainername: currentUser.username
    });

    this.props.history.push("/start");
  };

  handleLogin = async (e, loginData) => {
    e.preventDefault();
    const currentUser = await loginUser(loginData);
    const id = currentUser.id;
    const trainername = currentUser.username;
    this.setState({ currentUser, trainername, id });
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
    this.props.history.push("/");
  };

  handleMenu = () => {
    this.props.history.push("/menu");
  };

  turnOn = () => {
    this.setState({ isClicked: true });
  };

  saySomething = instruction => {
    this.setState({ instruction });
  };

  render() {
    return (
      <div className="App">
        <div>
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
          {this.state.currentUser && (
            <div className="header">
              <img
                className="home"
                src="https://www.nicepng.com/png/detail/15-158271_pokeball-icon.png"
                onClick={() => this.handleMenu()}
              />
              <p className="title">POKEMON LEAGUE</p>
              <img
                className="logout"
                src="https://cdn2.iconfinder.com/data/icons/e-commerce-line-10-1/1024/logout10-512.png"
                onClick={() => this.handleLogout()}
              />
            </div>
          )}
        </div>

        <div className="main">
          <Route
            path="/league"
            render={() => <League saySomething={e => this.saySomething(e)} />}
          />
          <Route
            path="/forest"
            render={() => <Forest saySomething={e => this.saySomething(e)} />}
          />
          <Route
            path="/start"
            render={() => (
              <StartGame
                saySomething={e => this.saySomething(e)}
                instruction={this.state.instruction}
              />
            )}
          />
          <Route
            path="/menu"
            render={() => <Menu saySomething={e => this.saySomething(e)} />}
          />
          <Route path="/pokemons/pokedex" render={() => <Pokedex />} />
          <Route
            path="/trainer"
            render={() => (
              <Trainer
                trainername={this.state.trainername}
                saySomething={e => this.saySomething(e)}
              />
            )}
          />
          <Route path="/pokecenter" render={() => <Pokecenter />} />
        </div>
        <>
          {this.state.currentUser && (
            <>
              {this.state.instruction && (
                <div className="footer">
                  <p>{this.state.instruction}</p>
                </div>
              )}
            </>
          )}
        </>
      </div>
    );
  }
}

export default withRouter(App);
