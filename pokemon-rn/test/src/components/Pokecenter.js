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
      },
      isClicked: false
    };
  }

  componentDidMount = async () => {
    const user = await trainerPokemon();
    const current_health = user[0].current_health;
    this.setState({ user, formData: { current_health } });
  };

  fullHealth = current_health => {
    this.setState({ formData: { ...this.state.formData, current_health } });
  };

  heal = async () => {
    const user = this.state.user;
    const id = this.state.user.id;
    const formData = this.state.formData;

    for (let i = 0; i < user.length; i++) {
      const id = user[i].id;
      const fullHp = user[i].health;
      const current_health = fullHp;
      console.log(current_health);

      this.fullHealth(current_health);
      console.log(formData);
      const regainHp = await update(id, formData);
      this.setState({ isClicked: true });
    }
  };

  isHealed = async () => {
    const user = this.state.user;
    const formData = this.state.formData;
    console.log(this.state.formData);
    for (let i = 0; i < user.length; i++) {
      const id = this.state.user[i].id;
      console.log(id);
      const regainHp = await update(id, formData);
    }
    this.props.history.push("/start");
  };

  render() {
    return (
      <div>
        {this.state.user && <>{console.log(this.state.formData)}</>}
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
        {this.state.isClicked && (
          <button onClick={() => this.isHealed()}>OK</button>
        )}
      </div>
    );
  }
}

export default withRouter(Pokecenter);
