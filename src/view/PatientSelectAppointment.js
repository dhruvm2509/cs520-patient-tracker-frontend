import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import patientImage from './../resources/SickPatientPlaceholder.png';
import PillButton from '../ui_components/PillButton';
import Calendar from '../ui_components/Calendar';
import PatientTrackerController from '../controller/PatientTrackerController';
import PatientTrackerModel from '../model/PatientTrackerModel';
import AppointmentSchedule from '../ui_components/AppointmentSchedule';

function PatientSelectAppointment() {

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

	const selectedDate = new Date(selectedYear, selectedMonth, selectedDay);

	// Handle year/month/day updates
	const handleDayChange = (index) => {
		setSelectedDay(index);
	};

	const handleMonthChange = (event) => {
		setSelectedMonth(monthsOfYear.indexOf(event.target.value));
		setSelectedDay(1);
	};

	const handleYearChange = (event) => {
		setSelectedYear(event.target.value);
		setSelectedDay(1);
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
						Available Appointments on {daysOfWeek[selectedDate.getDay()]} {monthsOfYear[selectedDate.getMonth()]} {selectedDate.getDate() + dayEnding(selectedDate.getDate())}, {selectedDate.getFullYear()}:
					</div>
					<AppointmentSchedule
						doctorName="Doctor1"
						appointments={["5:30 - 6:00 AM", "6:00 - 6:30 AM", "6:30 - 7:00 AM", "7:00 - 7:30 AM", "7:30 - 8:00 AM"]}
						handleButtonClicked={() => { }}
					/>
					<AppointmentSchedule
						doctorName="Doctor2"
						appointments={["5:30 - 6:00 PM", "6:00 - 6:30 PM", "6:30 - 7:00 PM"]}
						handleButtonClicked={() => { }}
					/>
					<div style={{ height: '100px' }}></div>
				</div>
				<div className="gray-shade"></div>
			</div>


		</div>
	);
}

export default PatientSelectAppointment;
