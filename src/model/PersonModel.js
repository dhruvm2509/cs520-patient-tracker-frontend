class PersonModel {
	constructor(id, name, birthdate, ssn, sex, address) {
		this.id = id;
		this.name = name;
		this.age = this.calculateAge(birthdate);
		this.birthdate = birthdate;
		this.ssn = ssn;
		this.sex = sex;
		this.address = address;
	}

	updatePerson(name, birthdate, ssn, sex, address) {
		this.name = name;
		this.age = this.calculateAge(birthdate);
		this.birthdate = birthdate;
		this.ssn = ssn;
		this.sex = sex;
		this.address = address;
	}

	getName() {
		return this.name;
	}

	getAge() {
		return this.age;
	}

	getBirthdate() {
		return this.birthdate;
	}

	getSSN() {
		return this.ssn;
	}

	getSex() {
		return this.sex;
	}

	getAddress() {
		return this.address;
	}

	calculateAge(birthdate) {
		const today = new Date();
		const birthDate = new Date(birthdate);

		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDiff = today.getMonth() - birthDate.getMonth();

		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}

}