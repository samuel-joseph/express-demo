import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";

class Forest extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {};

  render() {
    return (
      <div>
        <div>
          <img src="https://i.pinimg.com/originals/2a/a2/0b/2aa20b2129a6b56fd02eb2d794a1a689.png" />
          <h4>Route 1-35</h4>
        </div>
        <div>
          <img src="https://i.pinimg.com/originals/2a/a2/0b/2aa20b2129a6b56fd02eb2d794a1a689.png" />
          <h4>Route 36-75</h4>
        </div>
        <div>
          <img src="https://i.pinimg.com/originals/2a/a2/0b/2aa20b2129a6b56fd02eb2d794a1a689.png" />
          <h4>Route 76-100</h4>
        </div>
      </div>
    );
  }
}

export default withRouter(Forest);
