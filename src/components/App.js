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
	  startCountdown,
	  handleReset
	} = props;

	const timerType = () => isSession ? "Session" : "Break";
	const timerLength = () => isSession ? sessionLength : breakLength;

	return (
      <div className="dial-container">
        <h2 id="timer-label">{timerType()}</h2>
        <div className="dial">
          <div class="spinner pie" id="spinner"></div>
          <div class="filler pie" id="filler"></div>
          <div class="mask" id="mask"></div>
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
              id="start_stop" 
              src={timerIsRunning ? pause : play}
              onClick={timerIsRunning? pauseTime : startCountdown} 
            />
          </div>
        </div>
        <div className="time-control-container">
          <TimeAdjuster id="session-adjuster"
            time={sessionLength > 9 ? sessionLength : "0" + sessionLength}
            addTime={addSessionTime}
            subtractTime={subtractSessionTime}
            label="Session"
            counterLabel="session-length"
            labelId="session-label"
            upId="session-increment"
            downId="session-decrement"
          />
          <p className="reset-button" id="reset" onClick={props.handleReset}>
          Reset
          </p>
          <TimeAdjuster id="break-adjuster"
            time={breakLength > 9 ? breakLength : "0" + breakLength}
            addTime={addBreakTime}
            subtractTime={subtractBreakTime}
            label="Break"
            counterLabel="breal-length"
            labelId="break-label"
            upId="break-increment"
            downId="break-decrement"
          />
        </div>
      </div>
	);
}

const TimeAdjuster = (props) => {
    const { addTime, subtractTime, label, labelId, upId, downId, time, counterLabel } = props;

	return(
      <div className="time-adjuster-container">
        <p className="label" id={labelId}>{label}</p>
        <div className="counter-and-arrow-container">
          <h3 className="counter" id={counterLabel}>
            {time}
          </h3>
          <div className="arrow-container">
            <img
              className="arrow up-arrow" 
              id={upId}
              src={upArrow} 
              onClick= {addTime} 
            />
            <img 
              className="arrow down-arrow" 
              id={downId}
              src={downArrow} 
              onClick={subtractTime} 
            />
          </div>
        </div>
      </div>
	)
}

const TimeRemainingDisplay = (props) => {
	const { minutes, seconds } = props;
	
	return (
      <div className="time-remaining-container">
        <p className="time-remaining" id="time-left">
          {minutes}:{seconds}
        </p>
        <audio className="beep" id="beep" src="../src/sounds/alarm.mp3"/>
      </div>
	)
}

