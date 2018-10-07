import React from 'react';
import PropTypes from 'prop-types';
import DisplayTable from '../DisplayTableComponent';
import metatypeData from '../../data/metatype.json';
import PropTypeChecking from '../../config/propTypeChecking';

const DisplaySkills = ({activeSkills, actions, attributes, metatype, skillPointsLeft, specialAttribute}) => {
	return (
		<DisplayTable
			header={
				<ActiveSkillHeader />
			}
			body={
				Object.keys(activeSkills).map((skillKey) => {
					const skill = activeSkills[skillKey],
						currentAttribute = (skill.attribute === 'mag' || skill.attribute === 'res') ?
						specialAttribute
						:
						metatypeData[metatype.typeName].min[skill.attribute] + attributes[skill.attribute];
					return (
						<ActiveSkillRow
							key={`display-activeSkill-${skillKey}`}
							skillKey={skillKey}
							skill={skill}
							actions={actions}
							attribute={currentAttribute}
							skillPointsLeft={skillPointsLeft} />
					);
				})
			} />
	);
};

DisplaySkills.propTypes = {
	activeSkills: PropTypes.objectOf(
		PropTypes.object,
	).isRequired,
	actions: PropTypeChecking.actions.isRequired,
	attributes: PropTypeChecking.attributes.isRequired,
	metatype: PropTypeChecking.selectMetatype.isRequired,
	skillPointsLeft: PropTypes.number.isRequired,
	specialAttribute: PropTypes.number.isRequired,
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
	const {rating = 0, groupRating = 0, magicSkillRating = 0} = skill,
		totalSkillRating = rating + groupRating + magicSkillRating,
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
						if (skillPointsLeft > 0 && totalSkillRating < 6) {
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
					value={skill.spec || ''} />
			</td>
			<td>
				{dicePool}
				{skill.spec ? `(${dicePool + 2})` : null}
			</td>
		</tr>
	);
}

ActiveSkillRow.propTypes = {
	skillKey: PropTypes.string.isRequired,
	skill: PropTypes.shape({
		rating: PropTypes.number,
		attribute: PropTypes.string.isRequired,
		spec: PropTypes.string,
	}).isRequired,
	actions: PropTypeChecking.actions.isRequired,
	attribute: PropTypes.number.isRequired,
	skillPointsLeft: PropTypes.number.isRequired,
};

export default DisplaySkills;
