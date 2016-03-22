'use strict';

import React from 'react';

require('styles/skills/Skillgroups.sass');

const SkillgroupsComponent = ({skillgroups, skillgroupsData, actions, pointsLeft}) => {
	let listOfGroups = [];
	for (let groupName in skillgroupsData) {
		let group = skillgroupsData[groupName],
			enoughPoints = pointsLeft > 0;

		listOfGroups.push(
			<tr key={'skillgroup-'+groupName}>
				<td>
					<ChangeSkillButton
						action={actions.incrementSkillgroup}
						groupName={groupName}
						skillsInGroup={group.skillsingroup}
						condition={skillgroups[groupName]?skillgroups[groupName].rating < 6 && enoughPoints: enoughPoints}
						btnType="btn-success">
						+
					</ChangeSkillButton>
				</td>
				<td>{skillgroups[groupName] && skillgroups[groupName].rating||0}</td>
				<td>
					<ChangeSkillButton
						action={actions.decrementSkillgroup}
						groupName={groupName}
						skillsInGroup={group.skillsingroup}
						condition={skillgroups[groupName] && skillgroups[groupName].rating > 0}
						btnType="btn-warning">
						-
					</ChangeSkillButton>
				</td>
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

const ChangeSkillButton = ({action, groupName, skillsInGroup, condition, btnType, children}) => {
	function changeSkillGroup() {
		if(condition) {
			action({name: groupName, category: 'groups', max: 6, skillsInGroup: skillsInGroup});
		}
	}

	return(
		<button
			className={'btn ' + btnType}
			onClick={changeSkillGroup}
			>
			{children}
		</button>
	);
};

SkillgroupsComponent.displayName = 'SkillgroupsComponent';

export default SkillgroupsComponent;
