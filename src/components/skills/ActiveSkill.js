import React from 'react';
import PropTypes from 'prop-types';
import FilterTable from '../FilterableTable';
import PropTypeChecking from '../../config/propTypeChecking';

function ActiveSkill({
	skillList,
	actions,
	skillPointsLeft,
	restrictedSkills,
}) {
	// Helper Functions
	// TODO: Think of a way to move all the helpers out of the activeSkill Component
	function addSkill(name, attribute) {
		if (skillPointsLeft > 0) {
			actions.addSkill({ name, category: 'active', max: 6, attribute });
		}
	}

	const skillTableData = Object.keys(skillList).map((skillName) => {
		// Helpers that require scoped vars
		/* eslint-disable no-use-before-define */
		function mappingReferences(book) {
			return (
				<span key={skillName + book} className="reference">
					{book} p{skillData.reference[book].page}
				</span>
			);
		}
		/* eslint-enable */

		const skillData = skillList[skillName],
			references = Object.keys(skillData.reference).map(mappingReferences);

		return (
			<ActiveSkillTableRow
				key={`active-skill--${skillData.name}`}
				name={skillData.name}
				stat={skillData.stat}
				defaultable={skillData.defaultable}
				restrictedSkills={restrictedSkills}
				addSkill={addSkill}
				references={references} />
		);
	});

	return (
		<FilterTable
			tableData={{
				header: (
					<tr>
						<th>Learn</th>
						<th>Skill Name</th>
						<th>Defaultable</th>
						<th>Ref</th>
					</tr>
				),
				body: skillTableData,
			}} />
	);
}

ActiveSkill.propTypes = {
	skillList: PropTypes.objectOf(PropTypes.object).isRequired,
	actions: PropTypeChecking.actions.isRequired,
	skillPointsLeft: PropTypes.number.isRequired,
	restrictedSkills: PropTypes.bool.isRequired,
};

function ActiveSkillTableRow({
	name,
	stat,
	defaultable,
	restrictedSkills,
	addSkill,
	references,
}) {
	return (
		<tr className={restrictedSkills ? 'table-danger ' : ''}>
			<td>
				<button
					className="btn btn-success"
					onClick={() => { addSkill(name, stat); }}
				>
					+
				</button>
			</td>
			<td>
				<strong>{name}</strong>
			</td>
			<td>{defaultable ? <span className="text-success">Yep</span> : <span className="text-danger">Nope</span>}
			</td>
			<td>
				{references}
			</td>
		</tr>
	);
}

ActiveSkillTableRow.propTypes = {
	name: PropTypes.string.isRequired,
	stat: PropTypes.string.isRequired,
	defaultable: PropTypes.bool.isRequired,
	restrictedSkills: PropTypes.bool.isRequired,
	addSkill: PropTypes.func.isRequired,
	references: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default ActiveSkill;
