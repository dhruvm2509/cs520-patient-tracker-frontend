import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PatientHome.css';
import doctorImage from './../resources/SickPatientPlaceholder.png';
import PillButton from '../ui_components/PillButton';
import PatientTrackerController from '../controller/PatientTrackerController';
import PatientTrackerModel from '../model/PatientTrackerModel';
import AppointmentCard from '../ui_components/AppointmentCard';

function DoctorHome() {

	// MVC model and controller
	const model = new PatientTrackerModel();
	const controller = new PatientTrackerController(model);

	const location = useLocation();
	const userState = location.state;

	useEffect(() => {
		async function retreivedAppointments() {
			const retreivedAppointments = await controller.getAppointments(userState._id);
			if (retreivedAppointments === null) {
				console.error('Error fetching appointments:');
				return;
			}

			const appointmentsObjects = await retreivedAppointments.json();
			const appointments = Object.entries(appointmentsObjects).map(([key, value]) => ({ ...value }));

			await getAppointments(appointments);
		}
		retreivedAppointments();

		// eslint-disable-next-line
	}, []);

	const [appointmentCards, setAppointmentCards] = useState(<p>Loading...</p>);

	async function getAppointments(appointments) {
		const appointmentCardsArray = [];
		for (let i = 0; i < appointments.length; i++) {
			const response = await controller.getUser(appointments[i].doctor_id, appointments[i].doctor_id);
			let doctorName = '';
			let imgSrc = null;
			if (response !== null) {
				const doctorJson = await response.json();
				doctorName = doctorJson.name;
				const doctorUrl = doctorJson.imageUrl;
				if (doctorUrl && doctorUrl !== '') {
					try {
						const response = await fetch(doctorUrl);
						if (response.ok) {
							const blob = await response.blob();
							if (blob.type === 'image/png' || blob.type === 'image/jpeg') {
								imgSrc = URL.createObjectURL(blob);
							}
						}
					} catch { }

				}
			}

			appointmentCardsArray.push(
				<AppointmentCard
					key={`AppointmentCard${i}`}
					className="small-margin"
					date={model.getDateFromFormat(appointments[i].date)}
					name={doctorName}
					noButton="true"
					imageSource={imgSrc}
				/>
			);

		}
		setAppointmentCards(appointmentCardsArray);
	}

	const [imageLoaded, setImageLoaded] = useState(false);
	const [imageSource, setImageSource] = useState('');

	useEffect(() => {
		async function retrieveProfilePic() {
			const imageUrl = userState?.imageUrl || null;
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

	const navigate = useNavigate();

	const handleFormsClick = () => {
		navigate('/patient-view-forms', { state: userState });
	};

	const handleDoctorProfileClick = () => {
		navigate('/profile', { state: userState });
	};

	return (
		<div className="doctor-home">
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
					<div className="row-container small-padding equal-spacing">
						<PillButton
							className="pill-alignment medium-text"
							pixelWidth="200"
							pixelHeight="50"
							text="View Forms"
							onClick={handleFormsClick}
						/>
						<PillButton
							className="pill-alignment medium-text"
							pixelWidth="250"
							pixelHeight="50"
							text="Schedule Appointment"
							onClick={() => { }}
						/>
					</div>
					<div className="large-text small-margin">
						Upcoming Appointments
					</div>
					{appointmentCards}
					<div style={{ height: '100px' }}></div>
				</div>
				<div className="gray-shade"></div>
			</div>


		</div>
	);
}

export default DoctorHome;
