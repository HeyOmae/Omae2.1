import React from 'react';
import Modal from '../ModalComponent';
import Skillgroup from './SkillgroupsComponent';
import skillsData from '../data/skills.json';
import metatypeData from '../data/metatype.json';
import priorityTableData from '../data/priority.json';
import FreeSkills from './FreeSkills';
import ActiveSkill from './ActiveSkill';
import PropTypeChecking from '../../config/proptypeChecking';

import '../../styles/skills/ActiveSkills.sass';

class SkillsComponent extends React.Component {
	componentWillMount() {
		const {actions, priority, skills, attributes, metatype, magictype} = this.props,
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
			groupPointsLeft = priorityTableData[priority.skills].skills.grouppoints
				- skills.groupPointSpent,
			priorityMagicData = priorityTableData[priority.magres].magic[magictype];

		let baseMagicAttribute = 0,
			priorityDataFreeSkills = null;

		if (priorityMagicData) {
			baseMagicAttribute = (priorityMagicData.attribute && priorityMagicData.attribute.points) || 0;
			priorityDataFreeSkills = priorityMagicData.skills;
		}


		function allowedSkill() {
			if (awakened.indexOf(magictype) > -1) {
				return 'Magic';
			} else if (magictype === 'Technomancer') {
				return 'Resonance';
			}
			return false;
		}

		const listOfSkills = Object.keys(skillsData.active).map((skillKey) => {
			const skillinCategory = skillsData.active[skillKey],
				attributeAbriv = attAbriviation[skillKey],
				baseAttribute = metatypeData[metatype.typeName].min[attributeAbriv] || baseMagicAttribute,
				attributePool = baseAttribute + attributes[attributeAbriv];


			return (
				<Modal
					key={`skill-${skillKey}`}
					modalName={skillKey}
					modalContent={
						<ActiveSkill
							skillList={skillinCategory}
							actions={actions}
							skills={skills.active}
							skillPointsLeft={skillPointsLeft}
							showSkill={skills.showSkill === skillKey}
							attributePool={attributePool}
							restrictedSkills={attributeAbriv === 'special' ? skillKey !== allowedSkill() : false}
							/>
					}
				/>
			);
		});

		this.listOfSkills = listOfSkills;
		this.priorityDataFreeSkills = priorityDataFreeSkills;
		this.groupPointsLeft = groupPointsLeft;
	}

	render() {
		const {actions, skills} = this.props,
			{listOfSkills, priorityDataFreeSkills, groupPointsLeft} = this;

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
							pointsLeft={groupPointsLeft}
							displaySkillgroups={skills.showSkill === 'Skillgroup'}/>
					</div>
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
