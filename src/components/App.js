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
	  minutes,
	  seconds, 
	  timerIsRunning, 
	  timeIsAlmostUp, 
	  isSession 
	} = props.state;

	const { 
	  addSessionTime,
	  addBreakTime,
	  subtractSessionTime,
	  subtractBreakTime,
	  startTime,
	  pauseTime,
	  startCountdown
	} = props;

	const timerType = () => isSession ? "Session" : "Break";
	const timerLength = () => isSession ? sessionLength : breakLength;

	return (
      <div className="dial-container">
        <h2>{timerType()}</h2>
        <div className="dial">
          <div className="dial-number" id="full-time">
            {Math.round(timerLength())}:00
          </div>
          <div className="dial-number" id="quarter-time">
            {Math.trunc(timerLength()/4)}
            :
            {
              timerLength()%4 === 0 ?
              "00"
              :
              timerLength()%4/4*60
            }
          </div>
          <div className="dial-number" id="half-time">
            {Math.trunc(timerLength()/2)}
            :
              {timerLength()%2 === 0 ?
            	"00"
              :
                "30"}
          </div>
          <div className="dial-number" id="three-quarter-time">
            {Math.trunc(timerLength()*0.75)}
            :
            {
              timerLength()%4 === 0 ?
              "00"
              :
              Math.trunc(timerLength()%(4/3)*60*3/4)
            }
          </div>
          <div className="dial-button-container play-button-container">
            <img
              className="dial-button play-button" 
              src={timerIsRunning ? pause : play}
              onClick={timerIsRunning? pauseTime : startCountdown} 
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

const TimeRemainingDisplay = (props) => {
	const { minutes, seconds } = props;
	
	return (
      <div className="time-remaining-container">
      <p className="time-remaining">
        {minutes}:{seconds}
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
			sessionLength: 1,
			breakLength: 2,
			minutes: "01",
			seconds: "00",
			timerIsRunning: false,
			timeIsAlmostUp: false,
			isSession: true
		}

		this.secondsRemaining;
		this.intervalHandle;

		this.addSessionTime = this.addSessionTime.bind(this);
		this.addBreakTime = this.addBreakTime.bind(this);
		this.subtractSessionTime = this.subtractSessionTime.bind(this);
		this.subtractBreakTime = this.subtractBreakTime.bind(this);
		this.startTime = this.startTime.bind(this);
		this.pauseTime = this.pauseTime.bind(this);
		this.startCountdown = this.startCountdown.bind(this);
		this.tick = this.tick.bind(this);
    }

  addSessionTime() {
  	let { sessionLength, timerIsRunning } = this.state;
  	if (!timerIsRunning) {
      if (sessionLength < 60) {
      this.setState({
        sessionLength: ++sessionLength,
        minutes: this.state.isSession ? ++this.state.minutes : this.state.minutes
      })
      } else {
        alert("Session cannot be set to more than 60")
      }
    } else {
    	alert("Cannot change time while clock is running")
    }
  }

  addBreakTime() {
  	let { breakLength, timerIsRunning } = this.state;
  	if (!timerIsRunning) {
  	  if(breakLength < 60) {
  	    this.setState({
  	      breakLength: ++breakLength,
  	      minutes: this.state.isSession ? this.state.minutes : ++this.state.minutes
  	     })
  	  } else {
  	  alert("Break cannot be set to more than 60")
  	  }
    } else {
    	alert("Cannot change time while clock is running")
    }
  }

  subtractSessionTime() {
  	let { sessionLength, timerIsRunning } = this.state;
  	if (!timerIsRunning) {
  	  if (sessionLength > 1) {
  	    this.setState({
        sessionLength: --sessionLength,
        minutes: this.state.isSession ? --this.state.minutes : this.state.minutes
      })
  	  } else {
  	  alert("Session cannot be set to less than 1")
      } 
    } else {
    	alert("Cannot change time while clock is running")
    }
  }

  subtractBreakTime() {
  	let { breakLength, timerIsRunning } = this.state;
  	if (!timerIsRunning) {
  	  if (breakLength > 1) {
  	    this.setState({
        breakLength: --breakLength,
        minutes: this.state.isSession ? this.state.minutes : --this.state.minutes
      })
  	  } else {
  	  alert("Session cannot be set to less than 1")
      } 
    } else {
    	alert("Cannot change time while clock is running")
    }
  }

  startTime() {
  	this.setState({
  	  timerIsRunning: !this.state.timerIsRunning
  	})
  	
  }

  pauseTime() {
  	this.setState({
  	  timerIsRunning: false
  	})
  	clearInterval(this.intervalHandle);
  }

  tick(){
  	let { isSession } = this.state;
  	var min = Math.floor(this.secondsRemaining / 60);
  	var sec = this.secondsRemaining - (min * 60);

  	this.setState({
  		minutes: min,
  		seconds: sec
  	})

  	if (sec < 10) {
  		this.setState({
  			seconds: "0" + this.state.seconds
  		})
  	}

  	if (min < 10) {
  		this.setState({
  			minutes: "0" + min
  		})
  	}

  	if (min < 0 && sec === 59) {

  		clearInterval(this.intervalHandle);
  		if (isSession) {
  		  this.setState({
  			isSession: false,
  			minutes: this.state.breakLength
  		  })
  	    } else {
  	      this.setState({
  	      	isSession: true,
  	      	minutes: this.state.sessionLength
  	      })
  	    }
  		this.startCountdown();
  	}

  	this.secondsRemaining--
  }

  startCountdown() {
  	this.setState({
    	timerIsRunning: true,
    })
    this.intervalHandle = setInterval(this.tick, 1000);
    let time = this.state.minutes;
    this.secondsRemaining = time * 60 + Number(this.state.seconds);
  }

	render() {
		const { 
		  state,
		  addSessionTime,
		  addBreakTime,
		  subtractSessionTime,
		  subtractBreakTime,
		  startTime,
		  pauseTime,
		  startCountdown
		} = this;

		const { minutes, seconds } = this.state;

		return (
			<div className="app">
			  <Header />
			  <Dial
			    state={state} 
			    addSessionTime={addSessionTime}
			    addBreakTime={addBreakTime}
			    subtractSessionTime={subtractSessionTime}
			    subtractBreakTime={subtractBreakTime}
			    startCountdown={startCountdown}
			    startTime={startTime}
			    pauseTime={pauseTime}
			   />
			   <TimeRemainingDisplay minutes={minutes} seconds={seconds} />
			  <Footer />
			</div>
		)
	}
}

export default App;