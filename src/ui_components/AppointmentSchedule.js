import React from 'react';
import PillButton from './PillButton.js';

function AppointmentSchedule(props) {

	function buttonsGrid() {
		const buttonsGrid = [];
		for (let i = 0; i < 1 + (props.appointments.length / 4); i++) {
			const buttonsRow = []
			for (let j = 0; j < 4; j++) {
				if (4 * i + j >= props.appointments.length) {
					break;
				}

				const index = 4 * i + j;
				const textColor = "white";
				const backgroundColor = "#8dcc77";

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
			<div className="medium-text medium-margin left-align-text"><b>{props.doctorName} available times:</b></div>
			{buttonsGrid()}
		</div>
	);
}

export default AppointmentSchedule;