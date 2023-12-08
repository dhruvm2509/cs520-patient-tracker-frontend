import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import './../PatientTracker.css';
import PillButton from '../ui_components/PillButton';
import ShortTextField from '../ui_components/ShortTextField';
import logo from './../resources/PatientTrackerLogo.png';
import PatientTrackerController from '../controller/PatientTrackerController';
import PatientTrackerModel from '../model/PatientTrackerModel';
import { useUser } from './../model/UserContext';

function Login() {

	// MVC model and controller
	const model = new PatientTrackerModel();
	const controller = new PatientTrackerController(model);

	// User session between webpages
	const { login } = useUser();

	// Username
	const [invalidInput, setInvalidInput] = useState(false);
	const [username, setUsername] = useState('');
	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	// Password
	const [password, setPassword] = useState('');
	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const navigate = useNavigate();

	const handleInfoSubmit = async (event) => {

		let response = null;
		try {
			if (username === '') {
				setInvalidInput(true);
				return;
			}
			response = await controller.getUser(username);
			if (response === null || !response.ok) {
				setInvalidInput(true);
			}
		} catch (error) {
			console.error('Error checking user:', error);
		}

		if (response === null) {
			setInvalidInput(true);
			return;
		}

		const jsonResponse = await response.json();

		if (jsonResponse.password === password) {
			if (jsonResponse.doctorPatient === 0) {
				login({ usernameId: username });
				navigate('/doctor-home');
			} else {
				navigate('/');
			}
		} else {
			setInvalidInput(true);
		}


	};

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
							onChange={handleUsernameChange}
						/>
					</div>
					<div className="short-text-field">
						<ShortTextField
							placeholder="Password"
							outerText="Password:"
							isPassword="true"
							onChange={handlePasswordChange}
						/>
					</div>
					{invalidInput &&
						<div className="red-text">Invalid username or password</div>
					}
					<div className="login-button">
						<PillButton
							className="medium-text"
							text="Log In"
							pixelHeight="50"
							pixelWidth="200"
							onClick={handleInfoSubmit}
						/>

					</div>

					<div className="text-link">
						<Link to='/signup'><u>Sign Up</u></Link>
					</div>
				</div>
				<div className="gray-shade"></div>
			</div>

		</div>
	);
}

export default Login;
