class PatientTrackerModel {
	constructor() {
		this.doctors = {};
		this.patients = {};
		this.appointments = {};
	}

	addDoctor(doctor) {
		this.doctors[doctor.id] = doctor;
	}

	addPatient(patient) {
		this.patient[patient.id] = patient;
	}

	addAppointment(appointment) {
		this.appointment[appointment.id] = appointment;
	}

	addAllDoctors(doctors) {
		this.doctors = doctors;
	}

	addAllPatients(patients) {
		this.patients = patients;
	}

	addAllAppointments(appointments) {
		this.appointments = appointments;
	}

	getDoctorById(id) {
		return this.doctors[id];
	}

	getPatientById(id) {
		return this.patients[id];
	}

	getAppointmentById(id) {
		return this.appointments[id];
	}

	getAllDoctors() {
		return this.doctors;
	}

	getAllPatients() {
		return this.patients;
	}

	getAllAppointments() {
		return this.appointments;
	}

}