import React, { useState, useEffect } from 'react';
import Calendar from '../ui_components/Calendar';
import AppointmentCard from '../ui_components/AppointmentCard';
import PatientTrackerController from '../controller/PatientTrackerController';
import PatientTrackerModel from '../model/PatientTrackerModel';

function DoctorCalendarView(props) {

	// MVC model and controller
	const model = new PatientTrackerModel();
	const controller = new PatientTrackerController(model);

	const appointmentHeaderStyle = {
		marginTop: '40px',
		marginBottom: '40px'
	};

	const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	const monthsOfYear = [
		'January', 'February', 'March', 'April',
		'May', 'June', 'July', 'August',
		'September', 'October', 'November', 'December'
	];

	const selectedDate = new Date(props.selectedYear, props.selectedMonth, props.selectedDay);

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

	const renderAppointments = async (appointments, selectedYear, selectedMonth, selectedDay) => {

		appointments = model.getAppointmentsByDate(appointments, new Date(selectedYear, selectedMonth, selectedDay));
		const appointmentCards = [];
		for (let i = 0; i < appointments.length; i++) {
			const response = await controller.getUser(appointments[i].patient_id);
			let patientName = '';
			if (response !== null) {
				patientName = (await response.json()).name;
			}
			appointmentCards.push(
				<AppointmentCard
					className="small-margin"
					date={model.getDateFromFormat(appointments[i].date)}
					name={patientName}
					onClick={props.handleViewPatientClick}
				/>
			);
		}

		return appointmentCards;
	};

	const [allAppointments, setAllAppointments] = useState(<p>Loading...</p>);
	useEffect(() => {
		const setAppointmentCardsInfo = async () => {
			setAllAppointments(await renderAppointments(
				props.allAppointments, props.selectedYear, props.selectedMonth, props.selectedDay));
		}

		setAllAppointments(<p>Loading...</p>);
		setAppointmentCardsInfo();

	}, [props.allAppointments, props.selectedDay, props.selectedMonth, props.selectedYear]);

	return (
		<div>
			<Calendar
				selectedDay={props.selectedDay}
				selectedMonth={props.selectedMonth}
				selectedYear={props.selectedYear}
				handleMonthChange={props.handleMonthChange}
				handleYearChange={props.handleYearChange}
				setSelectedDay={props.setSelectedDay}
			/>
			<div style={appointmentHeaderStyle} className="medium-text">
				Appointments On: {daysOfWeek[selectedDate.getDay()]} {monthsOfYear[selectedDate.getMonth()]} {selectedDate.getDate() + dayEnding(selectedDate.getDate())}, {selectedDate.getFullYear()}
			</div>
			{allAppointments}
		</div>

	);
}

export default DoctorCalendarView;