import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import PillButton from './ui_components/PillButton';
import ShortTextField from './ui_components/ShortTextField';
import logo from './resources/PatientTrackerLogo.png';

function Login() {

	const handleClick = () => {
		console.log("Clicky");
	};

	return (
		<div className="login">
			<div className="header">
				Patient Tracker Web App
			</div>
			<div className="container">
				<div className="shade"></div>
				<div>
					<div>
						<img src={logo} alt="Patient Tracker logo" class="logo" />
					</div>
					<div className="username">
						<ShortTextField
							className="username"
							placeholder="Username"
							outerText="Username:"
						/>
					</div>
					<div className="password">
						<ShortTextField
							className="password"
							placeholder="Password"
							outerText="Password:"
							isPassword="true"
						/>
					</div>

					<div className="forgot-password">
						<Link to='/'><u>Forgot Password?</u></Link>
					</div>

					<div className="login-button">
						<Link to="/doctor-home">
							<PillButton
								text="Log In"
								fontSize="22"
								pixelHeight="50"
								pixelWidth="200"
								href="/test1"
								onClick={handleClick}
							/>
						</Link>

					</div>

					<div className="sign-up">
						<Link to='/'><u>Sign Up</u></Link>
					</div>
				</div>
				<div className="shade"></div>
			</div>

		</div>
	);
}

export default Login;
