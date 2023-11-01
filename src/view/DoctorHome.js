import React, { useState } from 'react';
import './DoctorHome.css';
import doctorImage from './../resources/DoctorPlaceholder.jpg';
import PillButton from '../ui_components/PillButton';
import ShortTextField from '../ui_components/ShortTextField';
import AppointmentCard from '../ui_components/AppointmentCard';
import Calendar from '../ui_components/Calendar';

function DoctorHome() {

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

		<div className="doctor-home">
			<div className="doctor-header-container header-text header-background">
				<div />
				<div className="header-title">
					Patient Tracker Web App
				</div>
				<div className="profile-signout">
					<img src={doctorImage} alt="Doctor profile" className="circle-border profile-size" />
					<div>
						<PillButton
							className="pill-alignment small-text"
							pixelWidth="100"
							pixelHeight="50"
							color="black"
							backgroundColor="white"
							text="Sign out"
							link="/login"
						/>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="gray-shade"></div>
				<div>
					<div className="row-container small-padding">
						<PillButton
							className="pill-alignment medium-text right-margin"
							pixelWidth="100"
							pixelHeight="50"
							text="Search"
						/>
						<ShortTextField className="search-field" />
					</div>
					<div className="row-container small-padding equal-spacing">
						<PillButton
							className="pill-alignment medium-text"
							pixelWidth="200"
							pixelHeight="50"
							text="Calendar View"
						/>
						<PillButton
							className="pill-alignment medium-text"
							pixelWidth="250"
							pixelHeight="50"
							text="Select Open Time Slots"
						/>
					</div>
					<div style={{ display: 'flex', justifyContent: 'space-around', margin: '10px' }}>
						<Calendar />
					</div>
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
					<div style={{ height: '100px' }}></div>
				</div>
				<div className="gray-shade"></div>
			</div>


		</div>
	);
}

export default DoctorHome;
