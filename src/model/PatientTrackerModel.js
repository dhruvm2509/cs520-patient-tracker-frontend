class PatientTrackerModel {

	static monthNames = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'Septempber', 'October', 'November', 'December'
	];
	static dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thu', 'Fri', 'Sat'];

	constructor() {
		this.doctors = {};
		this.patients = {};
		this.appointments = {};
	}

	dayEnding(day) {
		if (10 <= day && day <= 20) {
			return 'th';
		} else if (day % 10 === 1) {
			return 'st';
		} else if (day % 10 === 2) {
			return 'nd';
		} else if (day % 10 === 3) {
			return 'rd';
		}
		return 'th';
	}

	formatTime(hours, minutes) {
		const formattedHours = String(hours).padStart(2, '0');
		const formattedMinutes = String(minutes).padStart(2, '0');
		return `${formattedHours}:${formattedMinutes}`;
	}

	getAppointmentsByDate(appointments, date) {

		const targetDay = date.getDate();
		const targetMonth = date.getMonth();
		const targetYear = date.getFullYear();

		return appointments.filter(appointment => {
			const appointmentDate = this.getDateFromFormat(appointment.date);
			const appointmentDay = appointmentDate.getDate();
			const appointmentMonth = appointmentDate.getMonth();
			const appointmentYear = appointmentDate.getFullYear();

			return (
				appointmentDay === targetDay &&
				appointmentMonth === targetMonth &&
				appointmentYear === targetYear
			);
		});
	}

	getAppointmentThisWeek(appointments, date) {
		const startDate = new Date(date.setDate(date.getDate() + 1));
		const next7Days = new Date(date.setDate(date.getDate() + 7));

		return appointments.filter(appointment => {
			const appointmentDate = this.getDateFromFormat(appointment.date);
			return (
				appointmentDate > startDate &&
				appointmentDate <= next7Days
			);
		});
	}

	getAppointmentThisMonth(appointments, date) {
		const startDate = new Date(date.setDate(date.getDate() + 8));
		const next7Days = new Date(date.setDate(date.getDate() + 30));

		return appointments.filter(appointment => {
			const appointmentDate = this.getDateFromFormat(appointment.date);
			return (
				appointmentDate > startDate &&
				appointmentDate <= next7Days
			);
		});
	}

	async getAppointmentBySearch(appointments, controller, search, callerId) {
		const filteredAppointments = [];
		for (let i = 0; i < appointments.length; i++) {
			const appointmentDate = this.getDateFromFormat(appointments[i].date);

			const day = appointmentDate.getDate();
			const month = PatientTrackerModel.monthNames[appointmentDate.getMonth()];
			const hours = appointmentDate.getHours();
			const minutes = appointmentDate.getMinutes();

			const shiftedDateTime = new Date(appointmentDate.setMinutes(appointmentDate.getMinutes() + 30));
			const shiftHours = shiftedDateTime.getHours();
			const shiftMinutes = shiftedDateTime.getMinutes();

			const formattedDate = `${PatientTrackerModel.dayNames[appointmentDate.getDay()]}, ${month} ${day} |`
				+ ` ${this.formatTime(hours, minutes)} - ${this.formatTime(shiftHours, shiftMinutes)}`;
			const response = await controller.getUser(appointments[i].patient_id, callerId);
			let patientName = '';
			if (response !== null) {
				const user = await response.json();
				patientName = user?.name;
			}

			if (formattedDate.toLowerCase().includes(search.toLowerCase()) ||
				patientName.toLowerCase().includes(search.toLowerCase())) {
				filteredAppointments.push(appointments[i]);
			}
		}
		return filteredAppointments;
	}

	getDateFromFormat(dateStringFormatted) {
		dateStringFormatted = dateStringFormatted.replace(/[-:]/g, '');
		const year = dateStringFormatted.slice(0, 4);
		const month = dateStringFormatted.slice(4, 6);
		const day = dateStringFormatted.slice(6, 8);
		const hours = dateStringFormatted.slice(9, 11);
		const minutes = dateStringFormatted.slice(11, 13);
		const seconds = dateStringFormatted.slice(13, 15);
		return new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`);
	}

	getFormalDate(dateObject) {
		return `${PatientTrackerModel.dayNames[dateObject.getDay()]} ${PatientTrackerModel.monthNames[dateObject.getMonth()]} `
			+ `${dateObject.getDate() + this.dayEnding(dateObject.getDate())}, ${dateObject.getFullYear()}`;
	}

	getAge(birthdate) {
		const today = new Date();

		let age = today.getFullYear() - birthdate.getFullYear();
		const monthDiff = today.getMonth() - birthdate.getMonth();

		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
			age--;
		}

		return age;
	};

}

export default PatientTrackerModel;