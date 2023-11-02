import React, { useState } from 'react';
import AppointmentCard from '../ui_components/AppointmentCard';

function DoctorListView(props) {

	const [todayVisible, setTodayVisibility] = useState(true);
	const [weekVisible, setWeekVisibility] = useState(true);
	const [monthVisible, setMonthVisibility] = useState(true);

	const toggleToday = () => {
		setTodayVisibility(!todayVisible);
	}
	const toggleWeek = () => {
		setWeekVisibility(!weekVisible);
	}
	const toggleMonth = () => {
		setMonthVisibility(!monthVisible);
	}

	return (
		<div>
			<div onClick={toggleToday} className="toggle-text medium-text left-align-text small-padding">
				{todayVisible ? <p>Today ▼</p> : <p>Today ►</p>}
			</div>
			{todayVisible ? <AppointmentCard className="small-margin" /> : null}
			<div onClick={toggleWeek} className="toggle-text medium-text left-align-text small-padding">
				{weekVisible ? <p>This Week ▼</p> : <p>This Week ►</p>}
			</div>
			{weekVisible ? <AppointmentCard className="small-margin" /> : null}
			<div onClick={toggleMonth} className="toggle-text medium-text left-align-text small-padding">
				{monthVisible ? <p>This Month ▼</p> : <p>This Month ►</p>}
			</div>
			{monthVisible ? <AppointmentCard className="small-margin" /> : null}
		</div>

	);
}

export default DoctorListView;
