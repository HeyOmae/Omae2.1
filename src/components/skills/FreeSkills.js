import React from 'react';
import PropTypes from 'prop-types';
import skillsData from '../../data/skills.json';

const FreeSkills = ({priorityDataFreeSkills, magicSkills, setMagicSkills}) => {
	if (priorityDataFreeSkills) {
		const freeAttribute = priorityDataFreeSkills.attribute,
			freeSkills = skillsData.active[freeAttribute],
			freeSkillList = [];

		let activeSkillAttribute;

		if (freeAttribute) {
			Object.keys(freeSkills).forEach((freeSkillName) => {
				const freeSkill = freeSkills[freeSkillName].name;
				freeSkillList.push(
					<option key={`free-skill--${freeSkill}`}>{freeSkill}</option>,
				);
			});
		} else {
			// TODO: I think I can remove listOfActiveSkills and
			// replace it with a loop of activeSkillAttribute's keys
			const listOfActiveSkills = [];
			activeSkillAttribute = {};

			Object.keys(skillsData.active).forEach((activeSkillCat) => {
				const objectOfActiveSkills = skillsData.active[activeSkillCat];

				Object.keys(objectOfActiveSkills).forEach((actSkillName) => {
					const activeSkill = objectOfActiveSkills[actSkillName];
					listOfActiveSkills.push(activeSkill.name);
					activeSkillAttribute[activeSkill.name] = activeSkill.stat;
				});
			});

			listOfActiveSkills.forEach((activeSkillName) => {
				freeSkillList.push(
					<option key={`free-skill--${activeSkillName}`}>{activeSkillName}</option>,
				);
			});
		}

		const changeFreeSkill = (e) => {
			function genFreeSkillObj(skillName) {
				return {
					name: skillName,
					category: 'active',
					rating: priorityDataFreeSkills.rating,
					attribute: activeSkillAttribute ? activeSkillAttribute[skillName] : 'mag',
				};
			}

			const updatedIndex = e.target.id,
				freeSkillsArr = magicSkills.map((skillName) => {
					return genFreeSkillObj(skillName);
				});

			freeSkillsArr[updatedIndex] = genFreeSkillObj(e.target.value);

			setMagicSkills({magicSkills: freeSkillsArr});
		};

		return (
			<div className="row form-group">
				<div className="col-sm-6">
					<h4>Skill 1</h4>
					<select
						id="0"
						className="form-control"
						onChange={changeFreeSkill}
						value={magicSkills[0]}>

						<option value="" />
						{freeSkillList}

					</select>
				</div>
				<div className="col-sm-6">
					<h4>Skill 2</h4>
					<select
						id="1"
						className="form-control"
						onChange={changeFreeSkill}
						value={magicSkills[1]}>

						<option value="" />
						{freeSkillList}

					</select>
				</div>
			</div>);

	}
	return null;
};

FreeSkills.propTypes = {
	priorityDataFreeSkills: PropTypes.shape({
		attribute: PropTypes.string,
		rating: PropTypes.number,
	}),
	magicSkills: PropTypes.arrayOf(PropTypes.string),
	setMagicSkills: PropTypes.func,
};

FreeSkills.defaultProps = {
	priorityDataFreeSkills: null,
	magicSkills: null,
	setMagicSkills: null,
};

export default FreeSkills;
