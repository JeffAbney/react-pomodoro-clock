import React, { Component } from "react";
import '../styles/App.css';
import play from '../images/play.png';
import pause from '../images/pause.png';
import upArrow from '../images/upArrow.png';
import downArrow from '../images/downArrow.png';

const Header = (props) => {
    return (
      <div className="header-container">
        <h1>Pomodoro Clock</h1>
      </div>
    );
}

const Dial = (props) => {
	const { 
	  sessionLength,
	  breakLength, 
	  timeRemaining, 
	  timerIsRunning, 
	  timeIsAlmostUp, 
	  isSession 
	} = props.state;

	const { 
	  addSessionTime,
	  addBreakTime,
	  subtractSessionTime,
	  subtractBreakTime
	} = props;

	return (
      <div className="dial-container">
        <h2>{isSession ? "Session" : "Break"}</h2>
        <div className="dial">
          <div className="dial-number" id="full-time">
            {Math.round(sessionLength)}:00
          </div>
          <div className="dial-number" id="quarter-time">
            {Math.trunc(sessionLength/4)}
            :
            {
              sessionLength%4 === 0 ?
              "00"
              :
              sessionLength%4/4*60
            }
          </div>
          <div className="dial-number" id="half-time">
            {Math.trunc(sessionLength/2)}
            :
              {sessionLength%2 === 0 ?
            	"00"
              :
                "30"}
          </div>
          <div className="dial-number" id="three-quarter-time">
            {Math.trunc(sessionLength*0.75)}
            :
            {
              sessionLength%4 === 0 ?
              "00"
              :
              Math.trunc(sessionLength%(4/3)*60*3/4)
            }
          </div>
          <div className="dial-button-container play-button-container">
            <img
              className="dial-button play-button" 
              src={timerIsRunning ? pause : play} 
            />
          </div>
        </div>
        <div className="time-control-container">
          <TimeAdjuster id="session-adjuster"
            time={sessionLength}
            addTime={addSessionTime}
            subtractTime={subtractSessionTime}
          />
          <p className="reset-button">
          Reset
          </p>
          <TimeAdjuster id="break-adjuster"
            time={breakLength}
            addTime={addBreakTime}
            subtractTime={subtractBreakTime}
          />
        </div>
      </div>
	);
}

const TimeAdjuster = (props) => {
    const { addTime, subtractTime } = props;

	return(
      <div className="time-adjuster-container">
        <h3 className="counter">
          {props.time}
        </h3>
        <div className="arrow-container">
          <img
            className="arrow up-arrow" 
            src={upArrow} 
            onClick= {addTime} 
          />
          <img 
            className="arrow down-arrow" 
            src={downArrow} 
            onClick={subtractTime} 
          />
        </div>
      </div>
	)
}

const TimeRemaining = (props) => {
	const { timeRemaining } = props.state;
	return (
      <div className="time-remaining-container">
      <p className="time-remaining">
        {
          timeRemaining === "" ?
            ""
          :
            "Time left " + timeRemaining
        }
      </p>
      </div>
	)
}

const Footer = (props) => {
    return (
      <div className="footer-container">
      	<p className="footer-text">
      	  Click here for more information on the
      	  <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique">
      	  Pomodoro Technique
      	  </a>
      	</p>
      </div>
    );
}

/* -------------------------- Main App -------------------------- */
class App extends Component {
	constructor (props) {
		super(props);

		this.state = {
			sessionLength: 25,
			breakLength: 5,
			timeRemaining: "",
			timerIsRunning: false,
			timeIsAlmostUp: false,
			isSession: true
		};

		this.addSessionTime = this.addSessionTime.bind(this);
		this.addBreakTime = this.addBreakTime.bind(this);
		this.subtractSessionTime = this.subtractSessionTime.bind(this);
		this.subtractBreakTime = this.subtractBreakTime.bind(this);
    }

  addSessionTime(){
  	let { sessionLength } = this.state;
    sessionLength < 60 ?
      this.setState({
        sessionLength: ++sessionLength
      })
    :
    alert("Session cannot be set to more than 60")
  }

  addBreakTime(){
  	let { breakLength } = this.state;
  	breakLength < 60 ?
  	  this.setState({
  	    breakLength: ++breakLength
  	  })
  	:
  	alert("Break cannot be set to more than 60")
  }

  subtractSessionTime(){
  	let { sessionLength } = this.state;
  	sessionLength > 1 ?
  	  this.setState({
  	  	sessionLength: --sessionLength
  	  })
  	:
  	alert("Session cannot be set to less than 1")
  }

  subtractBreakTime(){
  	let { breakLength } = this.state;
  	breakLength > 1 ?
  	  this.setState({
  	  	breakLength: --breakLength
  	  })
  	:
  	alert("Break cannot be set to less than 1")
  }

	render() {
		const { 
		  state,
		  addSessionTime,
		  addBreakTime,
		  subtractSessionTime,
		  subtractBreakTime
		} = this;

		return (
			<div className="app">
			  <Header />
			  <Dial
			    state={state} 
			    addSessionTime={addSessionTime}
			    addBreakTime={addBreakTime}
			    subtractSessionTime={subtractSessionTime}
			    subtractBreakTime={subtractBreakTime}
			   />
			   <TimeRemaining state={state} />
			  <Footer />
			</div>
		)
	}
}

export default App;