import React from 'react';
import Modal from '../ModalComponent';
import Skillgroup from './SkillgroupsComponent';
import skillsData from '../data/skills.json';
// import metatypeData from '../data/metatype.json';
import priorityTableData from '../data/priority.json';
import FreeSkills from './FreeSkills';
import ActiveSkill from './ActiveSkill';
import DisplayActiveSkills from './DisplayActiveSkills';
import PropTypeChecking from '../../config/proptypeChecking';

import '../../styles/skills/ActiveSkills.sass';

// helper functions
function calculateGroupPointsLeft(prioritySkill, groupPointSpent) {
	return priorityTableData[prioritySkill].skills.grouppoints
				- groupPointSpent;
}

class SkillsComponent extends React.Component {
	componentWillMount() {
		const {actions, priority, skills, magictype} = this.props,
			attAbriviation = {
				Agility: 'agi',
				Body: 'bod',
				Reaction: 'rea',
				Strength: 'str',
				Charisma: 'cha',
				Intuition: 'int',
				Logic: 'log',
				Will: 'wil',
				Magic: 'special',
				Resonance: 'special'
			},
			skillPointsLeft = priorityTableData[priority.skills].skills.skillpoints
				- skills.skillPointsSpent,
			awakened = [
				'Mage',
				'Mystic',
				'Adept',
				'Aspected'
			],
			groupPointsLeft = calculateGroupPointsLeft(priority.skills, skills.groupPointSpent),
			priorityMagicData = priorityTableData[priority.magres].magic[magictype];

		function allowedSkill() {
			if (awakened.indexOf(magictype) > -1) {
				return 'Magic';
			} else if (magictype === 'Technomancer') {
				return 'Resonance';
			}
			return false;
		}

		const listOfSkills = Object.keys(skillsData.active).map((skillAttribute) => {
			const skillinCategory = skillsData.active[skillAttribute],
				attributeAbriv = attAbriviation[skillAttribute];


			return (
				<Modal
					key={`skill-${skillAttribute}`}
					modalName={skillAttribute}
					modalContent={
						<ActiveSkill
							skillList={skillinCategory}
							actions={actions}
							skills={skills.active}
							skillPointsLeft={skillPointsLeft}
							restrictedSkills={attributeAbriv === 'special' ? skillAttribute !== allowedSkill() : false}
							/>
					}
				/>
			);
		});

		this.listOfSkills = listOfSkills;
		this.priorityDataFreeSkills = priorityMagicData ? priorityMagicData.skills : null;
		this.groupPointsLeft = groupPointsLeft;
	}

	componentWillUpdate(nextProps) {
		const prevProps = this.props,
			nextPriorityMagicData = priorityTableData[nextProps.priority.magres].magic[nextProps.magictype];

		if (nextProps.priority.skills !== prevProps.priority.skills || nextProps.skills.groupPointSpent !== prevProps.skills.grouppoints) {
			this.groupPointsLeft = calculateGroupPointsLeft(nextProps.priority.skills, nextProps.skills.groupPointSpent);
		}

		if (nextPriorityMagicData) {
			this.priorityDataFreeSkills = nextPriorityMagicData.skills;
		} else if (nextPriorityMagicData === undefined) {
			this.priorityDataFreeSkills = null;
		}
	}

	render() {
		const {actions, skills} = this.props,
			{listOfSkills, priorityDataFreeSkills, groupPointsLeft} = this;
			// currentlyKnownSkills = Object.keys(skills.active).map((skillKey) => {
			// 	const {rating, attribute} = skills.active[skillKey],
			// 		{specializations, name} = skillsData.active[attribute][skillKey];
			// 	return (<tr className={`knownActiveSkill-${name}`} key={`knownActiveSkill-${name}`}>
			// 			<td>
			// 				<button className="btn btn-success">
			// 					+
			// 				</button>
			// 			</td>
			// 			<td>
			// 				{rating}
			// 			</td>
			// 			<td>
			// 				<button
			// 					className="btn btn-warning"
			// 					onClick={() => { decrementSkill(name, stat); }}>
			// 					-
			// 				</button>
			// 			</td>
			// 			<td>
			// 				<strong>{name}</strong>
			// 			</td>
			// 			<td>
			// 				<input
			// 					type="text"
			// 					className="form-control input-specialization"
			// 					placeholder="Custom Spec"
			// 					onChange={changeSpec}
			// 					value={currentSpec}/>
			// 				<select
			// 					className="form-control"
			// 					onChange={changeSpec}
			// 					value={currentSpec}>
			// 					<option value="">–</option>
			// 					{specilizationOptions}
			// 				</select>
			// 			</td>
			// 		</tr>);
			// });

		return (
			<div className="activeskills-component">
				{priorityDataFreeSkills ? <h3>Free Skills</h3> : null}
				<FreeSkills
					priorityDataFreeSkills={priorityDataFreeSkills}
					magicSkills={skills.magicSkills}
					setMagicSkills={actions.setMagicSkills}
					/>
				<h3>Skill Groups</h3>
				<div className="row">
					<div className="col-xs-12">
						<Skillgroup
							skillgroups={skills.groups}
							skillgroupsData={skillsData.groups}
							actions={actions}
							pointsLeft={groupPointsLeft} />
					</div>
				</div>

				<h3>Active Skills</h3>
				<div className="row">
					<div className="col-xs-12">
						{listOfSkills}
					</div>
				</div>
				<div>
					<h3>Current Skills</h3>
					<DisplayActiveSkills
						skills={skills}/>
				</div>
			</div>
		);
	}
}

SkillsComponent.displayName = 'SkillsSkillsComponent';

// Uncomment properties you need
SkillsComponent.propTypes = {
	actions: PropTypeChecking.actions,
	priority: PropTypeChecking.priorityTable,
	skills: PropTypeChecking.settingSkills,
	attributes: PropTypeChecking.attributes,
	metatype: PropTypeChecking.selectMetatype,
	magictype: PropTypeChecking.selectMagRes
};
// SkillsComponent.defaultProps = {};

export default SkillsComponent;