const Footer = (props) => {
    return (
      <div className="footer-container">
      	<p className="footer-text">
      	  Click here for more information on the
      	  <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="_blank">
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
			minutes: "25",
			seconds: "00",
			timerIsRunning: false,
			timeIsAlmostUp: false,
			isSession: true,
			plays: 0
		}

		this.secondsRemaining;
		this.intervalHandle;
		this.timeoutHandle;

		this.addSessionTime = this.addSessionTime.bind(this);
		this.addBreakTime = this.addBreakTime.bind(this);
		this.subtractSessionTime = this.subtractSessionTime.bind(this);
		this.subtractBreakTime = this.subtractBreakTime.bind(this);
		this.startTime = this.startTime.bind(this);
		this.pauseTime = this.pauseTime.bind(this);
		this.startCountdown = this.startCountdown.bind(this);
		this.tick = this.tick.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.ani = this.ani.bind(this);
    }

  addSessionTime() {
  	let { sessionLength, timerIsRunning, isSession } = this.state;
  	if (!timerIsRunning) {
      if (sessionLength < 60) {
      this.setState({
        sessionLength: ++sessionLength,
        minutes: this.state.isSession ? ++this.state.minutes : this.state.minutes
      })
        if (isSession) {
          let time = this.state.minutes;
          this.secondsRemaining = (time * 60) + Number(this.state.seconds);
          console.log(time + " " + this.secondsRemaining + " " + this.state.seconds);
          filler.style.setProperty('--time', this.secondsRemaining + 's');
  	      spinner.style.setProperty('--time', this.secondsRemaining + 's');
  	      mask.style.setProperty('--time', this.secondsRemaining + 's');
  	    }
      }
    } 
  }

  addBreakTime() {
  	let { breakLength, timerIsRunning, isSession } = this.state;
  	if (!timerIsRunning) {
  	  if(breakLength < 60) {
  	    this.setState({
  	      breakLength: ++breakLength,
  	      minutes: this.state.isSession ? this.state.minutes : ++this.state.minutes
  	     })
  	    if (!isSession) {
          let time = this.state.minutes;
          this.secondsRemaining = time * 60 + Number(this.state.seconds);
          filler.style.setProperty('--time', this.secondsRemaining + 's');
  	      spinner.style.setProperty('--time', this.secondsRemaining + 's');
  	      mask.style.setProperty('--time', this.secondsRemaining + 's');
  	    }
  	  }    
    }
  }

  subtractSessionTime() {
  	let { sessionLength, timerIsRunning, isSession } = this.state;
  	if (!timerIsRunning) {
  	  if (sessionLength > 1) {
  	    this.setState({
        sessionLength: --sessionLength,
        minutes: this.state.isSession ? --this.state.minutes : this.state.minutes
      })
  	    if (isSession){
          let time = this.state.minutes;
          this.secondsRemaining = time * 60 + Number(this.state.seconds);
          filler.style.setProperty('--time', this.secondsRemaining + 's');
  	      spinner.style.setProperty('--time', this.secondsRemaining + 's');
  	      mask.style.setProperty('--time', this.secondsRemaining + 's');
  	    }
  	  } 
    }
  }

  subtractBreakTime() {
  	let { breakLength, timerIsRunning, isSession } = this.state;
  	if (!timerIsRunning) {
  	  if (breakLength > 1) {
  	    this.setState({
        breakLength: --breakLength,
        minutes: this.state.isSession ? this.state.minutes : --this.state.minutes
      })
  	    if (!isSession){
          let time = this.state.minutes;
          this.secondsRemaining = time * 60 + Number(this.state.seconds);
          filler.style.setProperty('--time', this.secondsRemaining + 's');
  	      spinner.style.setProperty('--time', this.secondsRemaining + 's');
  	      mask.style.setProperty('--time', this.secondsRemaining + 's');
  	    }  	    
  	  }
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
  	clearTimeout(this.timeoutHandle);
  	document.getElementById("filler").classList.add('paused');
  	document.getElementById("spinner").classList.add('paused');
  	document.getElementById("mask").classList.add('paused');
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
  			seconds: "0" + sec
  		})
  	}

  	if (min < 10) {
  		this.setState({
  			minutes: "0" + min
  		})
  	}

  	if (min < 0) {
  	  clearInterval(this.intervalHandle);
      document.getElementById("filler").className = 'pie filler paused';
  	  document.getElementById("spinner").className ='pie spinner paused';
  	  document.getElementById("mask").className ='mask paused';
  	  if (isSession) {
  	    this.setState({
  		  isSession: false,
  		  minutes: this.state.breakLength,
  		  seconds: "00",
  		  plays: 0
  	  })
  	  } else {
  	    this.setState({
  	      isSession: true,
  	      minutes: this.state.sessionLength,
  	      seconds: "00",
  	      plays: 0
  	    })
  	  }
  	  document.getElementById("beep").play();
  	  this.startCountdown();
  	}
  	this.secondsRemaining--
  }

  startCountdown() {
  	const filler = document.getElementById("filler");
  	const spinner = document.getElementById("spinner");
  	const mask = document.getElementById("mask");
  	this.setState({
    	timerIsRunning: true,
    	plays: ++this.state.plays
    });
    this.intervalHandle = setInterval(this.tick, 1000);
    let time = this.state.minutes;
    this.secondsRemaining = time * 60 + Number(this.state.seconds);
    if (this.state.plays === 1) {
      filler.style.setProperty('--time', this.secondsRemaining + 1 + 's');
  	  spinner.style.setProperty('--time', this.secondsRemaining + 1 + 's');
  	  mask.style.setProperty('--time', this.secondsRemaining + 1 + 's');
  	  this.timeoutHandle = setTimeout(this.ani, 1500);
  	} else {
      this.timeoutHandle = setTimeout(this.ani, 1500);
    }
  }

  ani() {
  	const filler = document.getElementById("filler");
  	const spinner = document.getElementById("spinner");
  	const mask = document.getElementById("mask");
    filler.className = 'pie filler filler-ani';
  	spinner.className ='pie spinner spinner-ani';
  	mask.className ='mask mask-ani';
  	
  	  
  }


  handleReset() {
  	clearInterval(this.intervalHandle);
    this.setState({
			sessionLength: 25,
			breakLength: 5,
			minutes: "25",
			seconds: "00",
			timerIsRunning: false,
			timeIsAlmostUp: false,
			isSession: true,
			plays: 0
		});
    document.getElementById("filler").className = 'pie filler';
  	document.getElementById("spinner").className ='pie spinner';
  	document.getElementById("mask").className ='mask';
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
		  startCountdown,
		  handleReset
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
			    handleReset={handleReset}
			   />
			   <TimeRemainingDisplay minutes={minutes} seconds={seconds} />
			  <Footer />
			</div>
		)
	}
}

export default App;