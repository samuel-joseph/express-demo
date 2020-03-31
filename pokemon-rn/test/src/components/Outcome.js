import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";

class Outcomes extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>CONGRATULATIONS {localStorage.getItem("name")}</h1>
        <p>
          You are the new <h2>CHAMPION</h2>
        </p>
        {this.props.pokemon &&
          this.props.pokemon.map(data => (
            <span>
              <img src={data.frontImage} />
            </span>
          ))}
      </div>
    );
  }
}

export default withRouter(Outcomes);
