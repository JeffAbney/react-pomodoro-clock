import React, { Component } from "react";
import '../styles/App.css';


const Header = (props) => {
    return (
      <div className="header-container">
        <h1>Pomodoro Clock</h1>
      </div>
    );
}

const Dial = (props) => {
	const { sessionLength,
	        breakLength, 
	        timeRemaining, 
	        timerIsRunning, 
	        timeIsAlmostUp, 
	        isSession } 
	        = props.state;

	return (
      <div className="dial-container">
        <h2>{isSession ? "Session" : "Break"}</h2>
        <div className="dial">
          <div className="dial-number" id="full-time">
            {Math.round(sessionLength)}:00
          </div>
          <div className="dial-number" id="quarter-time">
            {Math.trunc(sessionLength/4)}:{sessionLength%4/4*60}
          </div>
          <div className="dial-number" id="half-time">
            {Math.trunc(sessionLength/2)}:
              {sessionLength%2 === 0 ?
            	"00"
              :
                "30"}
          </div>
          <div className="dial-number" id="three-quarter-time">
            {Math.trunc(sessionLength*0.75)}:{Math.trunc(sessionLength%(4/3)*60*3/4)}
          </div>
        </div>
      </div>
	);
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
	}

	render() {
		const { state } = this;
		return (
			<div className="app">
			  <Header />
			  <Dial state={state}/>
			  <Footer />
			</div>
		)
	}
}

export default App;