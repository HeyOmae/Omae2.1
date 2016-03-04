'use strict';

import React from 'react';

require('styles//Summary.sass');

const SummaryComponent = ({priority}) => {
	let priorityHead = [],
		priorityData = [];
	for(let pariorityCategory in priority) {
		priorityHead.push(<th key={'summary-priority-head-' + pariorityCategory}>{pariorityCategory}</th>);
		priorityData.push(<td key={'summary-priority-data-' + pariorityCategory}>{priority[pariorityCategory]}</td>)
	}
	return (
		<div className="summary-component">
			<h1>Summary Character</h1>
			<h2>Priority</h2>
			<table className="table">
				<thead>
					<tr>
						{priorityHead}
					</tr>
				</thead>
				<tbody>
					<tr>
						{priorityData}
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default SummaryComponent;
