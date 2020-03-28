import React from "react";

const HealthBar = props => {
  return (
    <div
      className={props.percentage <= 40 ? "danger" : "healthbar"}
      style={{ width: `${props.percentage}%` }}
    />
  );
};

export default HealthBar;
