import React, { useState, useEffect } from 'react';
import AppointmentCard from '../ui_components/AppointmentCard';
import PatientTrackerController from '../controller/PatientTrackerController';
import PatientTrackerModel from '../model/PatientTrackerModel';

function DoctorListView(props) {

	// MVC model and controller
	const model = new PatientTrackerModel();
	const controller = new PatientTrackerController(model);

	const [appointmentsToday, setAppointmentsToday] = useState(<p>Loading...</p>);
	const [appointmentsWeek, setAppointmentsWeek] = useState(<p>Loading...</p>);
	const [appointmentsMonth, setAppointmentsMonth] = useState(<p>Loading...</p>);

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

	const renderAppointments = async (appointments) => {

		const appointmentCards = [];
		for (let i = 0; i < appointments.length; i++) {
			const response = await controller.getUser(appointments[i].patient_id, props.doctorId);
			const patientName = (await response.json()).name;
			appointmentCards.push(
				<AppointmentCard
					className="small-margin"
					date={model.getDateFromFormat(appointments[i].date)}
					name={patientName}
					onClick={props.handleViewPatientClick}
				/>
			);
		}

		return appointmentCards;
	};

	useEffect(() => {
		const setAppointmentCardsInfo = async () => {
			setAppointmentsToday(await renderAppointments(props.appointmentsToday));
			setAppointmentsWeek(await renderAppointments(props.appointmentsWeek));
			setAppointmentsMonth(await renderAppointments(props.appointmentsMonth));
		}

		setAppointmentCardsInfo();

	}, [props.appointmentsToday, props.appointmentsWeek, props.appointmentsMonth]);


	return (
		<div>
			<div onClick={toggleToday} className="toggle-text medium-text left-align-text small-padding">
				{todayVisible ? <p>Today ▼</p> : <p>Today ►</p>}
			</div>
			{todayVisible ?
				(appointmentsToday)
				:
				null
			}
			<div onClick={toggleWeek} className="toggle-text medium-text left-align-text small-padding">
				{weekVisible ? <p>This Week ▼</p> : <p>This Week ►</p>}
			</div>
			{weekVisible ?
				(appointmentsWeek)
				:
				null
			}
			<div onClick={toggleMonth} className="toggle-text medium-text left-align-text small-padding">
				{monthVisible ? <p>This Month ▼</p> : <p>This Month ►</p>}
			</div>
			{monthVisible ?
				(appointmentsMonth)
				:
				null
			}
		</div>

	);
}

export default DoctorListView;
