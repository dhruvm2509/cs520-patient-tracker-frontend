import React from 'react';

const calendarWidth = 580;
const innerMargin = 10;
const monthYearHeight = 80;

/*
props include the following:
	selectedDay
	selectedMonth
	selectedYear
	handleMonthChange
	handleYearChange
	setSelectedDay
*/
function Calendar(props) {

	const appointmentCardStyle = {
		backgroundColor: props.backgroundColor || '#4620c5ff',
		borderRadius: '20px',
		width: calendarWidth + 'px',
		position: 'relative',
		zIndex: '1'
	};

	const daySelectionStyle = {
		backgroundColor: 'white',
		borderRadius: '10px',
		width: (calendarWidth - 2 * innerMargin) + 'px',
		position: 'absolute',
		zIndex: '-1',
		top: '90px',
		left: '10px'
	};

	const selectorStyle = {
		color: "white",
		backgroundColor: '#4620c5ff',
		border: "none",
		height: monthYearHeight + 'px'
	};

	const dayStyle = {
		color: "white",
		borderRadius: '10px',
		width: '60px',
		height: '60px',
		fontWeight: 'bold',
		margin: '10px',
		position: 'absolute',
		cursor: 'pointer'
	};

	const dayNameStyle = {
		margin: '20px',
		width: '40px',
		fontWeight: 'bold'
	};

	// Month selector
	const months = [
		'January', 'February', 'March', 'April',
		'May', 'June', 'July', 'August',
		'September', 'October', 'November', 'December'
	];

	const years = [];

	for (let year = new Date().getFullYear(); year <= new Date().getFullYear() + 10; year++) {
		years.push(<option key={year} value={year}>{year}</option>);
	}

	// Get day of week of 1st of month
	function getMonthStartDay(year, month) {
		const date = new Date(year, month, 1);
		return date.getDay();
	}

	// Get number of days in month
	function getDaysInMonth(year, month) {
		const lastDayOfMonth = new Date(year, month + 1, 0);
		return lastDayOfMonth.getDate();
	}

	// Draw days boxes
	function boxesGrid() {
		const boxesGrid = [];
		let xPos = getMonthStartDay(props.selectedYear, props.selectedMonth);
		for (let day = 1; day <= getDaysInMonth(props.selectedYear, props.selectedMonth); day++) {

			let dayBoxStyle = {
				...{
					top: (40 + 80 * Math.floor((xPos + day - 1) / 7)) + 'px',
					left: 80 * ((xPos + day - 1) % 7) + 'px'
				},
				...dayStyle
			};

			let backgroundColor = '#5142ffff';
			if (day === props.selectedDay) {
				backgroundColor = '#4620c5ff';
			}

			const todaysDate = new Date();
			const selectedDate = new Date(props.selectedYear, props.selectedMonth, day);
			if (selectedDate < todaysDate &&
				!(todaysDate.getDay() === selectedDate.getDay() &&
					todaysDate.getMonth() === selectedDate.getMonth() &&
					todaysDate.getFullYear() === selectedDate.getFullYear())) {
				backgroundColor = 'gray';
			}

			dayBoxStyle = {
				...{
					backgroundColor: backgroundColor
				},
				...dayBoxStyle
			};

			boxesGrid.push(
				<div
					key={`${day % 7},${Math.floor(day / 7)}`}
					style={dayBoxStyle}
					className='medium-text'
					onClick={() => props.setSelectedDay(day)}
				>
					{day}
				</div >
			);
		}
		return boxesGrid;
	}

	function dynamicCalendarHeight() {
		return 80 * (
			Math.ceil(
				(
					getMonthStartDay(props.selectedYear, props.selectedMonth) +
					getDaysInMonth(props.selectedYear, props.selectedMonth)
				) / 7)
		);
	}

	return (
		<div>
			<div style={{
				...{
					height: 140 + dynamicCalendarHeight()
				},
				...appointmentCardStyle
			}}>
				<div style={{ height: '90px' }} className='row-container'>
					<select
						id="yearSelection"
						value={props.selectedYear}
						onChange={props.handleYearChange}
						style={selectorStyle}
						className='large-text small-margin bold-text'
					>
						{years}
					</select>
					<select
						style={selectorStyle}
						className='large-text small-margin bold-text'
						value={months[props.selectedMonth]}
						onChange={props.handleMonthChange}
					>
						<option value="January">January</option>
						<option value="February">February</option>
						<option value="March">March</option>
						<option value="April">April</option>
						<option value="May">May</option>
						<option value="June">June</option>
						<option value="July">July</option>
						<option value="August">August</option>
						<option value="September">September</option>
						<option value="October">October</option>
						<option value="November">November</option>
						<option value="December">December</option>
					</select>
				</div>
				<div style={{ height: '40px', display: 'flex', paddingLeft: '8px' }} className='row-container medium-text'>
					<div style={dayNameStyle}>Sun</div>
					<div style={dayNameStyle}>Mon</div>
					<div style={dayNameStyle}>Tue</div>
					<div style={dayNameStyle}>Wed</div>
					<div style={dayNameStyle}>Thu</div>
					<div style={dayNameStyle}>Fri</div>
					<div style={dayNameStyle}>Sat</div>
				</div>
				<div style={{ ...{ height: 40 + dynamicCalendarHeight() }, ...daySelectionStyle }}>
					{boxesGrid()}
				</div>
			</div>
		</div>
	);
}

export default Calendar;