import React from 'react';
import PillButton from './PillButton.js';

function AppointmentTimes(props) {

	const appointmentTimes = [
		"5:00-5:30 AM", "5:30-6:00 AM", "6:00-6:30 AM", "6:30-7:00 AM",
		"7:00-7:30 AM", "7:30-8:00 AM", "8:00-8:30 AM", "8:30-9:00 AM",
		"9:00-9:30 AM", "9:30-10:00 AM", "10:00-10:30 AM", "10:30-11:00 AM",
		"11:00-11:30 AM", "11:30-12:00 PM", "12:00-12:30 PM", "12:30-1:00 PM",
		"1:00-1:30 PM", "1:30-2:00 PM", "2:00-2:30 PM", "2:30-3:00 PM",
		"3:00-3:30 PM", "3:30-4:00 PM", "4:00-4:30 PM", "4:30-5:00 PM",
		"5:00-5:30 PM", "5:30-6:00 PM", "6:00-6:30 PM", "6:30-7:00 PM",
	];

	function buttonsGrid() {
		const buttonsGrid = [];
		for (let i = 0; i < 7; i++) {
			const buttonsRow = []
			for (let j = 0; j < 4; j++) {
				const index = 4 * i + j;
				const textColor = props.selectedTimes[index] ? "white" : "black";
				const backgroundColor = props.selectedTimes[index] ? "#8dcc77" : "#cccccc";

				buttonsRow.push(
					<PillButton
						key={`${i} ${j}`}
						className="pill-alignment small-text small-margin"
						pixelWidth="150"
						pixelHeight="50"
						color={textColor}
						backgroundColor={backgroundColor}
						text={appointmentTimes[4 * i + j]}
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
			{buttonsGrid()}
		</div>
	);
}

export default AppointmentTimes;