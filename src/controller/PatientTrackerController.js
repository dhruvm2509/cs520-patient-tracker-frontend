class PatientTrackerController {
	constructor(model) {
		this.model = model;
	}

	async updateUser(username, password, updatedUser) {
		const response = await fetch(`http://127.0.0.1:5000/update_user/${username}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': 'http://127.0.0.1:5000'
			},
			body: JSON.stringify({ "username": username, "password": password, "update_param": updatedUser })
		});

		if (response.ok) {
			return response.body;
		} else {
			return null;
		}
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

	async checkUserExists(username, callerId) {
		const response = await fetch(`http://127.0.0.1:5000/users/${username}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ "caller_id": callerId })
		});

		return response.ok;
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
			return await response.json();
		} else {
			return null;
		}
	}

	async getUser(username, caller) {
		const response = await fetch(`http://127.0.0.1:5000/users/${username}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ "caller_id": caller })
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
			"appointmentIds": [],
			"formIds": [],
			"availableTimes": []
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

	async deleteUser(userId, password) {
		const response = await fetch(`http://127.0.0.1:5000/delete_user/${userId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ "password": password })
		});

		if (response.ok) {
			return true
		}
		return false;
	}

	async getUserForms(userId) {
		const response = await fetch(`http://127.0.0.1:5000/${userId}/forms`, {
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

	async createUserForm(patientState, history, diagnosis, studyDate) {
		const { v4: uuidv4 } = require('uuid');

		const response = await fetch(`http://127.0.0.1:5000/create_form`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"_id": uuidv4(),
				"briefClinicalHistory": history,
				"diagnosis": diagnosis,
				"patientDOB": patientState.DOB,
				"patientName": patientState.name,
				"patient_id": patientState._id,
				"studyDate": studyDate
			})
		});

		if (response.ok) {
			return response
		}
		return null;
	}

}

export default PatientTrackerController;