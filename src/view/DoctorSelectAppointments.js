import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './DoctorSelectAppointments.css';
import doctorImage from './../resources/DoctorPlaceholder.jpg';
import PillButton from '../ui_components/PillButton';
import Calendar from '../ui_components/Calendar';
import PatientTrackerController from '../controller/PatientTrackerController';
import PatientTrackerModel from '../model/PatientTrackerModel';
import AppointmentTimes from '../ui_components/AppointmentTimes';

function DoctorSelectAppointments() {

	// MVC model and controller
	const model = new PatientTrackerModel();
	const controller = new PatientTrackerController(model);

	const location = useLocation();
	const userState = location.state;

	// Day selector
	const currentDay = new Date().getDate();
	const [selectedDay, setSelectedDay] = useState(currentDay);

	// Month selector
	const currentMonth = new Date().getMonth();
	const [selectedMonth, setSelectedMonth] = useState(currentMonth);

	// Year selector
	const currentYear = new Date().getFullYear();
	const [selectedYear, setSelectedYear] = useState(currentYear);

	const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	const monthsOfYear = [
		'January', 'February', 'March', 'April',
		'May', 'June', 'July', 'August',
		'September', 'October', 'November', 'December'
	];

	function dayEnding(day) {
		if (10 <= day && day <= 20) {
			return 'th';
		} else if (day % 10 === 1) {
			return 'st';
		} else if (day % 10 === 2) {
			return 'nd';
		} else if (day % 10 === 3) {
			return 'rd';
		}
		return 'th';
	}

	const [unsavedChagnes, setUnsavedChagnes] = useState('');

	const [selectedTimes, setSelectedTimes] = useState(new Array(28).fill(false));

	useEffect(() => {
		setSelectedTimes(model.getAvailableSlots(
			userState,
			new Date()));

		// eslint-disable-next-line
	}, []);

	const handleButtonClicked = (index) => {
		setSelectedTimes((prevArray) => {
			let newTimes = [...prevArray];
			newTimes[index] = !newTimes[index];
			return newTimes;
		});
		setUnsavedChagnes('Unsaved changes');
	};

	const selectedDate = new Date(selectedYear, selectedMonth, selectedDay);

	// Handle year/month/day updates
	const handleDayChange = (index) => {
		setSelectedDay(index);
		setSelectedTimes(model.getAvailableSlots(
			userState,
			new Date(selectedYear, selectedMonth, index)));
	};

	const handleMonthChange = (event) => {
		setSelectedMonth(monthsOfYear.indexOf(event.target.value));
		setSelectedDay(1);
		setSelectedTimes(model.getAvailableSlots(
			userState,
			new Date(selectedYear, event.target.value, 1)));
	};

	const handleYearChange = (event) => {
		setSelectedYear(event.target.value);
		setSelectedDay(1);
		setSelectedTimes(model.getAvailableSlots(
			userState,
			new Date(event.target.value, selectedMonth, 1)));
	};

	const handleSaveClicked = async () => {
		setUnsavedChagnes('Saving...');
		const selectedDate = new Date(selectedYear, selectedMonth, selectedDay);
		const newAvailableTimes = model.setAvailableSlotsOnDay(userState, selectedDate, selectedTimes);

		const userInfo = {
			_id: userState._id,
			doctorPatient: userState.doctorPatient,
			name: userState.name,
			DOB: userState.DOB,
			password: userState.password,
			SSN: userState.SSN,
			formIds: userState.formIds,
			appointmentIds: userState.appointmentIds,
			availableSlots: newAvailableTimes,
			gender: userState.gender,
			address1: userState.address1,
			address2: userState.address2,
			city: userState.city,
			state: userState.state,
			zip: userState.zip,
			imageUrl: userState.imageUrl
		};

		const response = await controller.updateUser(userState._id, userState.password, userInfo);

		if (response === null) {
			setUnsavedChagnes('Error saving data');
		} else {
			setUnsavedChagnes('Saved!');
			userState.availableSlots = newAvailableTimes;
			await new Promise(resolve => setTimeout(resolve, 3000));
			setUnsavedChagnes('');
		}

	};

	const navigate = useNavigate();

	const handleDoctorProfileClick = () => {
		navigate('/doctor-profile', { state: userState });
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
						Doctor Select Available Appointments
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
					<div className="medium-text medium-margin left-align-text">
						Select Day:
					</div>
					<div style={{ display: 'flex', justifyContent: 'space-around', margin: '10px' }}>
						<Calendar
							selectedDay={selectedDay}
							selectedMonth={selectedMonth}
							selectedYear={selectedYear}
							handleMonthChange={handleMonthChange}
							handleYearChange={handleYearChange}
							setSelectedDay={handleDayChange}
						/>
					</div>
					<div className="medium-text medium-margin left-align-text">
						Select Available times on {daysOfWeek[selectedDate.getDay()]} {monthsOfYear[selectedDate.getMonth()]} {selectedDate.getDate() + dayEnding(selectedDate.getDate())}, {selectedDate.getFullYear()}:
					</div>
					<div style={{ display: 'flex', justifyContent: 'space-around', margin: '10px' }}>
						< AppointmentTimes
							selectedTimes={selectedTimes}
							handleButtonClicked={handleButtonClicked}
						/>
					</div>
					<div className="row-container small-padding">
						<PillButton
							className="pill-alignment medium-text right-margin"
							pixelWidth="100"
							pixelHeight="50"
							text="Save"
							onClick={handleSaveClicked}
						/>
						{
							<div className="gray-color">{unsavedChagnes}</div>
						}

					</div>
					<div style={{ height: '100px' }}></div>
				</div>
				<div className="gray-shade"></div>
			</div>


		</div>
	);
}

export default DoctorSelectAppointments;
