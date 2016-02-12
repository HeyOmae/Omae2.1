'use strict';

import React from 'react';
let skillsData = require('json!../data/skills.json');

require('styles/skills/ActiveSkills.sass');

class ActiveSkillsComponent extends React.Component {
	render() {
		return (
			<div className="activeskills-component">
				<h3>Active Skills</h3>

				<div className="row">
					<div className="col-xs-12">
						<ActiveSkill attribute={'agi'} skillList={skillsData.active['agi']}/>
					</div>
				</div>
			</div>
		);
	}
}

const ActiveSkill = ({attribute, skillList}) => {
	let skillTableData = [];
	for(let skillName in skillList) {
		let skillData = skillList[skillName],
		specilizationOptions = skillData.specializations.map((spec, i) => {
			return <option key={spec+i} value={spec}>{spec}</option>
		});

		skillTableData.push(
			<tr key={skillData.name}>
				<td>
					<button className="btn btn-success">+</button>
				</td>
				<td>
					0
				</td>
				<td>
					<button className="btn btn-warning">-</button>
				</td>
				<td>
					<strong>{skillData.name}</strong>
				</td>
				<td>
					{skillData.reference.book} p{skillData.reference.page}
				</td>
				<td>
					<select className="form-control">
						<option value="">–</option>
						{specilizationOptions}
					</select>
				</td>
				<td>0</td>
				<td>0</td>
			</tr>
		);
	}
	return (
		<div className="table-responsive">
			<h4>{attribute}</h4>
			<table className='table'>
				<thead>
					<tr>
						<th>Raise</th>
						<th>Rating</th>
						<th>Lower</th>
						<th>Skill Name</th>
						<th>Ref</th>
						<th>Spec</th>
						<th>Mods</th>
						<th>Dice Pool</th>
					</tr>
				</thead>
				<tbody>
					{skillTableData}
				</tbody>
			</table>
		</div>
	);
}

ActiveSkillsComponent.displayName = 'SkillsActiveSkillsComponent';

// Uncomment properties you need
// ActiveSkillsComponent.propTypes = {};
// ActiveSkillsComponent.defaultProps = {};

export default ActiveSkillsComponent;
