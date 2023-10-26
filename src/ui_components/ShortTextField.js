import React from 'react';

function ShortTextField(props) {

	return (
		<input
			type={props.isPassword ? "password" : "text"}
			placeholder={props.placeholder}
			value={props.value}
			onChange={props.onChange}
			className={props.className}
		/>

	);
}

export default ShortTextField;