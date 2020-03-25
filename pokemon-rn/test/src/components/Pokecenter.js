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
    console.log(user);
  };

  heal = async () => {
    const user = this.state.user;

    for (let i = 0; i < user.length; i++) {
      let id = user[i].id;
      let fullHp = user[i].health;
      let passData = {
        current_health: fullHp
      };
      const regainHp = await update(id, passData);
      this.setState({ isClicked: true });
      this.props.history.push("/start");
    }
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
      </div>
    );
  }
}

export default withRouter(Pokecenter);
