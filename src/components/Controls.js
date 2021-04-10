import React, { Component } from "react";

export default class Controls extends Component {
  render() {
    const {
      length,
      control,
      controlLabel,
      lengthLabel,
      decrementLabel,
      incrementLabel,
      onDecrement,
      onIncrement,
    } = this.props;
    return (
      <div className="control">
        <h2 className="control-label" id={controlLabel}>
          {control}
        </h2>
        <span
          className="control-decrement arrow"
          id={decrementLabel}
          onClick={() => onDecrement(decrementLabel)}
        >
          <i className="fas fa-arrow-down"></i>
        </span>
        <span id={lengthLabel} className="control-length">
          {length}
        </span>
        <span
          className="control-increment arrow"
          id={incrementLabel}
          onClick={() => onIncrement(incrementLabel)}
        >
          <i className="fas fa-arrow-up"></i>
        </span>
      </div>
    );
  }
}
