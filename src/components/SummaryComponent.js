'use strict';

import React from 'react';
import RedditExport from './export/RedditComponent'
const metatypeData = require('json!./data/metatype.json'),
	priorityTableData = require('json!./data/priority.json');

require('styles//Summary.sass');

const SummaryComponent = ({priority, metatype, attributes, magres, skills, fixed}) => {
	let priorityHead = [],
		priorityData = [],
		attributesHead = [],
		attributesData = [],
		skillData = [],
		points = {
			skills: priorityTableData[priority.skills].skills.skillpoints - skills.skillPointsSpent,
			skillGroups: (priorityTableData[priority.skills].skills.grouppoints || 0) - skills.groupPointSpent
		},
		calculatedStats = {
			attibutes: {}
		};
	for(let pariorityCategory in priority) {
		priorityHead.push(<th key={'summary-priority-head-' + pariorityCategory}>{pariorityCategory}</th>);
		priorityData.push(<td key={'summary-priority-data-' + pariorityCategory}>{priority[pariorityCategory]}</td>)
	}

	for(let att in metatypeData[metatype].min) {
		let baseAtt = metatypeData[metatype].min[att];
		calculatedStats.attibutes[att] = baseAtt + attributes[att];
		attributesHead.push(<th key={'summary-attribute-head-' + att}>{att}</th>);
		attributesData.push(<td key={'summary-attribute-data-' + att}>{calculatedStats.attibutes[att]}</td>);
	}

	if(magres !== 'mundane') {
		let baseMagic = priorityTableData[priority.magres].magic[magres].attribute.points;
		calculatedStats.attibutes.mag = baseMagic + (attributes.special || 0);
		attributesHead.push(<th key={'summary-attribute-head-mag'}>mag</th>);
		attributesData.push(<td key={'summary-attribute-data-mag'}>{calculatedStats.attibutes.mag}</td>);
	}

	for(let skillName in skills.active) {
		skillData.push(
			<tr key={'skill-'+skillName}>
				<td>{skillName}</td>
				<td>{skills.active[skillName].rating}</td>
			</tr>
		);
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

			<div>
				<h2>Magic/Resonacne</h2>
				{magres}
			</div>

			<div>
				<h2>Skills</h2>
				<table className="table">
					<thead>
						<tr>
							<th>SP</th>
							<th>SGP</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><strong>{points.skills}</strong></td>
							<td><strong>{points.skillGroups}</strong></td>
						</tr>
					</tbody>
				</table>
				<h3>Active Skills</h3>
				<table className="table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Rating</th>
						</tr>
					</thead>

					<tbody>
						{skillData}
					</tbody>
				</table>
			</div>

			<div>
				<h2>Export</h2>
				<RedditExport
					priority={priority}
					metatype={metatype}
					attributes={calculatedStats.attibutes}
					magres={magres}
					skills={skills}/>
			</div>
		</div>
	);
}

export default SummaryComponent;
