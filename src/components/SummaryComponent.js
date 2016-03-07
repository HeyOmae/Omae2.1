'use strict';

import React from 'react';
let metatypeData = require('json!./data/metatype.json'),
	priorityData = require('json!./data/priority.json');

require('styles//Summary.sass');

const SummaryComponent = ({priority, metatype, attributes, magres, fixed}) => {
	let priorityHead = [],
		priorityData = [],
		attributesHead = [],
		attributesData = [];
	for(let pariorityCategory in priority) {
		priorityHead.push(<th key={'summary-priority-head-' + pariorityCategory}>{pariorityCategory}</th>);
		priorityData.push(<td key={'summary-priority-data-' + pariorityCategory}>{priority[pariorityCategory]}</td>)
	}

	for(let att in metatypeData[metatype].min) {
		let baseAtt = metatypeData[metatype].min[att];
		attributesHead.push(<th key={'summary-attribute-head-' + att}>{att}</th>);
		attributesData.push(<td key={'summary-attribute-data-' + att}>{baseAtt + attributes[att]}</td>);
	}

	return (
		<div className={'summary-component ' + (fixed ? 'fixed':'')}>
			<h1>Summary Character</h1>

			<div className="table-responsive">
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

			<div>
				<h2>Metatype</h2>
				<div className="col-xs-12">{metatype}</div>
			</div>

			<div className="table-responsive">
				<h2>Attributes</h2>
				<table className="table">
					<thead>
						<tr>
							{attributesHead}
						</tr>
					</thead>
					<tbody>
						<tr>
							{attributesData}
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default SummaryComponent;
