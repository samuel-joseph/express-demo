import React, { Component } from "react";

export default class RegisterForm extends Component {
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
        {this.props.errorText && <p>{this.props.errorText}</p>}
        <form onSubmit={e => this.props.handleRegister(e, this.state)}>
          <label htmlFor="name">TRAINERNAME</label>
          <input
            type="text"
            name="username"
            className="label"
            value={this.state.username}
            onChange={this.handleChange}
          />

          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            name="password"
            className="label"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button className="submit">SUBMIT</button>
        </form>
      </div>
    );
  }
}
