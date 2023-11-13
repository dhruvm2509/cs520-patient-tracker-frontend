import React from 'react';
import { useNavigate } from 'react-router-dom';

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

	const navigate = useNavigate();

	const handleLinkClick = () => {
		navigate(props.link);
	};

	if (props.link) {
		return (
			<button
				style={mergedStyle}
				onClick={handleLinkClick}
				className={props.className}
			>
				{props.text}
			</button>
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