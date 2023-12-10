import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './DoctorProfile.css';
import doctorImage from './../resources/DoctorPlaceholder.jpg';
import PillButton from '../ui_components/PillButton';
import PatientTrackerController from '../controller/PatientTrackerController';
import PatientTrackerModel from '../model/PatientTrackerModel';

function DoctorProfile() {

	// MVC model and controller
	const model = new PatientTrackerModel();
	const controller = new PatientTrackerController(model);

	const navigate = useNavigate();

	const location = useLocation();
	const userState = location.state;

	const handleDoctorProfileClick = () => {
		navigate('/doctor-profile', { state: userState });
	};

	const handleBackButtonClick = () => {
		navigate(-1, { state: userState });
	};

	const handleDelete = () => {
		if (window.confirm("Are you sure you want to delete your account?")) {
			controller.deleteUser(userState._id, userState.password);
			navigate('/login');
		}
	};

	const [imageLoaded, setImageLoaded] = useState(false);
	const [imageSource, setImageSource] = useState('');

	useEffect(() => {
		async function retrieveProfilePic() {
			const imageUrl = userState.imageUrl;
			if (imageUrl !== null) {
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
			}
		}

		retrieveProfilePic();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="doctor-patient-profile">
			<div className="doctor-header-container header-text header-background">
				<div />
				<div className="header-title">
					Patient Tracker Web App
				</div>
				<div className="profile-signout">
					<img
						src={imageLoaded ? imageSource : doctorImage}
						alt="Doctor profile"
						onClick={handleDoctorProfileClick}
						className="circle-border profile-size clickable-pointer"
					/>
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
						<img
							src={imageLoaded ? imageSource : doctorImage}
							alt="Doctor profile"
							className="circle-border large-patient-profile"
						/>
					</div>
					<div className="left-align-text large-margin medium-text line-spacing">
						Name: {userState.name}<br />
						Age: {model.getAge(model.getDateFromFormat(userState.DOB))}<br />
						Birth Date: {model.getFormalDate(model.getDateFromFormat(userState.DOB))}<br />
						Gender: {userState.gender}<br />
						Address: {userState.address1 + (userState.address2?.length > 0 ? ', ' + userState.address2 : '')}, {userState.state}, {userState.city}, {userState.zip}
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
