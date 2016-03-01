'use strict';

import React from 'react';
let skillsData = require('json!../data/skills.json');

require('styles/skills/ActiveSkills.sass');

class ActiveSkillsComponent extends React.Component {
	render() {
		const {actions, skills} = this.props;
		var listOfSkills = [];

		for(let skillKey in skillsData.active) {
			let skillinCategory = skillsData.active[skillKey];
			listOfSkills.push(
				<ActiveSkill
					key={'skill-'+skillKey}
					attribute={skillKey}
					skillList={skillinCategory}
					actions={actions}
					skills={skills.active}
					skillPoints={skills.skillPointsSpent}/>
			);
		}
		return (
			<div className="activeskills-component">
				<h3>Active Skills</h3>

				<div className="row">
					<div className="col-xs-12">
						{listOfSkills}
					</div>
				</div>
			</div>
		);
	}
}

const ActiveSkill = ({attribute, skillList, actions, skills, skillPoints}) => {
	let skillTableData = [];
	for(let skillName in skillList) {
		let skillData = skillList[skillName],
		specilizationOptions = skillData.specializations.map((spec, i) => {
			return <option key={spec+i} value={spec}>{spec}</option>
		}),
		references = [];
		for(let book in skillData.reference) {
			references.push(<span key={skillName + book} className="reference">
					{book} p{skillData.reference[book].page}
				</span>);
		}

		function incrementSkill() {
			actions.incrementSkill({name: this, category: 'active', max: 6});
		}

		function decrementSkill() {
			actions.decrementSkill({name: this, category: 'active', max: 6});
		}

		let rating = skills[skillData.name] ? skills[skillData.name].rating : 0;

		skillTableData.push(
			<tr key={skillData.name}>
				<td>
					<button
						className="btn btn-success"
						onClick={incrementSkill.bind(skillData.name)}
					>
						+
					</button>
				</td>
				<td>
					{rating}
				</td>
				<td>
					<button
						className="btn btn-warning"
						onClick={decrementSkill.bind(skillData.name)}
					>
						-
					</button>
				</td>
				<td>
					<strong>{skillData.name}</strong>
				</td>
				<td>
					{references}
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
						<td>{skillPoints}</td>
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
