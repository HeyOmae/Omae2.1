'use strict';

import React from 'react';

require('styles/skills/Skillgroups.sass');

const SkillgroupsComponent = ({skillgroups, skillgroupsData, actions, pointsLeft}) => {
	let listOfGroups = [];
	for (let groupName in skillgroupsData) {
		let group = skillgroupsData[groupName];

		listOfGroups.push(
			<tr key={'skillgroup-'+groupName}>
				<td>
					<ChangeSkillButton
						action={actions.incrementSkillgroup}
						groupName={groupName}
						skillsInGroup={group.skillsingroup}/>
				</td>
				<td>{skillgroups[groupName] && skillgroups[groupName].rating||0}</td>
				<td>-</td>
				<td><strong>{group.name}</strong></td>
				<td>{Object.keys(group.skillsingroup).join(', ')}</td>
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
						<th>Skill Group</th>
						<th>Skills</th>
						<th>{pointsLeft}</th>
					</tr>
				</thead>
				<tbody>
					{listOfGroups}
				</tbody>
			</table>
		</div>
	);
};

const ChangeSkillButton = ({action, groupName, skillsInGroup}) => {
	function changeSkillGroup() {
		action({name: groupName, category: 'groups', max: 6, skillsInGroup: skillsInGroup});
	}

	return(
		<button
			className="btn btn-success"
			onClick={changeSkillGroup}
			>
			+
		</button>
	);
};

SkillgroupsComponent.displayName = 'SkillgroupsComponent';

export default SkillgroupsComponent;
