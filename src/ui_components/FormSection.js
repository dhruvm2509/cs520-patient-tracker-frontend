import React, { useState } from 'react';
import './../PatientTracker.css';

function FormSection(props) {

	const [visible, setTodayVisibility] = useState(<p>Loading...</p>);

	const toggleVisibility = () => {
		setTodayVisibility(!visible);
	}

	return (
		<div>
			<div onClick={toggleVisibility} className="toggle-text medium-text left-align-text small-padding">
				{visible ? <p>{props.formName || "Form"} ▼</p> : <p>{props.formName || "Form"} ►</p>}
			</div>
			{visible &&
				<div className="left-align-text large-margin medium-text line-spacing">
					<div><b>Brief Clinical History:</b> {props.clinicalHistory}</div>
					<div><b>Diagnosis:</b> {props.diagnosis}</div>
					<div><b>Study Date:</b> {props.studyDate}</div>
				</div>
			}
		</div>
	);
}

export default FormSection;