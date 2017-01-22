import React from 'react';
import DisplayTable from '../DisplayTableComponent';

const DisplayActiveSkills = ({skills}) => {
	return (
		<DisplayTable
			header={
				<ActiveSkillHeader/>
			}
			body={
				Object.keys(skills.active).map((skillName) => {
					return (
						<ActiveSkillRow
							key={`display-activeSkill-${skillName}`}/>
					);
				})
			}/>
	);
};

DisplayActiveSkills.propTypes = {
	skills: React.PropTypes.objectOf(React.PropTypes.object)
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

function ActiveSkillRow() {
	return (
		<tr>
			<td>
				<button className="btn btn-danger">-</button>
			</td>
			<td>
				<button className="btn btn-success">+</button>
			</td>
			<td>1</td>
			<td>
				<button className="btn btn-warning">-</button>
			</td>
			<td>Skill Name</td>
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

export default DisplayActiveSkills;
