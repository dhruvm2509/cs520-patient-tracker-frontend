import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import patientImage from './../resources/SickPatientPlaceholder.png';
import PillButton from '../ui_components/PillButton';
import ShortTextField from '../ui_components/ShortTextField';
import PatientTrackerController from '../controller/PatientTrackerController';
import PatientTrackerModel from '../model/PatientTrackerModel';
import AppointmentSchedule from '../ui_components/AppointmentSchedule';

function PatientSelectAppointment() {

	// MVC model and controller
	const model = new PatientTrackerModel();
	const controller = new PatientTrackerController(model);

	const location = useLocation();
	const userState = location.state;

	const monthsOfYear = [
		'January', 'February', 'March', 'April',
		'May', 'June', 'July', 'August',
		'September', 'October', 'November', 'December'
	];

	const [imageLoaded, setImageLoaded] = useState(false);
	const [imageSource, setImageSource] = useState('');

	const [searchText, setSearchText] = useState('');
	const handleSearchTextChange = (event) => {
		setSearchText(event.target.value);
	};

	const [searchAppointments, setSearchAppointments] = useState(<p>Search for doctor by name.</p>);

	const [searchClicked, setSearchClicked] = useState(false);
	useEffect(() => {
		async function searchedAppointments() {
			if (searchText === '') {
				setSearchAppointments(<p>Search for doctor by name.</p>);
				return;
			}
			const response = await controller.getDoctorByName(searchText);
			if (response !== null) {
				const doctorJson = await response.json();
				if (doctorJson.length === 0) {
					setSearchAppointments(<p>No matching results</p>);
					return;
				}
				const appointmentCards = await doctorAppointmentCards(
					doctorJson[0]._id,
					doctorJson[0].name,
					doctorJson[0].availableSlots,
					doctorJson[0].imageUrl);
				setSearchAppointments(appointmentCards);
			} else {
				setSearchAppointments(<p>No matching results</p>);
			}
		}
		searchedAppointments();

		// eslint-disable-next-line
	}, [searchClicked]);

	async function doctorAppointmentCards(doctorId, doctorName, availableSlots, imageUrl) {
		const groupedAvailableSlots = model.groupByDays(availableSlots);
		const appointmentCardsList = [];
		for (let i = 0; i < groupedAvailableSlots.length; i++) {

			// Only check for future open slots
			const yesterday = (new Date()).setDate(new Date().getDate() - 1);
			if (groupedAvailableSlots[i][0] < yesterday) {
				continue;
			}
			const appointmentTimesFormatted = [];
			for (let j = 0; j < groupedAvailableSlots[i].length; j++) {
				appointmentTimesFormatted[j] = model.formatTimeSpan(groupedAvailableSlots[i][j]);
			}

			const cardDate = groupedAvailableSlots[i][0];

			const imageSrc = await retrieveProfilePic(imageUrl);
			const card = (
				<AppointmentSchedule
					imageSource={imageSrc}
					key={`Day${i}AppointmentSchedule`}
					doctorName={doctorName}
					date={cardDate}
					className="small-margin"
					appointments={appointmentTimesFormatted}
					handleButtonClicked={(j) => {
						if (window.confirm(`Create an appointment on: ${formatDate(cardDate)} at ${appointmentTimesFormatted[j]}?`)) {

							const slotDate = cardDate;
							slotDate.setHours(groupedAvailableSlots[i][j].getHours());
							slotDate.setMinutes(groupedAvailableSlots[i][j].getMinutes());
							controller.bookAppointment(
								doctorId,
								userState._id,
								model.formatDateTimeToUTC(slotDate),
								"summary"
							);
						}
					}}
				/>
			);
			appointmentCardsList.push(card);
		}
		return appointmentCardsList;
	}

	function formatDate(date) {
		const monthNames = [
			'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
			'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
		];
		const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

		const day = date.getDate();
		const month = monthNames[date.getMonth()];

		return `${dayNames[date.getDay()]}, ${month} ${day}`;
	}

	const handleSearchClick = (event) => {
		setSearchClicked(!searchClicked);
	};

	async function retrieveProfilePic(imageUrl) {
		if (imageUrl === null || imageUrl === '') {
			return null;
		}

		try {
			const response = await fetch(imageUrl);
			if (!response.ok) {
				return null;
			}
			const blob = await response.blob();
			if (blob.type === 'image/png' || blob.type === 'image/jpeg') {
				return URL.createObjectURL(blob);
			}

		} catch {
			return null;
		}

		return null;
	}

	useEffect(() => {
		async function setProfilePic() {
			const imageSrc = await retrieveProfilePic(userState.imageUrl);
			if (imageSrc === null) {
				setImageLoaded(false);
			} else {
				setImageLoaded(true);
				setImageSource(imageSrc);
			}
		}

		setProfilePic();
		// eslint-disable-next-line
	}, []);

	const navigate = useNavigate();

	const handleProfileClick = () => {
		navigate('/profile', { state: userState });
	};

	const handleBackButtonClick = () => {
		navigate(-1, { state: userState });
	};

	return (
		<div className="doctor-select-appointments">
			<div className="doctor-header-container header-text header-background">
				<div />
				<div className="header-title">
					Patient Tracker Web App
				</div>
				<div className="profile-signout">
					<img src={imageLoaded ? imageSource : patientImage} alt="Doctor profile" onClick={handleProfileClick} className="circle-border profile-size clickable-pointer" />
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
						Patient Select Appointment
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
					<div className="row-container small-padding">
						<PillButton
							className="pill-alignment medium-text right-margin"
							pixelWidth="100"
							pixelHeight="50"
							text="Search"
							onClick={handleSearchClick}
						/>
						<ShortTextField
							className="search-field"
							onChange={handleSearchTextChange}
						/>
					</div>
					{searchAppointments}
					<div style={{ height: '600px' }}></div>
				</div>
				<div className="gray-shade"></div>
			</div>


		</div>
	);
}

export default PatientSelectAppointment;
