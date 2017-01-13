import React from 'react';
import FilterTable from '../FilterableTable';
import PropTypeChecking from '../../config/proptypeChecking';

function ActiveSkill({
	skillList,
	actions,
	skills,
	skillPointsLeft,
	attributePool,
	restrictedSkills
}) {
	// Helper Functions
	// TODO: Think of a way to move all the helpers out of the activeSkill Component
	function incrementSkill(name, attribute, rating) {
		if (skillPointsLeft > 0 && rating < 6) {
			actions.incrementSkill({ name, category: 'active', max: 6, attribute });
		}
	}

	function decrementSkill(name, att) {
		actions.decrementSkill({ name, category: 'active', max: 6, attribute: att });
	}

	function mappingSpecializtions(spec, i) {
		return <option key={spec + i} value={spec}>{spec}</option>;
	}

	const skillTableData = Object.keys(skillList).map((skillName) => {
		// Helpers that require scoped vars
		/* eslint-disable no-use-before-define */
		function changeSpec(changeEvent) {
			if (skillPointsLeft > 0) {
				const spec = changeEvent.target.value;
				actions.setSpec({name: skillData.name, category: 'active', spec});
			}
		}

		function mappingReferences(book) {
			return (
				<span key={skillName + book} className="reference">
					{book} p{skillData.reference[book].page}
				</span>
			);
		}
		/* eslint-enable */

		const skillData = skillList[skillName],
			specilizationOptions = skillData.specializations.map(mappingSpecializtions),
			references = Object.keys(skillData.reference).map(mappingReferences),
			currSkill = skills[skillData.name],
			currentSpec = (skills[skillData.name] && skills[skillData.name].spec) || '';


		let rating = 0,
			dicePool = attributePool;

		if (currSkill) {
			Object.keys(currSkill).forEach((prop) => {
				const currRating = currSkill[prop];

				if (typeof currRating === 'number') {
					rating += currRating;
					dicePool += currRating;
				}
			});
		}

		return (
			<ActiveSkillTableRow
				key={`active-skill--${skillData.name}`}
				name={skillData.name}
				stat={skillData.stat}
				rating={rating}
				restrictedSkills={restrictedSkills}
				incrementSkill={incrementSkill}
				decrementSkill={decrementSkill}
				references={references}
				changeSpec={changeSpec}
				currentSpec={currentSpec}
				specilizationOptions={specilizationOptions}
				dicePool={dicePool} />
		);
	});

	return (
		<FilterTable
			tableData={{
				header: (
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
				),
				body: skillTableData
			}}/>
	);
}

ActiveSkill.propTypes = {
	skillList: React.PropTypes.objectOf(React.PropTypes.object).isRequired,
	actions: PropTypeChecking.actions,
	skills: React.PropTypes.objectOf(React.PropTypes.object),
	skillPointsLeft: React.PropTypes.number.isRequired,
	attributePool: React.PropTypes.number.isRequired,
	restrictedSkills: React.PropTypes.bool.isRequired
};

function ActiveSkillTableRow({
	name,
	stat,
	rating,
	restrictedSkills,
	incrementSkill,
	decrementSkill,
	references,
	changeSpec,
	currentSpec,
	specilizationOptions,
	dicePool
}) {
	// TODO: make this into a smart component to watch it's rating
	return (
		<tr className={rating > 6 || restrictedSkills ? 'table-danger ' : ''}>
			<td>
				<button
					className="btn btn-success"
					onClick={() => { incrementSkill(name, stat, rating); }}
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
					onClick={() => { decrementSkill(name, stat); }}
				>
					-
				</button>
			</td>
			<td>
				<strong>{name}</strong>
			</td>
			<td>
				{references}
			</td>
			<td>
				<input
					type="text"
					className="form-control input-specialization"
					placeholder="Custom Spec"
					onChange={changeSpec}
					value={currentSpec}/>
				<select
					className="form-control"
					onChange={changeSpec}
					value={currentSpec}>
					<option value="">–</option>
					{specilizationOptions}
				</select>
			</td>
			<td>{currentSpec ? 2 : 0}</td>
			<td>{dicePool}{currentSpec ? `(${dicePool + 2})` : null}</td>
		</tr>
	);
}

ActiveSkillTableRow.propTypes = {
	name: React.PropTypes.string.isRequired,
	stat: React.PropTypes.string.isRequired,
	rating: React.PropTypes.number.isRequired,
	restrictedSkills: React.PropTypes.bool.isRequired,
	incrementSkill: React.PropTypes.func.isRequired,
	decrementSkill: React.PropTypes.func.isRequired,
	references: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
	changeSpec: React.PropTypes.func.isRequired,
	currentSpec: React.PropTypes.string.isRequired,
	specilizationOptions: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
	dicePool: React.PropTypes.number.isRequired
};

export default ActiveSkill;
