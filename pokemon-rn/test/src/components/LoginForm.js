import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };


  render() {
    return (
      <div className="form">
        <form onSubmit={e => this.props.handleLogin(e, this.state)}>
          <label htmlFor="username">TRAINERNAME</label>
          <input
            className="label"
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            className="label"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button className="submit">SUBMIT</button>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
