import React from 'react';
import Calendar from '../ui_components/Calendar';
import AppointmentCard from '../ui_components/AppointmentCard';

function DoctorCalendarView(props) {

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
			<AppointmentCard className="small-margin" />
			<AppointmentCard className="small-margin" />
			<AppointmentCard className="small-margin" />
		</div>

	);
}

export default DoctorCalendarView;