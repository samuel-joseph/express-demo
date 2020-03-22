import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import { update, trainerPokemon } from "../services/api_helper";

class Pokecenter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      formData: {
        current_health: null
      }
    };
  }

  componentDidMount = async () => {
    const user = await trainerPokemon();
    console.log(user);
    this.setState({ user });
  };

  heal = async () => {
    const current_health = this.state.user.health;
    const id = this.state.user.id;
    const formData = this.state.formData;
    console.log(current_health);
    this.setState({ formData: { ...this.state.formData, current_health } });
    const regainHp = await update(id, formData);
  };

  render() {
    return (
      <div>
        <div>
          {this.state.user && (
            <>
              {this.state.user.map(data => (
                <div>
                  <img src={data.frontImage} />
                  <div>
                    {data.current_health}/{data.health}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <button onClick={() => this.heal()}>HEAL</button>
      </div>
    );
  }
}

export default withRouter(Pokecenter);
