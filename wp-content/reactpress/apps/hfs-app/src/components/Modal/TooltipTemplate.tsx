/** @format */

import React from "react";
import "./style.css";
import { BackgroundColor } from "devextreme-react/chart";

export default function TooltipTemplate(info) {
	const inlineStyles = {
		backgroundColor: "red",
		color: "white",
		padding: "10px",
		borderRadius: "5px",
	};

	return (
		<div className="state-tooltip" style={inlineStyles}>
			XXXXXX-XXXXX
		</div>
	);
}
