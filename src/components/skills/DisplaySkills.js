import React from 'react';
import skillsData from '../data/skills.json';
import DisplayTable from '../DisplayTableComponent';
import PropTypeChecking from '../../config/proptypeChecking';

const DisplaySkills = ({skills, actions}) => {
	return (
		<DisplayTable
			header={
				<ActiveSkillHeader/>
			}
			body={
				Object.keys(skills.active).map((skillKey) => {
					return (
						<ActiveSkillRow
							key={`display-activeSkill-${skillKey}`}
							skillKey={skillKey}
							skill={skills.active[skillKey]}
							actions={actions}/>
					);
				})
			}/>
	);
};

DisplaySkills.propTypes = {
	skills: React.PropTypes.objectOf(React.PropTypes.object),
	actions: PropTypeChecking.actions
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

function ActiveSkillRow({skillKey, skill, actions}) {
	return (
		<tr>
			<td>
				<button
					className="btn btn-danger"
					onClick={() => {
						actions.removeSkill({category: 'active', name: skillKey});
					}}>
					-
				</button>
			</td>
			<td>
				<button
					className="btn btn-success"
					onClick={() => {
						actions.incrementSkill({category: 'active', max: 6, name: skillKey});
					}}>
					+
				</button>
			</td>
			<td>{skill.rating}</td>
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
				<select className="form-control">
					<option value="">&mdash;</option>
				</select>
			</td>
			<td>
				DP
			</td>
		</tr>
	);
}

ActiveSkillRow.propTypes = {
	skillKey: React.PropTypes.string,
	skill: React.PropTypes.shape({
		rating: React.PropTypes.number.isRequired,
		attribute: React.PropTypes.string.isRequired,
		spec: React.PropTypes.string
	}),
	actions: PropTypeChecking.actions
};

export default DisplaySkills;
