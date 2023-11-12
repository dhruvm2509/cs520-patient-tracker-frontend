import React, { useState } from 'react';
//import { Document, Page } from 'react-pdf';
import pdfTemplate from './../resources/LoremIpsum.pdf';

function PdfViewer(props) {
	return (
		<div>
			<object data={pdfTemplate} type="application/pdf" className={props.className} style={props.style} />
		</div>
	);
}

export default PdfViewer;