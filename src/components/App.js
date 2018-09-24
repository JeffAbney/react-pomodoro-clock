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
			<div>
			  <Header />
			  <Dial state={state}/>
			  <Footer />
			</div>
		)
	}
}

export default App;