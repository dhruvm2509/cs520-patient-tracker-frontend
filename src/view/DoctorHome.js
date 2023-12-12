import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './DoctorHome.css';
import doctorImage from './../resources/DoctorPlaceholder.jpg';
import PillButton from '../ui_components/PillButton';
import ShortTextField from '../ui_components/ShortTextField';
import DoctorCalendarView from '../ui_components/DoctorCalendarView';
import DoctorListView from '../ui_components/DoctorListView';
import PatientTrackerController from '../controller/PatientTrackerController';
import PatientTrackerModel from '../model/PatientTrackerModel';
import AppointmentCard from '../ui_components/AppointmentCard';

function DoctorHome() {

	// MVC model and controller
	const model = new PatientTrackerModel();
	const controller = new PatientTrackerController(model);

	const location = useLocation();
	const userState = location.state;

	const [allAppointments, setAllAppointments] = useState([]);
	const [appointmentsToday, setAppointmentsToday] = useState([]);
	const [appointmentsWeek, setAppointmentsWeek] = useState([]);
	const [appointmentsMonth, setAppointmentsMonth] = useState([]);

	useEffect(() => {
		async function retreivedAppointments() {
			const retreivedAppointments = await controller.getAppointments(userState._id);
			if (retreivedAppointments === null) {
				console.error('Error fetching appointments:');
				return;
			}

			const appointmentsObjects = await retreivedAppointments.json();
			const appointments = Object.entries(appointmentsObjects).map(([key, value]) => ({ ...value }));
			setAllAppointments(appointments);
			setAppointmentsToday(model.getAppointmentsByDate(appointments, new Date()));
			setAppointmentsWeek(model.getAppointmentThisWeek(appointments, new Date()));
			setAppointmentsMonth(model.getAppointmentThisMonth(appointments, new Date()));
		}
		retreivedAppointments();

		// eslint-disable-next-line
	}, []);

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

	const [isListView, setIsListView] = useState(true);
	const [isSearchView, setIsSearchView] = useState(false);

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
		setIsSearchView(false);
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

	const [searchText, setSearchText] = useState('');
	const handleSearchTextChange = (event) => {
		setSearchText(event.target.value);
	};

	const [searchAppointments, setSearchAppointments] = useState(<p>Searching...</p>);

	const [searchClicked, setSearchClicked] = useState(false);
	useEffect(() => {
		async function searchedAppointments() {
			setSearchAppointments(<p>Loading...</p>);
			const retreivedAppointments = await model.getAppointmentBySearch(allAppointments, controller, searchText, userState._id);
			const appointmentCards = [];
			for (let i = 0; i < retreivedAppointments.length; i++) {
				const response = await controller.getUser(retreivedAppointments[i].patient_id, userState._id);
				let patientName = '';
				if (response.ok) {
					patientName = (await response.json()).name;
				}
				appointmentCards.push(
					<AppointmentCard
						key={"AppointmentCard" + i}
						className="small-margin"
						date={model.getDateFromFormat(retreivedAppointments[i].date)}
						name={patientName}
						onClick={handleViewPatientClick}
						patientId={patientName}
					/>
				);
			}
			if (appointmentCards.length === 0) {
				setSearchAppointments(<p>No matching results</p>);
			} else {
				setSearchAppointments(appointmentCards);
			}
		}
		searchedAppointments();

		// eslint-disable-next-line
	}, [searchClicked]);


	const handleSearchClick = (event) => {
		setIsSearchView(true);
		setSearchClicked(!searchClicked);
	};

	const navigate = useNavigate();

	const handleDoctorProfileClick = () => {
		navigate('/profile', { state: userState });
	};

	const handleTimeSlotsClick = () => {
		navigate('/doctor-select-appointments', { state: userState });
	};

	const handleViewPatientClick = (event) => {
		navigate('/doctor-patient-profile', { state: userState });
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
					<div className="large-text small-margin">
						Doctor Appointments
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
							onClick={handleTimeSlotsClick}
						/>
					</div>
					{
						isSearchView ?
							(searchAppointments)
							:
							(isListView ? (
								<DoctorListView
									appointmentsToday={appointmentsToday}
									appointmentsWeek={appointmentsWeek}
									appointmentsMonth={appointmentsMonth}
									handleViewPatientClick={handleViewPatientClick}
									doctorId={userState._id}
								/>
							) : (
								<div style={{ display: 'flex', justifyContent: 'space-around', margin: '10px' }}>
									<DoctorCalendarView
										selectedDay={selectedDay}
										selectedMonth={selectedMonth}
										selectedYear={selectedYear}
										handleMonthChange={handleMonthChange}
										handleYearChange={handleYearChange}
										setSelectedDay={setSelectedDay}
										allAppointments={allAppointments}
										handleViewPatientClick={handleViewPatientClick}
										doctorId={userState._id}
									/>
								</div>
							))

					}
					<div style={{ height: '100px' }}></div>
				</div>
				<div className="gray-shade"></div>
			</div>


		</div>
	);
}

export default DoctorHome;
