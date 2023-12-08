import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProfile.css';
import './../PatientTracker.css';
import PillButton from '../ui_components/PillButton';
import ShortTextField from '../ui_components/ShortTextField';
import doctorImage from './../resources/DoctorPlaceholder.jpg';
import patientImage from './../resources/SickPatientPlaceholder.png';
import PatientTrackerController from '../controller/PatientTrackerController';
import PatientTrackerModel from '../model/PatientTrackerModel';

function AddProfile() {

	const model = new PatientTrackerModel();
	const controller = new PatientTrackerController(model);

	// Name
	const [name, setName] = useState('');
	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	// SSN
	const [ssn, setSsn] = useState('');
	const handleSsnChange = (event) => {
		setSsn(event.target.value);
	};

	// Gender
	const [gender, setGender] = useState('');
	const handleGenderChange = (event) => {
		setGender(event.target.value);
	};

	// Address 1
	const [address1, setAddress1] = useState('');
	const handleAddress1Change = (event) => {
		setAddress1(event.target.value);
	};

	// Address 2
	const [address2, setAddress2] = useState('');
	const handleAddress2Change = (event) => {
		setAddress2(event.target.value);
	};

	// City
	const [city, setCity] = useState('');
	const handleCityChange = (event) => {
		setCity(event.target.value);
	};

	// State
	const [state, setState] = useState('');
	const handlestateChange = (event) => {
		setState(event.target.value);
	};

	// Zip
	const [zip, setZip] = useState('');
	const handleZipChange = (event) => {
		setZip(event.target.value);
	};

	// Check if the username already exists,
	// passwords match, and input details are valid
	const [usernameExists, setUsernameExists] = useState(false);
	const handleCreateUser = async () => {
		let fetchUserExists = true;
		let invalidInfo = false;
		try {
			if (username === '') {
				setInvalidUsername(true);
				return;
			} else {
				setInvalidUsername(false);
			}
			fetchUserExists = await controller.checkUserExists(username);
			setUsernameExists(fetchUserExists);
		} catch (error) {
			console.error('Error checking user:', error);
		}
		if (!fetchUserExists) {

			// Validate birthday
			if (birthDate.length !== 10) {
				invalidInfo = true;
				setInvalidBirthdate(true);
			}
			let birthDateFormatted = birthDate;
			try {
				const day = parseInt(birthDate.substring(0, 2));
				const month = parseInt(birthDate.substring(3, 5));
				const year = parseInt(birthDate.substring(6, 10));
				birthDateFormatted = new Date(year, month, day).toISOString();
				setInvalidBirthdate(false);
			} catch {
				invalidInfo = true;
				setInvalidBirthdate(true);
			}

			// Validate SSN formatting
			let ssnFormatted = ssn;
			try {
				ssnFormatted = ssn.replace(/[^0-9]/g, '');
				if (ssnFormatted.toString().length !== 9) {
					invalidInfo = true;
					setInvalidSsn(true);
				} else {
					setInvalidSsn(false);
				}
			} catch {
				invalidInfo = true;
				setInvalidSsn(true);
			}

			// Validate passwords
			if (password1 !== password2) {
				invalidInfo = true;
				setPasswordsMatch(false);
			} else {
				setPasswordsMatch(true);
			}

			if (invalidInfo) {
				return;
			}

			const response = await controller.createUser(
				isDoctor,
				username,
				name,
				birthDateFormatted,
				password1,
				ssnFormatted,
				gender,
				address1,
				address2,
				city,
				state,
				zip,
				imageUrl
			);

			if (response.ok) {
				if (isDoctor) {
					navigate('/doctor-home');
				} else {
					navigate('/');
				}
			}



		}
	};

	// Input username
	const [username, setUsername] = useState('');
	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	// Check that passwords match
	const [passwordsMatch, setPasswordsMatch] = useState(true);
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');

	const handlePassword1Change = (event) => {
		setPassword1(event.target.value);
		setPasswordsMatch(event.target.value === password2);
	};
	const handlePassword2Change = (event) => {
		setPassword2(event.target.value);
		setPasswordsMatch(password1 === event.target.value);
	};

	// Invalid responses

	const [invalidBirthdate, setInvalidBirthdate] = useState(false);
	const [invalidSsn, setInvalidSsn] = useState(false);
	const [invalidUsername, setInvalidUsername] = useState(false);

	// Toggle for whether the user is a doctor
	const [isDoctor, setIsDoctor] = useState(true);

	const amDoctor = "I am a doctor";
	const amPatient = "I am a patient";
	const selectorOptions = [
		<option key="doctor" value={amDoctor}>{amDoctor}</option>,
		<option key="patient" value={amPatient}>{amPatient}</option>
	];

	const [, setSelectorText] = useState(amDoctor);

	const handleSelectorChange = (event) => {
		setIsDoctor(!isDoctor);
		setSelectorText(event.target.value);
	};

	// Naviation using the back button
	const navigate = useNavigate();

	const handleBackButtonClick = () => {
		navigate(-1);
	};

	// Set the image to the url text if it is valid
	const [imageLoaded, setImageLoaded] = useState(false);
	const [imageSource, setImageSource] = useState('');
	const [imageUrl, setImageUrl] = useState('');

	useEffect(() => {
		const fetchImage = async () => {
			try {
				const response = await fetch(imageUrl);
				if (!response.ok) {
					setImageLoaded(false);
					return;
				}
				const blob = await response.blob();
				if (blob.type === 'image/png' || blob.type === 'image/jpeg') {
					const imageSource = URL.createObjectURL(blob);
					setImageSource(imageSource);
					setImageLoaded(true);
				} else {
					setImageLoaded(false);
				}

			} catch {
				setImageLoaded(false);
			}
		};

		fetchImage();
	}, [imageUrl]);

	// Set the age of the user by their birthday
	const [ageText, setAgeText] = useState('-');
	const [birthDate, setBirthdate] = useState('');

	const handleBirthdateChange = (event) => {
		const newText = event.target.value;
		setBirthdate(newText);
		if (newText.length !== 10) {
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

					{/* Back button */}
					<div className="row-container small-padding">
						<PillButton
							className="pill-alignment medium-text right-margin"
							pixelWidth="100"
							pixelHeight="50"
							text="Back"
							onClick={handleBackButtonClick}
						/>
					</div>

					{/* Profile image */}
					<img
						src={imageLoaded ? imageSource : (isDoctor ? doctorImage : patientImage)}
						alt="Doctor/Patient"
						className="circle-border profile-image-size"
					/>

					{/* Profile url input */}
					<div className="center-items">
						<input
							type="text"
							placeholder="Image URL"
							className="xsmall-text row-container"
							onChange={(e) => setImageUrl(e.target.value)}
						/>
					</div>

					{/* Is doctor selector options */}
					<select
						value={isDoctor ? amDoctor : amPatient}
						onChange={handleSelectorChange}
						className='large-text small-margin'
					>
						{selectorOptions}
					</select>

					{/* Username */}
					<div className="signup-row-container">
						<div className="short-text-field">Username: </div>
						<div className="short-text-field">
							<ShortTextField
								onChange={handleUsernameChange}
							/>
						</div>
					</div>

					{/* Password and retype password */}
					<div id="first-password" className="signup-row-container">
						<div className="short-text-field">Password: </div>
						<div className="short-text-field">
							<ShortTextField
								onChange={handlePassword1Change}
								isPassword="true"
							/>
						</div>
					</div>
					<div id="first-password" className="signup-row-container">
						<div className="short-text-field">Retype Password: </div>
						<div className="short-text-field">
							<ShortTextField
								onChange={handlePassword2Change}
								isPassword="true"
							/>
						</div>
					</div>
					{!passwordsMatch &&
						<div className="signup-row-container">
							<div className="red-text">Passwords must match</div>
						</div>

					}

					{/* Name */}
					<div className="signup-row-container">
						<div className="short-text-field">Name: </div>
						<div className="short-text-field">
							<ShortTextField
								onChange={handleNameChange}
							/>
						</div>
					</div>

					{/* Birthdate */}
					<div className="signup-row-container">
						<div className="short-text-field">Birth Date: </div>
						<div className="short-text-field">
							<ShortTextField
								placeholder="MM/DD/YYYY"
								onChange={handleBirthdateChange}
							/>
						</div>
					</div>

					{/* Age */}
					<div className="signup-row-container">
						<div className="short-text-field">Age: {ageText}</div>
					</div>

					{/* SSN */}
					<div className="signup-row-container">
						<div className="short-text-field">SSN: </div>
						<div className="short-text-field">
							<ShortTextField
								onChange={handleSsnChange}
								placeholder="012-34-5678"
							/>
						</div>
					</div>

					{/* Gender */}
					<div className="signup-row-container">
						<div className="short-text-field">Gender: </div>
						<div className="short-text-field">
							<ShortTextField
								onChange={handleGenderChange}
							/>
						</div>
					</div>

					{/* Addresses */}
					<div className="signup-row-container">
						<div className="short-text-field">Address 1: </div>
						<div className="short-text-field">
							<ShortTextField
								onChange={handleAddress1Change}
								placeholder="1 Main Street"
							/>
						</div>
					</div>
					<div className="signup-row-container">
						<div className="short-text-field">Address 2 (Optional): </div>
						<div className="short-text-field">
							<ShortTextField
								onChange={handleAddress2Change}
								placeholder="Apt 456"
							/>
						</div>
					</div>
					<div className="signup-row-container">
						<div className="short-text-field">City: </div>
						<div className="short-text-field">
							<ShortTextField
								onChange={handleCityChange}
								placeholder="Boston"
							/>
						</div>
					</div>
					<div className="signup-row-container">
						<div className="short-text-field">State: </div>
						<div className="short-text-field">
							<ShortTextField
								onChange={handlestateChange}
								placeholder="MA"
							/>
						</div>
					</div>
					<div className="signup-row-container">
						<div className="short-text-field">Zip: </div>
						<div className="short-text-field">
							<ShortTextField
								onChange={handleZipChange}
								placeholder="01234"
							/>
						</div>
					</div>


					{/* Check input validation */}
					{invalidUsername &&
						<div className="signup-row-container">
							<div className="red-text">Invalid username</div>
						</div>
					}
					{usernameExists &&
						<div className="signup-row-container">
							<div className="red-text">Username already exists. Create a new username.</div>
						</div>
					}
					{invalidBirthdate &&
						<div className="signup-row-container">
							<div className="red-text">Invalid birthdate, use format MM/DD/YYYY</div>
						</div>
					}
					{invalidSsn &&
						<div className="signup-row-container">
							<div className="red-text">Invalid SSN, use format 012-34-5678</div>
						</div>
					}

					{/* Create account */}
					<div className="create-profile-button">
						<PillButton
							className="medium-text"
							text="Create Profile"
							pixelHeight="50"
							pixelWidth="200"
							onClick={handleCreateUser}
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
