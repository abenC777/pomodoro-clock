import React, { Component } from "react";
import Controls from "./Controls";
import Timer from "./Timer";
import sunflowers from "../img/sunflowers.jpg";
import "./Clock.css";

export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.audioBeep = React.createRef();
  }
  state = {
    started: false,
    timeLeft: "",
    prevTimerAvailable: "",
    session: 25,
    break: 5,
    onBreak: false,
  };

  playBeep = () => {
    this.audioBeep.currentTime = 0;
    this.audioBeep.play();
  };

  stopRewindBeep = () => {
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  };

  startSession = (duration) => {
    let timer = duration,
      minutes,
      seconds,
      myVar,
      myTimer,
      prevTimer;
    // setting up func to use on interval to mimic timer mechanism
    myTimer = () => {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      // if timer not started stop countdown, calculate time left on timer and save it on state for next toggle
      if (!this.state.started) {
        clearInterval(myVar);
        prevTimer = minutes * 60 + seconds;
        this.setState({ prevTimerAvailable: prevTimer });
      } else {
        // changes time left in state every second
        this.setState({ timeLeft: minutes + ":" + seconds });
      }

      // if timer reaches 0 the interval is stopped
      if (--timer < 0) {
        clearInterval(myVar);
        this.setState({ onBreak: true });
        this.playBeep();
        const Minutes = 60 * this.state.break;
        this.startBreak(Minutes);
      }
    };
    myVar = setInterval(myTimer, 1000);
  };

  startBreak = (duration) => {
    let timer = duration,
      minutes,
      seconds,
      myVarBreak,
      myTimerBreak,
      prevTimer;
    // setting up func to use on interval to mimic timer mechanism
    myTimerBreak = () => {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      // if timer not started stop countdown, calculate time left on timer and save it on state for next toggle
      if (!this.state.started) {
        clearInterval(myVarBreak);
        prevTimer = minutes * 60 + seconds;
        this.setState({ prevTimerAvailable: prevTimer });
      } else {
        // changes time left in state every second
        this.setState({ timeLeft: minutes + ":" + seconds });
      }

      // if timer reaches 0 the interval is stopped
      if (--timer < 0) {
        clearInterval(myVarBreak);
        this.setState({ onBreak: false });
        const Minutes = 60 * this.state.session;
        this.startSession(Minutes);
      }
    };
    myVarBreak = setInterval(myTimerBreak, 1000);
  };

  toggleTimer = () => {
    // if timer is not started and the time left is equal to the session we start the timer with the session value
    if (!this.state.onBreak) {
      if (!this.state.started) {
        if (this.state.timeLeft === this.state.session + ":00") {
          this.setState({ started: true });
          const Minutes = 60 * this.state.session - 1;

          this.startSession(Minutes);
        } else {
          // if time left on timer is not equal to the session value we use the prev timer value to continue the timer
          this.setState({ started: true });
          const Minutes = this.state.prevTimerAvailable;

          this.startSession(Minutes);
        }
      } else {
        // if timer is started we simply stop the interval chaning started state
        this.setState({ started: false });
      }
    } else {
      if (!this.state.started) {
        if (this.state.timeLeft === this.state.break + ":00") {
          this.setState({ started: true });
          const Minutes = 60 * this.state.session - 1;

          this.startBreak(Minutes);
        } else {
          // if time left on timer is not equal to the session value we use the prev timer value to continue the timer
          this.setState({ started: true });
          const Minutes = this.state.prevTimerAvailable;

          this.startBreak(Minutes);
        }
      } else {
        // if timer is started we simply stop the interval chaning started state
        this.setState({ started: false });
      }
    }
  };

  resetTimer = () => {
    this.stopRewindBeep();
    this.setState({
      timeLeft: `${this.state.session}:00`,
      started: false,
      session: 25,
      break: 5,
      onBreak: false,
    });
  };

  handleDecrement = (decrementLabel) => {
    if (!this.state.started) {
      if (decrementLabel === "break-decrement") {
        if (this.state.break > 1) {
          this.setState({ break: this.state.break - 1 });
        }
      } else {
        if (this.state.session > 1) {
          this.setState({
            session: this.state.session - 1,
            timeLeft: `${this.state.session}:00`,
          });
        }
      }
    }
  };

  handleIncrement = (incrementLabel) => {
    if (!this.state.started) {
      if (incrementLabel === "break-increment") {
        if (this.state.break < 60) {
          this.setState({ break: this.state.break + 1 });
        }
      } else {
        if (this.state.session < 60) {
          this.setState({
            session: this.state.session + 1,
            timeLeft: `${this.state.session}:00`,
          });
        }
      }
    }
  };

  componentDidMount = () => {
    this.setState({ timeLeft: `${this.state.session}:00` });
  };

  // so we change the value on timer on real time with the session control
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.session !== this.state.session) {
      this.setState({ timeLeft: `${this.state.session}:00` });
    }
  };

  render() {
    return (
      <div className="clock">
        <h1>Pomodoros Clock</h1>
        <div className="controls">
          <Controls
            control="Break Length"
            length={this.state.break}
            controlLabel="break-label"
            lengthLabel="break-length"
            decrementLabel="break-decrement"
            incrementLabel="break-increment"
            onDecrement={this.handleDecrement}
            onIncrement={this.handleIncrement}
          />
          <Controls
            control="Session Length"
            length={this.state.session}
            controlLabel="session-label"
            lengthLabel="session-length"
            decrementLabel="session-decrement"
            incrementLabel="session-increment"
            onDecrement={this.handleDecrement}
            onIncrement={this.handleIncrement}
          />
        </div>
        <Timer
          timeLeft={this.state.timeLeft}
          onStart={this.toggleTimer}
          onReset={this.resetTimer}
          breakTime={this.state.onBreak}
        />
        <audio
          id="beep"
          preload="metadata"
          ref={(audio) => {
            this.audioBeep = audio;
          }}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    );
  }
}
