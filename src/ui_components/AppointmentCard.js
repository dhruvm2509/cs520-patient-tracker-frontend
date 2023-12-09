import React from 'react';
import sickPatient from './../resources/SickPatientPlaceholder.png';
import PillButton from './PillButton';

function AppointmentCard(props) {

	const appointmentCardStyle = {
		backgroundColor: props.backgroundColor || '#5142ffff',
		borderRadius: '20px',
		fontWeight: 'bold',
		height: '150px'
	};

	const profileImageStyle = {
		width: '50px',
		height: '50px',
		margin: '10px',
	};

	const mergedStyle = { ...appointmentCardStyle, ...props.style };

	function formatDate(date) {
		const monthNames = [
			'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
			'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
		];
		const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

		const day = date.getDate();
		const month = monthNames[date.getMonth()];

		// Get the hours and minutes
		const hours = date.getHours();
		const minutes = date.getMinutes();

		const shiftedDateTime = new Date(date.setMinutes(date.getMinutes() + 30));
		const shiftHours = shiftedDateTime.getHours();
		const shiftMinutes = shiftedDateTime.getMinutes();

		// Format the date string
		const formattedDate = `${dayNames[date.getDay()]}, ${month} ${day} |`
			+ ` ${formatTime(hours, minutes)} - ${formatTime(shiftHours, shiftMinutes)}`;

		return formattedDate;
	}

	function formatTime(hours, minutes) {
		const formattedHours = String(hours).padStart(2, '0');
		const formattedMinutes = String(minutes).padStart(2, '0');
		return `${formattedHours}:${formattedMinutes}`;
	}

	return (
		<div style={mergedStyle} className={`row-container ${props.className}`}>
			<img src={sickPatient} alt='Sick patient placeholder' style={profileImageStyle} className='circle-border' />
			<div className="left-align-items">
				<div className="medium-text small-margin white-color">{props.name} | {formatDate(props.date)}</div>
				<PillButton
					color="black"
					backgroundColor="white"
					pixelWidth="150"
					pixelHeight="40"
					text="View Records"
					className="small-text small-margin"
					onClick={props.onClick}
				/>
			</div>
		</div>
	);
}

export default AppointmentCard;