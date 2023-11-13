import React from 'react';
import PillButton from './PillButton.js';

function AppointmentTimes(props) {

	const appointmentTimes = [
		"5:00-5:30", "5:30-6:00", "6:00-6:30", "6:30-7:00",
		"7:00-7:30", "7:30-8:00", "8:00-8:30", "8:30-9:00",
		"9:00-9:30", "9:30-10:00", "10:00-10:30", "10:30-11:00",
		"11:00-11:30", "11:30-12:00", "12:00-12:30", "12:30-1:00",
		"1:00-1:30", "1:30-2:00", "2:00-2:30", "2:30-3:00",
		"3:00-3:30", "3:30-4:00", "4:00-4:30", "4:30-5:00",
		"5:00-5:30", "5:30-6:00", "6:00-6:30", "6:30-7:00",
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
				<div className="row-container">{buttonsRow}</div>
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