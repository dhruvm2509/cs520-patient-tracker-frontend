import React from 'react';

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

	return (
		<button
			style={pillButtonStyle}
			onClick={props.onClick}
			className={`pill-button ${props.className}`}
		>
			{props.text}
		</button>

	);
}

export default PillButton;