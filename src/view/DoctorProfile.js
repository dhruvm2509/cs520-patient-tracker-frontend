import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DoctorProfile.css';
import doctorImage from './../resources/DoctorPlaceholder.jpg';
import PillButton from '../ui_components/PillButton';

function DoctorProfile() {

	const navigate = useNavigate();

	const handleDoctorProfileClick = () => {
		navigate('/doctor-profile');
	};

	const handleBackButtonClick = () => {
		navigate(-1);
	};

	const handleDelete = () => {
		if (window.confirm("Are you sure you want to delete your account?")) {
			navigate('/login');
		}
	};

	return (
		<div className="doctor-patient-profile">
			<div className="doctor-header-container header-text header-background">
				<div />
				<div className="header-title">
					Patient Tracker Web App
				</div>
				<div className="profile-signout">
					<img src={doctorImage} alt="Doctor profile" onClick={handleDoctorProfileClick} className="circle-border profile-size clickable-pointer" />
					<div>
						<PillButton
							className="pill-alignment small-text"
							pixelWidth="100"
							pixelHeight="50"
							color="black"
							backgroundColor="white"
							text="Sign out"
							link="/login"
						/>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="gray-shade"></div>
				<div>
					<div className="large-text small-margin">
						Doctor Information
					</div>
					<div className="row-container small-padding">
						<PillButton
							className="pill-alignment medium-text right-margin"
							pixelWidth="100"
							pixelHeight="50"
							text="Back"
							onClick={handleBackButtonClick}
						/>
					</div>
					<div className="large-margin">
						<img src={doctorImage} alt="Doctor profile" className="circle-border large-patient-profile" />
					</div>
					<div className="left-align-text large-margin medium-text line-spacing">
						Name: Bob Smith<br />
						Age: 23<br />
						Birth Date: 01/01/2001<br />
						SSN: 123-456-7890<br />
						Sex: M<br />
						Address: 1 Main Street, Amherst, MA, 12345
					</div>
					<PillButton
						className="small-text bold-text"
						pixelWidth="200"
						pixelHeight="50"
						color="white"
						backgroundColor="red"
						text="Delete Account"
						onClick={handleDelete}
					/>
					<div style={{ height: '50px' }}></div>
				</div>
				<div className="gray-shade"></div>
			</div>
		</div>
	);
}

export default DoctorProfile;
