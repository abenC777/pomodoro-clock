import React, { Component } from "react";

export default class Timer extends Component {
  render() {
    const { timeLeft, onStart, onReset, breakTime } = this.props;
    const timerLabel = breakTime ? "Break" : "Session";
    const timerStyle = breakTime ? { color: "red" } : { color: "white" };
    return (
      <>
        <div className="timer" style={timerStyle}>
          <h2 id="timer-label">{timerLabel}</h2>
          <span id="time-left" className="time-left">
            {timeLeft}
          </span>
        </div>
        <div className="timer-controls">
          <div id="start_stop" onClick={onStart}>
            <i className="fas fa-play"></i>
            <i className="fas fa-pause"></i>
          </div>
          <div id="reset" onClick={onReset}>
            <i className="fas fa-sync-alt"></i>
          </div>
        </div>
      </>
    );
  }
}
