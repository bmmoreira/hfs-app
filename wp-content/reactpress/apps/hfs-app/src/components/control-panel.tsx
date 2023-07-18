/** @format */

import * as React from "react";
import "./legend.css";

function ControlPanel() {
	return (
		<div className="legend-panel">
			<h3>Anomaly Patern</h3>
			<img src="/data/images/legend_colors.png" alt="Legend" />
		</div>
	);
}

export default React.memo(ControlPanel);
