'use strict';

import React from 'react';
let priorityData = require('json!./priority.json');

require('styles//PriorityTable.sass');

class PriorityTableComponent extends React.Component {
	render() {
		return (
			<PriorityTable className="prioritytable-component" />
		);
	}
}

const PriorityLabel = () => {
	return (
		<thead className="thead-inverse">
			<tr>
				<th>Priority</th>
				<th>Metatype</th>
				<th>Attributes</th>
				<th>Magic/Resonance</th>
				<th>Skills</th>
				<th>Resources</th>
			</tr>
		</thead>
	);
};

const MetatypeDataCell = ({rating}) => {
	let data = [];
	for(let race in priorityData[rating].metatype) {
		let special = priorityData[rating].metatype[race].special,
			karma = priorityData[rating].metatype[race].karma;
		data.push(<p key={race}>{race} ({special}) {karma ? 'K: ' + karma : ''}</p>);
	}
	return (
		<td>
			{data}
		</td>

	);
};

const AttributeDataCell = ({rating}) => {
	return (
		<td>
			{priorityData[rating].attributes}
		</td>
	);
}

const MagicDataCell = ({rating}) => {
	let magicStatBlock = [];

	for(let magicType in priorityData[rating].magic) {
		let magicStats = priorityData[rating].magic[magicType],
			skills = <span />,
			spells = <span />,
			magicDetails = <span />;

		if (magicType === 'mundane') {
			magicDetails = <span>Jack and Squat at the Rating of zilch.</span>
		} else {
			if(magicStats.skills) {
				skills = <span>, {magicStats.skills.ammount} Rating {magicStats.skills.rating} {magicStats.skills.attribute} skills</span>
			} else if (magicStats.skillsgroup) {
				skills = <span>, {magicStats.skillsgroup.ammount} Rating {magicStats.skillsgroup.rating} {magicStats.skills.attribute} skillgroup</span>
			}

			if(magicStats.spells) {
				spells = <span>, {magicStats.spells.points} {magicStats.spells.type}</span>
			}

			magicDetails = <span>{magicStats.attribute.name} {magicStats.attribute.points}{skills}{spells}</span>;
		}


		magicStatBlock.push(
			<p key={magicType}>
				<strong>{magicType}: </strong>
				{magicDetails}
			</p>
		)
	}

	return(
		<td>
			{magicStatBlock}
		</td>
	)
}

const SkillsDataCell = ({rating}) => {
	let skillsgroupBlock = <span></span>,
		skillgroups = priorityData[rating].skills.grouppoints;

	if(skillgroups) {
		skillsgroupBlock = <span>/{skillgroups}</span>
	}

	return(
		<td>
			{priorityData[rating].skills.skillpoints}{skillsgroupBlock}
		</td>
	)
}

const ResourcesDataCell = ({rating}) => {
	return (<td>{priorityData[rating].resources}&yen;</td>)
}

const PriorityRow = ({rating}) => {
	return (
		<tr>
			<th>{rating}</th>
			<MetatypeDataCell rating={rating} />
			<AttributeDataCell rating={rating} />
			<MagicDataCell rating={rating} />
			<SkillsDataCell rating={rating} />
			<ResourcesDataCell rating={rating} />
		</tr>
	)
}

const PriorityTable = () => {
	return (
		<table className="table table-bordered">
			<PriorityLabel />
			<tbody>
				<PriorityRow rating="A"/>
				<PriorityRow rating="B"/>
				<PriorityRow rating="C"/>
				<PriorityRow rating="D"/>
				<PriorityRow rating="E"/>
			</tbody>
		</table>
	)
}

PriorityTableComponent.displayName = 'PriorityTableComponent';

// Uncomment properties you need
// PriorityTableComponent.propTypes = {};
// PriorityTableComponent.defaultProps = {};

export default PriorityTableComponent;
