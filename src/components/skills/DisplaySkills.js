import React from 'react';
import DisplayTable from '../DisplayTableComponent';
import metatypeData from '../data/metatype.json';
import PropTypeChecking from '../../config/propTypeChecking';

const DisplaySkills = ({skills, actions, attributes, metatype, skillPointsLeft}) => {
	return (
		<DisplayTable
			header={
				<ActiveSkillHeader/>
			}
			body={
				Object.keys(skills.active).map((skillKey) => {
					const skill = skills.active[skillKey],
						currentAttribute = metatypeData[metatype.typeName].min[skill.attribute] + attributes[skill.attribute];
					return (
						<ActiveSkillRow
							key={`display-activeSkill-${skillKey}`}
							skillKey={skillKey}
							skill={skill}
							actions={actions}
							attribute={currentAttribute}
							skillPointsLeft={skillPointsLeft}/>
					);
				})
			}/>
	);
};

DisplaySkills.propTypes = {
	skills: PropTypeChecking.settingSkills,
	actions: PropTypeChecking.actions,
	attributes: PropTypeChecking.attributes,
	metatype: PropTypeChecking.selectMetatype,
	skillPointsLeft: React.PropTypes.number
};

function ActiveSkillHeader() {
	return (
		<tr>
			<th>
				Remove
			</th>
			<th>
				Raise
			</th>
			<th>Rating</th>
			<th>
				Lower
			</th>
			<th>Skill Name</th>
			<th>
				Spec
			</th>
			<th>
				DP
			</th>
		</tr>
	);
}

function ActiveSkillRow({skillKey, skill, actions, attribute, skillPointsLeft}) {
	const {rating = 0, groupRating = 0} = skill,
		totalSkillRating = rating + groupRating,
		dicePool = attribute + (totalSkillRating || -1);
	return (
		<tr className={totalSkillRating > 6 ? 'table-danger ' : ''}>
			<td>
				<button
					className="btn btn-danger"
					onClick={() => {
						actions.removeSkill({category: 'active', name: skillKey});
					}}>
					&times;
				</button>
			</td>
			<td>
				<button
					className="btn btn-success"
					onClick={() => {
						if (skillPointsLeft > 0) {
							actions.incrementSkill({category: 'active', max: 6, name: skillKey});
						}
					}}>
					+
				</button>
			</td>
			<td>{totalSkillRating}</td>
			<td>
				<button
					className="btn btn-warning"
					onClick={() => {
						actions.decrementSkill({category: 'active', name: skillKey});
					}}>
					-
				</button>
			</td>
			<td>{skillKey}</td>
			<td>
				<input
					type="text"
					className="form-control input-specialization"
					placeholder="Custom Spec"
					onChange={(e) => {
						actions.setSpec({name: skillKey, category: 'active', spec: e.target.value});
					}}
					value={skill.spec || ''}/>
			</td>
			<td>
				{dicePool}
				{skill.spec ? `(${dicePool + 2})` : null}
			</td>
		</tr>
	);
}

ActiveSkillRow.propTypes = {
	skillKey: React.PropTypes.string,
	skill: React.PropTypes.shape({
		rating: React.PropTypes.number,
		attribute: React.PropTypes.string.isRequired,
		spec: React.PropTypes.string
	}),
	actions: PropTypeChecking.actions,
	attribute: React.PropTypes.number,
	skillPointsLeft: React.PropTypes.number
};

export default DisplaySkills;
