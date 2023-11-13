import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DoctorPatientProfile.css';
import patientImage from './../resources/SickPatientPlaceholder.png';
import doctorImage from './../resources/DoctorPlaceholder.jpg';
import PillButton from '../ui_components/PillButton';
import PDFViewer from '../ui_components/PDFViewer';

function DoctorPatientProfile() {

	const [medicalHistoryVisible, setMedicalHistoryVisibility] = useState(true);

	const [currentMedicationsVisible, setCurrentMedicationsVisibility] = useState(true);

	const [previousDiagnosesVisible, setPreviousDiagnosesVisibility] = useState(true);

	const toggleMedicalHistory = () => {
		setMedicalHistoryVisibility(!medicalHistoryVisible);
	}

	const toggleCurrentMedications = () => {
		setCurrentMedicationsVisibility(!currentMedicationsVisible);
	}

	const togglePreviousDiagnoses = () => {
		setPreviousDiagnosesVisibility(!previousDiagnosesVisible);
	}

	const navigate = useNavigate();

	const handleDoctorProfileClick = () => {
		navigate('/doctor-profile');
	};

	const handleBackButtonClick = () => {
		navigate(-1);
	};

	return (
		<div className="doctor-patient-profile">
			<div className="doctor-header-container header-text header-background">
				<div />
				<div className="header-title">
					Patient Tracker Web App
				</div>
				<div className="profile-signout">
					<img src={doctorImage} onClick={handleDoctorProfileClick} alt="Doctor profile" className="circle-border profile-size clickable-pointer" />
					<div>
						<PillButton
							className="pill-alignment small-text"
							pixelWidth="100"
							pixelHeight="50"
							color="black"
							backgroundColor="white"
							text="Sign out"
							link="/login"
						/>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="gray-shade"></div>
				<div>
					<div className="large-text small-margin">
						Patient Information
					</div>
					<div className="row-container small-padding">
						<PillButton
							className="pill-alignment medium-text right-margin"
							pixelWidth="100"
							pixelHeight="50"
							text="Back"
							onClick={handleBackButtonClick}
						/>
					</div>
					<div className="left-right-container">
						<div className="left-align-text large-margin medium-text line-spacing">
							Name: Bob Smith<br />
							Age: 23<br />
							Birth Date: 01/01/2001<br />
							SSN: 123-456-7890<br />
							Sex: M<br />
							Address: 1 Main Street, Amherst, MA, 12345
						</div>
						<div className="right-align-text large-margin">
							<img src={patientImage} alt="Doctor profile" className="circle-border large-patient-profile" />
						</div>
					</div>
					<div>
						<div onClick={toggleMedicalHistory} className="toggle-text medium-text left-align-text small-padding">
							{medicalHistoryVisible ? <p>Medical History ▼</p> : <p>Medical History ►</p>}
						</div>
						{medicalHistoryVisible &&
							<PDFViewer className="pdf-style" />
						}
						<div onClick={toggleCurrentMedications} className="toggle-text medium-text left-align-text small-padding">
							{currentMedicationsVisible ? <p>Current Medications ▼</p> : <p>Current Medications ►</p>}
						</div>
						{currentMedicationsVisible &&
							<PDFViewer className="pdf-style" />
						}
						<div onClick={togglePreviousDiagnoses} className="toggle-text medium-text left-align-text small-padding">
							{previousDiagnosesVisible ? <p>Previous Diagnoses ▼</p> : <p>Previous Diagnoses ►</p>}
						</div>
						{previousDiagnosesVisible &&
							<PDFViewer className="pdf-style" />
						}
					</div>
					<div style={{ height: '100px' }}></div>
				</div>
				<div className="gray-shade"></div>
			</div>
		</div>
	);
}

export default DoctorPatientProfile;
