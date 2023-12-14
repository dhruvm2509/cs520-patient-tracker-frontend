import React from 'react';
import PillButton from './PillButton.js';
import doctorImage from './../resources/DoctorPlaceholder.jpg';

function AppointmentSchedule(props) {

	const appointmentCardStyle = {
		backgroundColor: props.backgroundColor || '#5142ffff',
		borderRadius: '20px',
		fontWeight: 'bold',
		height: (100 + 70 * Math.ceil(props.appointments.length / 4)) + 'px'
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

		return `${dayNames[date.getDay()]}, ${month} ${day}`;
	}

	function buttonsGrid() {
		const buttonsGrid = [];
		for (let i = 0; i < 1 + (props.appointments.length / 4); i++) {
			const buttonsRow = []
			for (let j = 0; j < 4; j++) {
				if (4 * i + j >= props.appointments.length) {
					break;
				}

				const index = 4 * i + j;
				const textColor = "black";
				const backgroundColor = "white";

				buttonsRow.push(
					<PillButton
						key={`${i} ${j}`}
						className="pill-alignment small-text small-margin"
						pixelWidth="150"
						pixelHeight="50"
						color={textColor}
						backgroundColor={backgroundColor}
						text={props.appointments[4 * i + j]}
						onClick={() => props.handleButtonClicked(index)}
					/>
				);
			}
			buttonsGrid.push(
				<div key={`Row${i}`} className="row-container">{buttonsRow}</div>
			);
		}
		return (
			<div>
				{buttonsGrid}
			</div>);
	}

	return (
		<div>
			<div style={mergedStyle} className={`row-container ${props.className}`}>
				<img src={props.imageSource ? props.imageSource : doctorImage} alt='Sick patient placeholder' style={profileImageStyle} className='circle-border' />
				<div className="left-align-items">
					<div className="medium-text small-margin white-color">{props.doctorName} | {formatDate(props.date)}</div>
					{buttonsGrid()}
				</div>
			</div>
		</div>
	);
}

export default AppointmentSchedule;