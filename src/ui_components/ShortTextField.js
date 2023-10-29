import React from 'react';
import './../PatientTracker.css';

function ShortTextField(props) {

	return (
		<input
			type={props.isPassword ? "password" : "text"}
			placeholder={props.placeholder}
			value={props.value}
			onChange={props.onChange}
			className={`short-text-field ${props.className}`}
		/>

	);
}

export default ShortTextField;