import React from 'react';
//import { Link } from 'react-router-dom';
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

	return (
		<div style={mergedStyle} className={`row-container ${props.className}`}>
			<img src={sickPatient} alt='Sick patient placeholder' style={profileImageStyle} className='circle-border' />
			<div className="left-align-items">
				<div className="medium-text small-margin white-color">Bob Smith | Wed, Oct 25 | 12:00pm - 12:30pm</div>
				<PillButton
					color="black"
					backgroundColor="white"
					pixelWidth="150"
					pixelHeight="40"
					text="View Records"
					className="small-text small-margin"
				/>
			</div>
		</div>
	);
}

export default AppointmentCard;