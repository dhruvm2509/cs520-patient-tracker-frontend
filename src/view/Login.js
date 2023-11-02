import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import './../PatientTracker.css';
import PillButton from '../ui_components/PillButton';
import ShortTextField from '../ui_components/ShortTextField';
import logo from './../resources/PatientTrackerLogo.png';

function Login() {

	return (
		<div className="login">
			<div className="header-text header-background">
				Patient Tracker Web App
			</div>
			<div className="container">
				<div className="gray-shade"></div>
				<div>
					<div>
						<img src={logo} alt="Patient Tracker logo" className="logo" />
					</div>
					<div className="short-text-field">
						<ShortTextField
							placeholder="Username"
							outerText="Username:"
						/>
					</div>
					<div className="short-text-field">
						<ShortTextField
							placeholder="Password"
							outerText="Password:"
							isPassword="true"
						/>
					</div>

					<div className="text-link">
						<Link to='/'><u>Forgot Password?</u></Link>
					</div>

					<div className="login-button">
						<PillButton
							className="medium-text"
							text="Log In"
							pixelHeight="50"
							pixelWidth="200"
							link="/doctor-home"
						/>

					</div>

					<div className="text-link">
						<Link to='/'><u>Sign Up</u></Link>
					</div>
				</div>
				<div className="gray-shade"></div>
			</div>

		</div>
	);
}

export default Login;
