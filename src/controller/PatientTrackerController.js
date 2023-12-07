class PatientTrackerController {
	constructor(model) {
		this.model = model;
	}

	async checkUserExists(username) {
		const response = await fetch(`http://127.0.0.1:5000/users/${username}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			return true
		} else if (response.status === 404) {
			return false;
		}
	}

	async getUser(username) {
		const response = await fetch(`http://127.0.0.1:5000/users/${username}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			return response
		}
		return null;
	}

	async createUser(isDoctor, username, name, birthdate, password, ssn, gender, address1, address2, city, state, zip, imageUrl) {
		const userData = {
			"_id": username,
			"doctorPatient": isDoctor ? 0 : 1,
			"name": name,
			"DOB": birthdate,
			"password": password,
			"SSN": ssn,
			"gender": gender,
			"address1": address1,
			"address2": address2,
			"city": city,
			"state": state,
			"zip": zip,
			"imageUrl": imageUrl
		};

		const response = await fetch('http://127.0.0.1:5000/create_user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userData),
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response;
	}

}

export default PatientTrackerController;