class PatientModel extends PersonModel {
	constructor(id, name, birthdate, ssn, sex, address, medicalHistory, currentMedications, previousDiagnoses) {
		super(id, name, birthdate, ssn, sex, address);
		this.medicalHistory = medicalHistory;
		this.currentMedications = currentMedications;
		this.previousDiagnoses = previousDiagnoses;
	}

	updateDoctor(name, birthdate, ssn, sex, address, openTimeSlots) {
		super.updatePerson(name, birthdate, ssn, sex, address);
		this.medicalHistory = medicalHistory;
		this.currentMedications = currentMedications;
		this.previousDiagnoses = previousDiagnoses;
	}

	getMedicalHistory() {
		return this.medicalHistory;
	}

	getCurrentMedications() {
		return this.currentMedications;
	}

	getPreviousDiagnoses() {
		return this.previousDiagnoses;
	}

}