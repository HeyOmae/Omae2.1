'use strict';

import React from 'react';
import Skillgroup from './SkillgroupsComponent';
let skillsData = require('json!../data/skills.json'),
	metatypeData = require('json!../data/metatype.json'),
	priorityTableData = require('json!../data/priority.json');

require('styles/skills/ActiveSkills.sass');

class ActiveSkillsComponent extends React.Component {
	render() {
		const {actions, priority, skills, attributes, metatype} = this.props,
			attAbriviation = {
				Agility: 'agi',
				Body: 'bod',
				Reaction: 'rea',
				Strength: 'str',
				Charisma: 'cha',
				Intuition: 'int',
				Logic: 'log',
				Will: 'wil',
				Magic: 'mag',
				Resonance: 'res'
			};

		let skillPointsLeft = priorityTableData[priority.skills].skills.skillpoints - skills.skillPointsSpent,
			groupPointsLeft = priorityTableData[priority.skills].skills.grouppoints - skills.groupPointSpent;

		var listOfSkills = [];

		for(let skillKey in skillsData.active) {
			let skillinCategory = skillsData.active[skillKey];

			const attributeAbriv = attAbriviation[skillKey],
				baseAttribute = metatypeData[metatype].min[attributeAbriv],
				attributePool = baseAttribute + attributes[attributeAbriv];


			listOfSkills.push(
				<ActiveSkill
					key={'skill-'+skillKey}
					skillAtt={skillKey}
					skillList={skillinCategory}
					actions={actions}
					skills={skills.active}
					skillPointsLeft={skillPointsLeft}
					showSkill={skills.showSkill === skillKey}
					attributePool={attributePool}
					/>
			);
		}

		return (
			<div className="activeskills-component">
				<h3>Skill Groups</h3>
				<div className="row">
					<Skillgroup
						skillgroups={skills.groups}
						skillgroupsData={skillsData.groups}
						actions={actions}
						pointsLeft = {groupPointsLeft}
						displaySkillgroups = {skills.showSkill === 'Skillgroup'}/>
				</div>

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

const ActiveSkill = ({skillAtt, skillList, actions, skills, skillPointsLeft, showSkill, attributePool}) => {
	let skillTableData = [];

	for(let skillName in skillList) {
		let skillData = skillList[skillName],
		specilizationOptions = skillData.specializations.map((spec, i) => {
			return <option key={spec+i} value={spec}>{spec}</option>;
		}),
		references = [];
		for(let book in skillData.reference) {
			references.push(<span key={skillName + book} className="reference">
					{book} p{skillData.reference[book].page}
				</span>);
		}

		function incrementSkill(name, att, rating) {
			if(skillPointsLeft > 0 && rating < 6){
				actions.incrementSkill({name: name, category: 'active', max: 6, attribute: att});
			}
		}

		function decrementSkill(name, att) {
			actions.decrementSkill({name: name, category: 'active', max: 6, attribute: att});
		}

		let skillRating = skills[skillData.name] && skills[skillData.name].rating ? skills[skillData.name].rating : 0,
			groupRating = skills[skillData.name] && skills[skillData.name].groupRating ? skills[skillData.name].groupRating : 0,
			rating = skillRating + groupRating;

		skillTableData.push(
			<tr key={skillData.name} className={rating>6?'table-danger':''}>
				<td>
					<button
						className="btn btn-success"
						onClick={incrementSkill.bind(this, skillData.name, skillData.stat, rating)}
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
						onClick={decrementSkill.bind(this, skillData.name, skillData.stat)}
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
					<input type="text" className="form-control" placeholder="Custom Spec" />
					<select
						className="form-control"
						onChange={(e) => {console.log(e.target.value);}}>
						<option value="">–</option>
						{specilizationOptions}
					</select>
				</td>
				<td>0</td>
				<td>{attributePool + rating}</td>
			</tr>
		);
	}

	return (
		<div className="table-responsive">
			<h4><button className="btn btn-info" onClick={()=> actions.showSkill({ skillToShow: skillAtt })}>{skillAtt}</button></h4>
			<div className={showSkill ? 'collapse in' : 'collapse'}>
				<table className="table">
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
		</div>
	);
};

ActiveSkillsComponent.displayName = 'SkillsActiveSkillsComponent';

// Uncomment properties you need
// ActiveSkillsComponent.propTypes = {};
// ActiveSkillsComponent.defaultProps = {};

export default ActiveSkillsComponent;
