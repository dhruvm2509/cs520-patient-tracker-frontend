class PatientTrackerController {
	constructor(model) {
		this.model = model;
	}

	async getAppointments(username) {
		const response = await fetch(`http://127.0.0.1:5000/${username}/appointments`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			return response
		} else if (response.status === 404) {
			return null;
		}
	}

	async checkUserExists(username) {
		const response = await fetch(`http://127.0.0.1:5000/users/${username}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ "caller_id": username })
		});

		if (response.ok) {
			return true
		} else if (response.status === 404) {
			return false;
		}

		throw new Error('Network response resulted in error');
	}

	async signIn(username, password) {
		const response = await fetch(`http://127.0.0.1:5000/sign_in`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ "username": username, "password": password })
		});

		if (response.ok) {
			return true
		} else if (response.status === 404) {
			return false;
		}
	}

	async getUser(username) {
		const response = await fetch(`http://127.0.0.1:5000/users/${username}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ "caller_id": username })
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
			"imageUrl": imageUrl,
			"appointmentIds": []
		};

		if (isDoctor) {
			userData["availableSlots"] = []
		}

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