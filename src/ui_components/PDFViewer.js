import React from 'react';
import pdfTemplate from './../resources/LoremIpsum.pdf';

function PdfViewer(props) {
	return (
		<object
			data={pdfTemplate}
			type="application/pdf"
			aria-label="Embedded PDF document"
			className={props.className}
			style={props.style} />
	);
}

export default PdfViewer;