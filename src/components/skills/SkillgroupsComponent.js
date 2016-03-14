'use strict';

import React from 'react';

require('styles/skills/Skillgroups.sass');

const SkillgroupsComponent = ({skillgroups, pointsLeft}) => {
	let listOfGroups = [];
	for (let groupName in skillgroups) {
		let group = skillgroups[groupName];

		listOfGroups.push(
			<tr>
				<td>+</td>
				<td>0</td>
				<td>-</td>
				<td><strong>{group.name}</strong></td>
				<td>{group.skillsingroup.join(', ')}</td>
			</tr>
		);
	}
	return (
		<div className="skillgroups-component col-xs-12 table-responsive">
			<table className="table">
				<thead>
					<tr>
						<th>Raise</th>
						<th>Rating</th>
						<th>Lower</th>
						<th>Skill Group Name</th>
						<th>Skills</th>
					</tr>
				</thead>
				<tbody>
					{listOfGroups}
				</tbody>
			</table>
		</div>
	);
}

export default SkillgroupsComponent;
