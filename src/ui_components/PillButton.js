import React from 'react';
import { Link } from 'react-router-dom';

function PillButton(props) {

	const pillButtonStyle = {
		backgroundColor: props.backgroundColor || '#5142ffff',
		color: props.color || 'white',
		borderRadius: `${props.pixelHeight / 2}px`,
		width: `${props.pixelWidth}px`,
		height: `${props.pixelHeight}px`,
		border: 'none',
		fontSize: `${props.fontSize}px`,
		cursor: `pointer`
	};

	const mergedStyle = { ...pillButtonStyle, ...props.style };

	if (props.link) {
		return (
			<Link style={{ textDecoration: 'none' }} to={props.link}>
				<button
					style={mergedStyle}
					onClick={props.onClick}
					className={props.className}
				>
					{props.text}
				</button>
			</Link>
		);
	} else {
		return (
			<button
				style={mergedStyle}
				onClick={props.onClick}
				className={props.className}
			>
				{props.text}
			</button>
		);
	}


}

export default PillButton;