import React from 'react';
import Modal from '../ModalButtonComponent';
import Skillgroup from './SkillgroupsComponent';
import skillsData from '../../data/skills.json';
import priorityTableData from '../../data/priority.json';
import FreeSkills from './FreeSkills';
import ActiveSkill from './ActiveSkill';
import DisplaySkills from './DisplaySkills';
import PropTypeChecking from '../../config/propTypeChecking';

import '../../styles/skills/ActiveSkills.sass';

const attAbriviation = {
		Agility: 'agi',
		Body: 'bod',
		Reaction: 'rea',
		Strength: 'str',
		Charisma: 'cha',
		Intuition: 'int',
		Logic: 'log',
		Will: 'wil',
		Magic: 'special',
		Resonance: 'special',
	},
	awakened = [
		'Mage',
		'Mystic',
		'Adept',
		'Aspected',
	];

function allowedSkill(magictype) {
	if (awakened.indexOf(magictype) > -1) {
		return 'Magic';
	} if (magictype === 'Technomancer') {
		return 'Resonance';
	}
	return false;
}

class SkillsComponent extends React.PureComponent {
	render() {
		const {actions, skills, attributes, metatype, priority, magictype} = this.props,
			skillPointsLeft = priorityTableData[priority.skills].skills.skillpoints
				- skills.skillPointsSpent,
			priorityMagicData = priorityTableData[priority.magres].magic[magictype],
			hasMagicPriority = priorityMagicData && priorityMagicData.attribute,
			priorityDataFreeSkills = hasMagicPriority ? priorityMagicData.skills : null,
			specialAttribute = hasMagicPriority ? priorityMagicData.attribute.points : 0;

		const listOfSkills = Object.keys(skillsData.active).map((skillAttribute) => (
			<Modal
				key={`skill-${skillAttribute}`}
				modalName={skillAttribute}
				modalContent={
					<ActiveSkill
						skillList={skillsData.active[skillAttribute]}
						actions={actions}
						skills={skills.active}
						skillPointsLeft={skillPointsLeft}
						restrictedSkills={attAbriviation[skillAttribute] === 'special' ? skillAttribute !== allowedSkill(magictype) : false}
					/>
				}
			/>
		));

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
					<div className="col">
						<Modal
							modalName="Skill Groups"
							modalContent={
								<Skillgroup
									skillGroupPoints={priorityTableData[priority.skills].skills.grouppoints} />
							}
						/>
					</div>
				</div>

				<h3>Active Skills</h3>
				<div className="row">
					<div className="col">
						{listOfSkills}
					</div>
				</div>
				{Object.keys(skills.active).length > 0 &&
					<div className="col">
						<h3>Skill List</h3>
						<DisplaySkills
							activeSkills={skills.active}
							actions={actions}
							attributes={attributes}
							metatype={metatype}
							skillPointsLeft={skillPointsLeft}
							specialAttribute={specialAttribute + attributes.special} />
					</div>
				}
			</div>
		);
	}
}

SkillsComponent.displayName = 'SkillsSkillsComponent';

// Uncomment properties you need
SkillsComponent.propTypes = {
	actions: PropTypeChecking.actions.isRequired,
	priority: PropTypeChecking.priorityTable.isRequired,
	skills: PropTypeChecking.settingSkills.isRequired,
	attributes: PropTypeChecking.attributes.isRequired,
	metatype: PropTypeChecking.selectMetatype.isRequired,
	magictype: PropTypeChecking.selectMagRes.isRequired,
};
// SkillsComponent.defaultProps = {};

export default SkillsComponent;
