'use strict';

import React from 'react';
let priorityData = require('json!./priority.json');

require('styles//PriorityTable.sass');

class PriorityTableComponent extends React.Component {
	render() {
		const {priorityTable} = this.props;
		return (
			<PriorityTable className="prioritytable-component" priorityTableData={priorityTable} />
		);
	}
}

//helper function
function isActive(active) {
	return active ? 'table-success' : '';
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

let MetatypeDataCell = ({rating, active}) => {
	let data = [];

	for(let race in priorityData[rating].metatype) {
		let special = priorityData[rating].metatype[race].special,
			karma = priorityData[rating].metatype[race].karma;
		data.push(<p key={race}>{race} ({special}) {karma ? 'K: ' + karma : ''}</p>);
	}
	return (
		<td className={isActive(active)}>
			{data}
		</td>

	);
};


const AttributeDataCell = ({rating, active}) => {
	return (
		<td className={isActive(active)}>
			{priorityData[rating].attributes}
		</td>
	);
}

const MagicDataCell = ({rating, active}) => {
	let magicStatBlock = [];

	for(let magicType in priorityData[rating].magic) {
		const magicStats = priorityData[rating].magic[magicType];

		let skills = <span />,
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
		<td className={isActive(active)}>
			{magicStatBlock}
		</td>
	)
}

const SkillsDataCell = ({rating, active}) => {
	let skillsgroupBlock = <span></span>,
		skillgroups = priorityData[rating].skills.grouppoints;

	if(skillgroups) {
		skillsgroupBlock = <span>/{skillgroups}</span>
	}

	return(
		<td className={isActive(active)}>
			{priorityData[rating].skills.skillpoints}{skillsgroupBlock}
		</td>
	)
}

const ResourcesDataCell = ({rating, active}) => {
	return (<td className={isActive(active)}>{priorityData[rating].resources}&yen;</td>)
}

const PriorityRow = ({rating, priorityTableData}) => {
	return (
		<tr>
			<th>{rating}</th>
			<MetatypeDataCell rating={rating} active={priorityTableData.metatype === rating} />
			<AttributeDataCell rating={rating} active={priorityTableData.attribute === rating} />
			<MagicDataCell rating={rating} active={priorityTableData.magres === rating} />
			<SkillsDataCell rating={rating} active={priorityTableData.skills === rating} />
			<ResourcesDataCell rating={rating} active={priorityTableData.resouces === rating} />
		</tr>
	)
}

const PriorityTable = ({priorityTableData}) => {
	return (
		<div className="table-responsive">
			<table className="table table-bordered priority-table">
				<PriorityLabel />
				<tbody>
					<PriorityRow rating="A" priorityTableData={priorityTableData} />
					<PriorityRow rating="B" priorityTableData={priorityTableData} />
					<PriorityRow rating="C" priorityTableData={priorityTableData} />
					<PriorityRow rating="D" priorityTableData={priorityTableData} />
					<PriorityRow rating="E" priorityTableData={priorityTableData} />
				</tbody>
			</table>
		</div>
	)
}

PriorityTableComponent.displayName = 'PriorityTableComponent';

// Uncomment properties you need
// PriorityTableComponent.propTypes = {};
// PriorityTableComponent.defaultProps = {};

export default PriorityTableComponent;
