import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProfile.css';
import './../PatientTracker.css';
import PillButton from '../ui_components/PillButton';
import ShortTextField from '../ui_components/ShortTextField';
import doctorImage from './../resources/DoctorPlaceholder.jpg';
import patientImage from './../resources/SickPatientPlaceholder.png';

function AddProfile() {

	const [isDoctor, setIsDoctor] = useState(true);

	// Toggle between doctor and patient account creation
	const amDoctor = "I am a doctor";
	const amPatient = "I am a patient";
	const selectorOptions = [
		<option key="doctor" value={amDoctor}>{amDoctor}</option>,
		<option key="patient" value={amPatient}>{amPatient}</option>
	];

	const [_, setSelectorText] = useState(amDoctor);

	const handleSelectorChange = (event) => {
		setIsDoctor(!isDoctor);
		setSelectorText(event.target.value);
	};

	const navigate = useNavigate();

	const handleBackButtonClick = () => {
		navigate(-1);
	};

	const [ageText, setAgeText] = useState('-');

	const handleBirthdateChange = (event) => {
		const newText = event.target.value;
		if (newText.length != 10) {
			return;
		}
		try {
			const day = parseInt(newText.substring(0, 2));
			const month = parseInt(newText.substring(3, 5));
			const year = parseInt(newText.substring(6, 10));
			const age = getAge(new Date(year, month, day));
			setAgeText(age);
		} catch { }
	};

	const getAge = (birthdate) => {
		const today = new Date();
		const birthDate = new Date(birthdate);

		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDiff = today.getMonth() - birthDate.getMonth();

		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}

		return age;
	};

	return (
		<div className="signup">
			<div className="header-text header-background">
				Patient Tracker Web App
			</div>
			<div className="container">
				<div className="gray-shade"></div>
				<div>
					<div className="row-container small-padding">
						<PillButton
							className="pill-alignment medium-text right-margin"
							pixelWidth="100"
							pixelHeight="50"
							text="Back"
							onClick={handleBackButtonClick}
						/>
					</div>
					<div>
						<img
							src={isDoctor ? doctorImage : patientImage}
							alt="Doctor/Patient image"
							className="circle-border profile-image-size"
						/>
					</div>
					<select
						value={isDoctor ? amDoctor : amPatient}
						onChange={handleSelectorChange}
						className='large-text small-margin'
					>
						{selectorOptions}
					</select>
					<div className="signup-row-container">
						<div className="short-text-field">Username: </div>
						<div className="short-text-field">
							<ShortTextField />
						</div>
					</div>
					<div className="signup-row-container">
						<div className="short-text-field">Password: </div>
						<div className="short-text-field">
							<ShortTextField />
						</div>
					</div>
					<div className="signup-row-container">
						<div className="short-text-field">Retype Password: </div>
						<div className="short-text-field">
							<ShortTextField />
						</div>
					</div>
					<div className="signup-row-container">
						<div className="short-text-field">Name: </div>
						<div className="short-text-field">
							<ShortTextField />
						</div>
					</div>
					<div className="signup-row-container">
						<div className="short-text-field">Birth Date: </div>
						<div className="short-text-field">
							<ShortTextField
								placeholder="MM/DD/YYYY"
								onChange={handleBirthdateChange}
							/>
						</div>
					</div>
					<div className="signup-row-container">
						<div className="short-text-field">Age: {ageText}</div>
					</div>
					<div className="signup-row-container">
						<div className="short-text-field">SSN: </div>
						<div className="short-text-field">
							<ShortTextField
								placeholder="012-34-5678"
							/>
						</div>
					</div>
					<div className="signup-row-container">
						<div className="short-text-field">Sex: </div>
						<div className="short-text-field">
							<ShortTextField />
						</div>
					</div>
					<div className="signup-row-container">
						<div className="short-text-field">Address: </div>
						<div className="short-text-field">
							<ShortTextField
								className="address-width"
								placeholder="1 Main Street, Amherst MA, 01234"
							/>
						</div>
					</div>

					<div className="create-profile-button">
						<PillButton
							className="medium-text"
							text="Create Profile"
							pixelHeight="50"
							pixelWidth="200"
							link={isDoctor ? "/doctor-home" : "/patient-home"}
						/>
					</div>
					<div style={{ height: '100px' }}></div>
				</div>
				<div className="gray-shade"></div>
			</div>

		</div>
	);
}

export default AddProfile;
