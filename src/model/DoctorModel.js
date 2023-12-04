class DoctorModel extends PersonModel {
	constructor(id, name, birthdate, ssn, sex, address, openTimeSlots) {
		super(id, name, birthdate, ssn, sex, address);
		this.openTimeSlots = openTimeSlots;
	}

	updateDoctor(name, birthdate, ssn, sex, address, openTimeSlots) {
		super.updatePerson(name, birthdate, ssn, sex, address);
		this.openTimeSlots = openTimeSlots;
	}

	getOpenTimeSlots() {
		return this.openTimeSlots;
	}

}