import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DoctorHome.css';
import doctorImage from './../resources/DoctorPlaceholder.jpg';
import PillButton from '../ui_components/PillButton';
import ShortTextField from '../ui_components/ShortTextField';
import DoctorCalendarView from '../ui_components/DoctorCalendarView';
import DoctorListView from '../ui_components/DoctorListView';

function DoctorHome() {

	const [isListView, setIsListView] = useState(true);

	// Day selector
	const currentDay = new Date().getDate();
	const [selectedDay, setSelectedDay] = useState(currentDay);

	// Month selector
	const currentMonth = new Date().getMonth();
	const [selectedMonth, setSelectedMonth] = useState(currentMonth);

	// Year selector
	const currentYear = new Date().getFullYear();
	const [selectedYear, setSelectedYear] = useState(currentYear);

	const months = [
		'January', 'February', 'March', 'April',
		'May', 'June', 'July', 'August',
		'September', 'October', 'November', 'December'
	];

	const listViewToggle = (event) => {
		setIsListView(!isListView);
	};

	// Handle year/month updates
	const handleMonthChange = (event) => {
		setSelectedMonth(months.indexOf(event.target.value));
		setSelectedDay(1);
	};

	const handleYearChange = (event) => {
		setSelectedYear(event.target.value);
		setSelectedDay(1);
	};

	const navigate = useNavigate();

	const handleDoctorProfileClick = () => {
		navigate('/doctor-profile');
	};

	return (

		<div className="doctor-home">
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
						Doctor Appointments
					</div>
					<div className="row-container small-padding">
						<PillButton
							className="pill-alignment medium-text right-margin"
							pixelWidth="100"
							pixelHeight="50"
							text="Search"
						/>
						<ShortTextField className="search-field" />
					</div>
					<div className="row-container small-padding equal-spacing">
						<PillButton
							className="pill-alignment medium-text"
							pixelWidth="200"
							pixelHeight="50"
							text={isListView ? "Calendar View" : "List View"}
							onClick={listViewToggle}
						/>
						<PillButton
							className="pill-alignment medium-text"
							pixelWidth="250"
							pixelHeight="50"
							text="Select Open Time Slots"
							link="/doctor-select-appointments"
						/>
					</div>
					{
						isListView ? (
							<DoctorListView />
						) : (
							<div style={{ display: 'flex', justifyContent: 'space-around', margin: '10px' }}>
								<DoctorCalendarView
									selectedDay={selectedDay}
									selectedMonth={selectedMonth}
									selectedYear={selectedYear}
									handleMonthChange={handleMonthChange}
									handleYearChange={handleYearChange}
									setSelectedDay={setSelectedDay}
								/>
							</div>
						)
					}
					<div style={{ height: '100px' }}></div>
				</div>
				<div className="gray-shade"></div>
			</div>


		</div>
	);
}

export default DoctorHome;
