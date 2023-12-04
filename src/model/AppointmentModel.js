class AppointmentModel {
	constructor(patientId, doctorId, date, summary) {
		this.appointmentId = `${doctorId}_${patientId}_${date}`;
		this.patientId = patientId;
		this.doctorId = doctorId;
		this.date = date;
		this.summary = summary;
	}

	updateAppointment(patientId, doctorId, date, summary) {
		this.patientId = patientId;
		this.doctorId = doctorId;
		this.date = date;
		this.summary = summary;
	}

	getPatientId() {
		return this.patientId;
	}

	getDoctorId() {
		return this.doctorId;
	}

	getDate() {
		return this.date;
	}

	getSummary() {
		return this.summary;
	}

}